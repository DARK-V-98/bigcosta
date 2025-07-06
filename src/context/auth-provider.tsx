
'use client';

import React, { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';

import { auth, db } from '@/lib/firebase-client';
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
    let firestoreUnsubscribe: (() => void) | null = null;

    const authUnsubscribe = onAuthStateChanged(auth, (user) => {
      // Unsubscribe from any previous Firestore listener
      if (firestoreUnsubscribe) {
        firestoreUnsubscribe();
      }

      if (user) {
        setLoading(true);
        setUser(user);
        const userDocRef = doc(db, 'users', user.uid);

        // Set up a real-time listener for the user's document
        firestoreUnsubscribe = onSnapshot(userDocRef, async (docSnap) => {
          if (docSnap.exists()) {
            setRole((docSnap.data().role as Role) || 'user');
          } else {
            // Document doesn't exist, so create it.
            // This handles cases where the doc wasn't created on signup,
            // or for users who existed before this logic was added.
            try {
              if (user.email) {
                await setDoc(userDocRef, {
                  email: user.email,
                  role: 'user', // Default role
                  createdAt: serverTimestamp(),
                });
                // The listener will automatically fire again with the new doc,
                // and the role will be set then.
              } else {
                 setRole('user'); // Fallback if no email
              }
            } catch (error) {
              console.error("Error creating Firestore document for user:", error);
              setRole('user'); // Fallback to 'user' role even if write fails
            }
          }
          setLoading(false);
        }, (error) => {
          console.error("Error listening to user document:", error);
          setUser(null);
          setRole(null);
          setLoading(false);
        });

      } else {
        setUser(null);
        setRole(null);
        setLoading(false);
      }
    });

    // Cleanup function
    return () => {
      authUnsubscribe();
      if (firestoreUnsubscribe) {
        firestoreUnsubscribe();
      }
    };
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
