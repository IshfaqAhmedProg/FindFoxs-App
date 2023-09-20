import {
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  onIdTokenChanged,
  signOut,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import Loading from "@/components/CustomComponents/Loading/Loading";
import { User } from "firebase/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { auth } from "../firebase/config";

const AuthContext = createContext<any>({});
export const useAuth = (): IAuthContext => useContext(AuthContext);
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState<boolean>();

  //AuthState Change Use Effect
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        Cookies.set("token", await user.getIdToken(true));
        Cookies.set("loggedin", "true");
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //Sign Up Auth function
  async function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  //login Auth function
  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  //Google Login and signup Auth function
  const googleAccess = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  //logout Auth function
  const logout = async () => {
    await signOut(auth).then(() => {
      setUser(null);
      console.log("logged out")
      Cookies.remove("token");
      Cookies.remove("loggedin");
      router.replace("/");
    });
  };
  //Password Reset Auth function
  const resetPass = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };
  //Send Email Verification Auth Function
  const sendEV = () => {
    let sender = null;
    if (auth.currentUser != null) {
      sender = sendEmailVerification(auth.currentUser).then(() => {
        console.log("email sent");
      });
    }
    return sender;
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        signup,
        googleAccess,
        sendEV,
        logout,
        resetPass,
        user,
      }}
    >
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};
interface IAuthContext {
  login: (email: string, password: string) => Promise<UserCredential>;
  signup: (email: string, password: string) => Promise<UserCredential>;
  googleAccess: () => Promise<UserCredential>;
  sendEV: () => Promise<void> | null;
  logout: () => void;
  resetPass: (email: string) => Promise<void>;
  user: User | null;
}
