'use client';

import React, { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import type { User } from 'firebase/auth';
import { onIdTokenChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

type Role = 'admin' | 'developer' | 'user';

type AuthContextType = {
  user: User | null;
  role: Role | null;
  loading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const logout = async () => {
    await auth.signOut();
    setUser(null);
    setRole(null);
    router.push('/');
  };

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        const tokenResult = await user.getIdTokenResult();
        setUser(user);
        setRole((tokenResult.claims.role as Role) || 'user');
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading, logout }}>
      {loading ? (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <Skeleton className="h-6 w-48" />
            </div>
        </div>
      ) : children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
