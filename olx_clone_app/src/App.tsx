import { Route, Routes } from "react-router-dom";
import Main from "./Components/Main";
import Details from "./Components/Details";
import { AuthProvider } from "./AuthContext";
const App = () => {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
