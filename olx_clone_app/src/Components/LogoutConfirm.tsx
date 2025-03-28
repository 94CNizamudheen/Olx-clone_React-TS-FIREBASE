import { useState } from "react";
import { useAuth } from "../AuthContext";

const LogoutConfirm = () => {
  const [showModal, setShowModal] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    setShowModal(false);
  };

  return (
    <>
      <button onClick={() => setShowModal(true)} className="text-red-500 underline">
        Logout
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white p-6 rounded-lg shadow-md text-center w-96">
            <h2 className="text-lg font-semibold">Confirm Logout</h2>
            <p className="text-gray-600 mt-2">Are you sure you want to log out?</p>
            <div className="flex justify-center mt-4 gap-4">
              <button 
                onClick={handleLogout} 
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Yes, Logout
              </button>
              <button 
                onClick={() => setShowModal(false)} 
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoutConfirm;
