import Loading from "@/components/CustomComponents/Loading/Loading";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
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
    const unsubscribe = onIdTokenChanged(auth, async (u) => {
      if (u) {
        registerToCookie(u);
        setUser(u);
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
  async function login(email: string, password: string) {
    const value = await signInWithEmailAndPassword(auth, email, password);
    registerToCookie(value.user);
    setUser(value.user);
    router.replace("/dashboard");
  }
  //Google Login and signup Auth function
  async function googleAccess() {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/gmail.modify");
    const value = await signInWithPopup(auth, provider);
    registerToCookie(value.user);
    setUser(value.user);
    router.replace("/dashboard");
  }

  //logout Auth function
  async function logout() {
    await signOut(auth);
    console.log("logged out");
    Cookies.remove("token");
    Cookies.remove("loggedin");
    Cookies.remove("uid");
    setUser(null);
    router.replace("/");
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
  async function registerToCookie(user: User) {
    Cookies.set("token", await user.getIdToken(true));
    Cookies.set("loggedin", "true");
    Cookies.set("uid", user.uid);
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
