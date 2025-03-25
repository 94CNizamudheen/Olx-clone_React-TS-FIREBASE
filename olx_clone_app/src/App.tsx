import { Route, Routes } from "react-router-dom";
import Main from "./Components/Main";
import Details from "./Components/Details";
import { AuthProvider } from "./AuthContext";
import SellProducts from "./Components/SellProducts";
const App = () => {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/details" element={<Details />} />
          <Route path="/sell" element={<SellProducts/>} ></Route>
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
