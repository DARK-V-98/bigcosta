
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

const DEVELOPER_EMAIL = 'thimira.vishwa2003@gmail.com';

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
            const data = docSnap.data();
            // This will correct the role if it was ever set to something else in the DB.
            if (data.email === DEVELOPER_EMAIL) {
                if (data.role !== 'developer') {
                  // The role is incorrect in the DB, so we fix it.
                  await setDoc(userDocRef, { role: 'developer' }, { merge: true });
                }
                setRole('developer');
            } else {
                setRole((data.role as Role) || 'user');
            }
          } else {
            // Document doesn't exist, so create it.
            try {
              if (user.email) {
                const newRole: Role = user.email === DEVELOPER_EMAIL ? 'developer' : 'user';
                await setDoc(userDocRef, {
                  email: user.email,
                  role: newRole,
                  createdAt: serverTimestamp(),
                });
                // The listener will automatically fire with the new doc,
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
