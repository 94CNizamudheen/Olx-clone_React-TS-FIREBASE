import { Route, Routes } from "react-router-dom";
import Details from "./Components/Details";
import { AuthProvider } from "./AuthContext";
import SellProducts from "./Components/SellProducts";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { lazy, Suspense } from "react";
import LoadingFallback from "./Components/LoadingFallback";
const Main = lazy(() => import('./Components/Main'));


const App = () => {
  return (
    <>
      <AuthProvider>
        <Suspense fallback={<LoadingFallback size="large" message="...Loading" />}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/details" element={<Details />} />
            <Route path="/sell" element={<SellProducts />} ></Route>
            <Route path="/login" element={<Login />} ></Route>
            <Route path="/signup" element={< Signup />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </>
  );
};

export default App;
