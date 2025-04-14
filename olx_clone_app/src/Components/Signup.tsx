import React, { useState } from 'react';
import avetar from '../assets/loginEntryPointChat.webp';
import google from '../assets/google.png';
import phone from '../assets/phone.png';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../Firebase/setup';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../Firebase/setup';
import LoadingFallback from './LoadingFallback';


type SignupProps = {
    setSignupPop?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Signup = ({ setSignupPop }: SignupProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { user } = useAuth();

    const googleSignUp = async () => {
        setIsLoading(true);
        try {
            await signInWithPopup(auth, googleProvider);
            setSignupPop?.(false);

        } catch (error) {
            console.error(error);
            setError('Google signup failed');
        } finally {
            setIsLoading(false);
        }
    }

    const handleEmailSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        } if (name.trim().length < 3) {
            setError("Name atleast need 3 characters")
        }

        if (password.length < 6) {
            setError('Password should be at least 6 characters long');
            return;
        }
        setIsLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name,
                email,
                createdAt: new Date()
            })
            setSignupPop?.(false)
            navigate('/')
        } catch (error: unknown) {
            console.error("Detailed error:", error);

            const errorCode = (error as { code?: string })?.code;
            if (errorCode === "auth/email-already-in-use") {
                setError("Email is already registered");
                return;
            }

            setError("Signup failed. Please try again.");
        } finally {
            setIsLoading(false);
        }



    }
    console.log(user)
    return (
        <>
           
                <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-zinc-950 bg-opacity-75 transition-opacity"
                        aria-hidden="true"
                        onClick={() => setSignupPop?.(false)}
                    ></div>

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
                            <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all w-full max-w-md sm:max-w-lg">
                                {/* Modal Content */}
                                <div className="px-4 py-6 sm:px-6 sm:py-8">
                                    {/* Close Button */}
                                    <h1
                                        onClick={() => navigate('/')}
                                        className="absolute top-4 right-4 text-2xl sm:text-3xl font-semibold cursor-pointer text-gray-700 hover:text-gray-900"
                                    >
                                        X
                                    </h1>

                                    {/* Modal Body */}
                                    <div className="mt-8 text-center">
                                        <img src={avetar} alt="Guitar" className="w-16 h-16 sm:w-20 sm:h-20 mx-auto" />
                                        <p className="text-sm sm:text-base font-medium mt-4 sm:mt-5 text-gray-800">
                                            Help us become one of the safest places <br /> to buy and sell
                                        </p>

                                        {/* Error Message */}
                                        {error && (
                                            <div className="text-red-500 text-sm mt-4">
                                                {error}
                                            </div>
                                        )}

                                        {/* Email Signup Form */}
                                        <form onSubmit={handleEmailSignup} className="mt-6 mx-auto max-w-xs">
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full border-2 border-gray-300 p-2 rounded-md mb-4"
                                                required
                                            />
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full border-2 border-gray-300 p-2 rounded-md mb-4"
                                                required
                                            />
                                            <input
                                                type="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full border-2 border-gray-300 p-2 rounded-md mb-4"
                                                required
                                            />
                                            <input
                                                type="password"
                                                placeholder="Confirm Password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="w-full border-2 border-gray-300 p-2 rounded-md mb-4"
                                                required
                                            />
                                            <button
                                                type="submit"
                                                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors flex justify-center items-center gap-2"
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <LoadingFallback size="small" message="" />
                                                ) : (
                                                    'Sign Up'
                                                )}
                                            </button>

                                        </form>

                                        {/* Phone Signup */}
                                        <div className="flex items-center border-2 border-black p-2 rounded-md mt-4 mx-auto max-w-xs">
                                            <img src={phone} alt="Phone" className="w-5 h-5 sm:w-6 sm:h-6" />
                                            <h1 className="font-semibold ml-3 text-sm sm:text-base cursor-pointer">
                                                Continue with Phone
                                            </h1>
                                        </div>

                                        {/* Google Signup */}
                                        <div
                                            onClick={googleSignUp}
                                            className="flex items-center border-2 border-gray-300 p-2 rounded-md mt-4 mx-auto max-w-xs cursor-pointer hover:border-gray-400 transition-colors duration-200"
                                        >
                                            <img src={google} alt="Google" className="w-5 h-5 sm:w-6 sm:h-6" />
                                            <h1 className="font-semibold ml-3 text-sm sm:text-base">
                                                Continue with Google
                                            </h1>
                                        </div>

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
        </>
    );
}

export default Signup;