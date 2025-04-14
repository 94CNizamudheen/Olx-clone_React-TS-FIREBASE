import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import {  createContext,ReactNode, useContext, useEffect, useState } from 'react'
import { auth } from './Firebase/setup';


interface AuthContextType{
    user:User|null,
    logout:()=>void,
};
const AuthContext= createContext<AuthContextType|undefined>(undefined);

export const AuthProvider=({children}:{children:ReactNode})=>{
    const [user,setUser]=useState<User|null>(null);

  useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe(); 
    }, []);

    const logout=async()=>{
        await signOut(auth);
    };
    return(
        <AuthContext.Provider value={{user,logout,}}>
            {children}
        </AuthContext.Provider>
    );
};

export  const useAuth=()=>{
    const context=useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider"); 
    }
    return context
}
