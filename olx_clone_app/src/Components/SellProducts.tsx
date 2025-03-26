import React, { useState } from "react"
import { useAuth } from "../AuthContext"
import { useNavigate } from "react-router-dom";
import { db } from '../Firebase/setup'
import { addDoc, collection } from "firebase/firestore";
import { ImagePlus} from 'lucide-react';

const SellProducts: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const categories = [
        'Electronics', 'Mobiles', 'Cars', 'Furniture',
        'Real Estate', 'Bikes', 'Fashion', 'Books',
        'Pets', 'Services'
    ];

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadToCloudinary = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);
        console.log(import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
        console.log(import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        formData.append('cloud_name', import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: 'POST',
                    body: formData,

                }
            );

            const data = await response.json();
            console.log('Cloudinary response:', data);
            if (!response.ok) {
                throw new Error(data.error?.message || 'Cloudinary upload failed');
            }

            return data.secure_url;
        } catch (error) {
            console.error('Error uploading to Cloudinary:', error);
            throw error;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            alert('Please login to sell product');
            return;
        }

        if (!title || !description || !price || !category || !image) {
            alert('Please fill all fields and upload an image');
            return;
        }

        setIsLoading(true);

        try {
            console.log('Starting image upload...');
            const imageUrl = await uploadToCloudinary(image); // Fixed typo here
            console.log('Image uploaded successfully:', imageUrl);

            const priceValue = parseFloat(price);
            if (isNaN(priceValue)) {
                throw new Error('Invalid price value');
            }

            const productData = {
                title,
                description,
                price: priceValue,
                category,
                userId: user.uid,
                userEmail: user.email,
                imageUrl,
                createdAt: new Date().toISOString()
            };
            console.log('Product data prepared:', JSON.stringify(productData, null, 2));

            console.log('Attempting to save to Firestore...');
            const docRef = await addDoc(collection(db, 'products'), productData);
            console.log('Product saved with ID:', docRef.id);

            setTitle('');
            setDescription('');
            setPrice('');
            setCategory('');
            setImage(null);
            setImagePreview(null);

            alert("Product listed successfully!");
            navigate('/');

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Detailed error:", {
                    message: error.message,
                    stack: error.stack,
                    name: error.name
                });
                alert("Failed to list product: " + error.message);
            } else {
                console.error("An unknown error occurred", error);
                alert("An unknown error occurred while listing the product.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
                <div className="bg-white shadow-2xl rounded-xl p-8 max-w-md w-full text-center space-y-6 border border-blue-100">
                    <div className="flex justify-center mb-4">
                        <ImagePlus 
                            className="text-yellow-600 w-16 h-16 animate-pulse" 
                            strokeWidth={1.5}
                        />
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
                            Sell Your Product
                        </h1>
                        <p className="text-gray-600 mb-6">
                            To list an item for sale, you'll need to log in first. 
                            This helps us ensure a safe and trustworthy marketplace.
                        </p>
                    </div>
                    <button 
                        onClick={() => navigate('/')}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out shadow-md hover:shadow-lg"
                    >
                        Login Now
                    </button>
                </div>
            </div>
        )
    }




    return (
        <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Sell Your Product</h1>
            <form className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md" action="" onSubmit={handleSubmit} >
                <div className="mb-4">
                    <label htmlFor="title">Product Title</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter Product Title" required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
                    <textarea name="" id="description" value={description} onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your Product" rows={4} required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price(₹)</label>
                    <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} min={0} placeholder="Enter Price" required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category</label>
                    <select name="" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Product Image</label>
                    <input type="file" id="image" accept="image/*" onChange={handleImageUpload} required
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
                    {imagePreview &&
                        (<div>
                            <img src={imagePreview} alt="" className="max-w-full h-48 object-cover rounded-lg" />
                        </div>
                        )}
                </div>
                <button type="submit" disabled={isLoading}
                    className={`w-full py-3 rounded-lg transition duration-300 ${isLoading ? 'bg-gray-400 cursor-not-allowed '
                        : 'bg-yellow-500 text-white hover:bg-yellow-600'}`}>
                    {isLoading ? 'listing products' : 'list product'}
                </button>
            </form>
        </div>
    )
}

export default SellProducts
