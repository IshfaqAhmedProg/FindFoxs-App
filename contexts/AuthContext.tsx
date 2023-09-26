import Loading from "@/components/CustomComponents/Loading/Loading";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onIdTokenChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
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
  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  //login Auth function
  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  //Google Login and signup Auth function
  function googleAccess() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  //logout Auth function
  async function logout() {
    await signOut(auth).then(() => {
      console.log("logged out");
      Cookies.remove("token");
      Cookies.remove("GAPItoken");
      Cookies.remove("loggedin");
      setUser(null);
      router.replace("/");
    });
  }
  //Password Reset Auth function
  function resetPass(email: string) {
    return sendPasswordResetEmail(auth, email);
  }
  //Send Email Verification Auth Function
  async function sendEV() {
    if (auth.currentUser == null) {
      return;
    }
    return sendEmailVerification(auth.currentUser);
  }

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
