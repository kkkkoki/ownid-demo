import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { doc, onSnapshot, Unsubscribe } from "firebase/firestore";
import {
  useEffect,
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";
import { auth, db } from "../firebase/client";

type User = {
  id: string;
  email: string;
  password: string;
};

type ContextType = {
  isLoggedIn: boolean;
  isLoading: boolean;
  fbUser: FirebaseUser | null | undefined;
  user: User | null | undefined;
};

const AuthContext = createContext<ContextType>({
  isLoading: true,
  isLoggedIn: false,
  fbUser: undefined,
  user: undefined,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>();
  const [fbUser, setFbUser] = useState<FirebaseUser | null>();

  useEffect(() => {
    let unsubscribe: Unsubscribe;

    onAuthStateChanged(auth, (resultUser) => {
      unsubscribe?.();
      setIsLoggedIn(!!resultUser);
      setIsLoading(false);
      setFbUser(resultUser);

      if (resultUser) {
        const ref = doc(db, `users/${resultUser.uid}`);
        unsubscribe = onSnapshot(ref, (snap) => {
          setUser(snap.data() as User);
        });
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        fbUser,
        user,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
