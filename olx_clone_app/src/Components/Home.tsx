import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from '../Firebase/setup'
import { collection, getDocs } from "firebase/firestore";

type Product = {
    id: string;
    title: string;
    image: string;
    price: number;
    category: string;
    description: string;
    userId?: string;
    userEmail?: string;
    createdAt?: string;
};

type ProductsProp = {
    search: string;
    menu: string;
};

const Home = ({ search, menu }: ProductsProp) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const productList = querySnapshot.docs.map(doc => ({
                    id: doc.id, // Firestore document ID
                    title: doc.data().title,
                    image: doc.data().imageUrl, // Map `imageUrl` to `image`
                    price: doc.data().price,
                    category: doc.data().category,
                    description: doc.data().description,
                    userId: doc.data().userId,
                    userEmail: doc.data().userEmail,
                    createdAt: doc.data().createdAt,
                })) as Product[];
                setProducts(productList);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to load products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []); 

    if (loading) {
        return <div className="text-center mt-10">Loading products...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products
                    ?.filter(
                        (data) =>
                            data.title.toLowerCase().includes(search?.toLowerCase()) &&
                            (menu ? data.category.toLowerCase() === menu.toLowerCase() : true)
                    )
                    .map((data) => (
                        <Link to="/details" state={{ data: data }} key={data.id}>
                            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
                                <img
                                    src={data?.image}
                                    alt={data.title}
                                    className="w-full h-48 object-cover rounded-md mb-4"
                                />
                                <h1 className="font-bold text-lg md:text-xl truncate">{data?.title}</h1>
                                <h1 className="text-gray-700">₹ {data?.price}</h1>
                                <h1 className="text-sm text-gray-500">{data?.category}</h1>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default Home;