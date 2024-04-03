import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import auth from "./firebase.config";
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updatePassword } from "firebase/auth";

export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();
const gitProvider = new GithubAuthProvider();



const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    const registerUser = (email, password) => {

        return createUserWithEmailAndPassword(auth, email, password)
    }
    const LoginUser = (email, password) => {

        return signInWithEmailAndPassword(auth, email, password)
    }
    const googleSignIn = () => {

        return signInWithPopup(auth, provider)
    }
    const githubSignIn = () => {

        return signInWithPopup(auth, gitProvider)
    }

    const LogOutUser = () => {
        return signOut(auth)

    }



    const ForgetUserPass = (email) => {
        return sendPasswordResetEmail(auth, email)
    }


    useEffect(() => {

        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unSubscribe
    }, [])


    const authInfo = { user, registerUser, LoginUser, LogOutUser,
                         googleSignIn, ForgetUserPass, githubSignIn }
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