import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

interface User {
  id: string;
  email: string;
  displayName: string;
  createdAt: Timestamp;
  lastLogin: Timestamp;
  joinedRooms: string[];
  profilePicture?: string;
}

export const checkAndCreateUser = async (
  clerkUserId: string,
  userData: {
    email: string;
    displayName: string;
  },
): Promise<void> => {
  try {
    if (!clerkUserId || !userData.email) {
      throw new Error("User ID and email are required");
    }

    const userRef = doc(db, "users", clerkUserId);

    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const existingUser = userSnap.data() as User;

      const updatedData = {
        lastLogin: Timestamp.now(),
        email: userData.email,
        displayName: userData.displayName || existingUser.displayName,
      };

      await setDoc(userRef, updatedData, { merge: true });
    } else {
      const newUser: User = {
        id: clerkUserId,
        email: userData.email,
        displayName: userData.displayName || "User",
        createdAt: Timestamp.now(),
        lastLogin: Timestamp.now(),
        joinedRooms: [],
      };
      await setDoc(userRef, newUser);
    }
  } catch (error) {
    console.error("Error checking/creating user:", error);
  }
};
