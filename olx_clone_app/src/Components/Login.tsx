
import guitar from '../assets/guitar.png';
import google from '../assets/google.png';
import phone from '../assets/phone.png';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../Firebase/setup';
import React from 'react';
import { useAuth } from '../AuthContext';

type popupProp={
    setLoginPop:React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({setLoginPop}:popupProp) => {
    
    const {user}=useAuth();
    console.log(user)

    const googleSignIn= async()=>{
        try {
            await signInWithPopup(auth,googleProvider);
            setLoginPop(false);
        } catch (error) {
            console.error(error)
        }
        
    }

    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-zinc-950 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={() => setLoginPop(false)} // Close on overlay click
        ></div>
  
        {/* Modal Container */}
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
            <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all w-full max-w-md sm:max-w-lg">
              {/* Modal Content */}
              <div className="px-4 py-6 sm:px-6 sm:py-8">
                {/* Close Button */}
                <h1
                  onClick={() => setLoginPop(false)}
                  className="absolute top-4 right-4 text-2xl sm:text-3xl font-semibold cursor-pointer text-gray-700 hover:text-gray-900"
                >
                  X
                </h1>
  
                {/* Modal Body */}
                <div className="mt-8 text-center">
                  <img src={guitar} alt="Guitar" className="w-16 h-16 sm:w-20 sm:h-20 mx-auto" />
                  <p className="text-sm sm:text-base font-medium mt-4 sm:mt-5 text-gray-800">
                    Help us become one of the safest places <br /> to buy and sell
                  </p>
  
                  {/* Phone Login */}
                  <div className="flex items-center border-2 border-black p-2 rounded-md mt-8 sm:mt-12 mx-auto max-w-xs">
                    <img src={phone} alt="Phone" className="w-5 h-5 sm:w-6 sm:h-6" />
                    <h1 className="font-semibold ml-3 text-sm sm:text-base cursor-pointer">
                      Continue with Phone
                    </h1>
                  </div>
  
                  {/* Google Login */}
                  <div
                    onClick={googleSignIn}
                    className="flex items-center border-2 border-gray-300 p-2 rounded-md mt-4 mx-auto max-w-xs cursor-pointer hover:border-gray-400 transition-colors duration-200"
                  >
                    <img src={google} alt="Google" className="w-5 h-5 sm:w-6 sm:h-6" />
                    <h1 className="font-semibold ml-3 text-sm sm:text-base">
                      Continue with Google
                    </h1>
                  </div>
  
                  {/* Divider */}
                  <h1 className="text-center mt-4 text-sm sm:text-base text-gray-500">OR</h1>
  
                  {/* Email Login */}
                  <h1 className="text-center mt-4 text-sm sm:text-base underline cursor-pointer text-blue-600 hover:text-blue-800">
                    Login with Email
                  </h1>
  
                  {/* Footer Text */}
                  <h1 className="text-center text-xs mt-12 sm:mt-20 text-gray-500">
                    All your personal details are safe with us.
                  </h1>
                  <h1 className="text-center mt-2 sm:mt-4 text-xs text-gray-500">
                    If you continue, you are accepting{" "}
                    <span className="text-blue-700">
                      OLX Terms and <br /> Conditions and Privacy Policy
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Login
