import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import auth from "./firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    const registerUser = (email, password) => {

        return createUserWithEmailAndPassword(auth, email, password)
    }
    const LoginUser = (email, password) => {

        return signInWithEmailAndPassword(auth, email, password)
    }
const googleSignIn =()=>{

    return signInWithPopup(auth, provider)
}

    const LogOutUser = () => {
        return signOut(auth)

    }


    useEffect(() => {

        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unSubscribe
    }, [])


    const authInfo = { user, registerUser, LoginUser, LogOutUser,googleSignIn }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>

        </div>
    );
};

export default AuthProvider;
AuthProvider.propTypes = {

    children: PropTypes.node.isRequired
}