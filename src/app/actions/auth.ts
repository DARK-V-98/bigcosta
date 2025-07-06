'use server';

import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { z } from 'zod';

const SignupSchema = z.object({
  uid: z.string(),
  email: z.string().email(),
});

export async function setupNewUser(data: z.infer<typeof SignupSchema>) {
  try {
    const validatedData = SignupSchema.parse(data);
    const { uid, email } = validatedData;

    // Set custom claim for role
    await adminAuth.setCustomUserClaims(uid, { role: 'user' });

    // Create a user document in Firestore
    await adminDb.collection('users').doc(uid).set({
      email: email,
      role: 'user',
      createdAt: FieldValue.serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error('Error setting up new user:', error);
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Invalid data provided.' };
    }
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { success: false, error: `User setup failed: ${errorMessage}` };
  }
}
