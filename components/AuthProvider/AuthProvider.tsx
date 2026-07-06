'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
    loading: boolean;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
    loading: true,
  refreshUser: async () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); //чи вже з'ясували відповідь 
    // (поки Firebase перевіряє сесію, loading: true
    
  //Коли AuthProvider вперше з'являється,
  // useEffect запускає onAuthStateChanged(auth, callback).
  // Це каже Firebase: «стеж за станом авторизації всередині об'єкта auth (об'єкт Firebase), 
  // і щоразу, коли він зміниться — виклич оцю мою функцію (callback)».

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

    const refreshUser = async () => {
        if (auth.currentUser) {
            await auth.currentUser.reload();
            setUser({ ...auth.currentUser });
        }
    };

  return <AuthContext.Provider value={{ user, loading, refreshUser }}>{children}</AuthContext.Provider>;
} //роздавати стан усім (через Context)

// зручний хук, щоб дістати користувача в будь-якому компоненті
export function useAuth() {
  return useContext(AuthContext);
} //зручний спосіб діставати дані
//Провайдер стоїть посередині: з одного боку ловить дані від Firebase, 
// з іншого — роздає їх застосунку