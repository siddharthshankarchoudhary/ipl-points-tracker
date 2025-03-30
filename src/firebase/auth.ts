import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  OAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
  UserCredential,
} from "firebase/auth";
import { auth } from "./firebase";

export const executeCreateUserWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const executeSignInUserWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const executeSignInWithGoogle = async (): Promise<UserCredential> => {
  const googleAuthProvider = new GoogleAuthProvider();
  const signInResult = await signInWithPopup(auth, googleAuthProvider);
  return signInResult;
};

export const executeSignInWithApple = async (): Promise<UserCredential> => {
  const provider = new OAuthProvider("apple.com");
  provider.addScope("email");
  provider.addScope("name");

  const signInResult = await signInWithPopup(auth, provider);
  return signInResult;
};

export const executeSignOut = async (): Promise<void> => {
  await auth.signOut();
};

// export const executePasswordReset = async (email: string): Promise<void> => {
//   return sendPasswordResetEmail(auth, email);
// };

// export const executePasswordChange = async (
//   password: string,
// ): Promise<void> => {
//   if (auth.currentUser) {
//     return updatePassword(auth.currentUser, password);
//   } else {
//     console.error("User not logged in");
//   }
// };
