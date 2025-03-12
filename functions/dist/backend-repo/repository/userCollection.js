import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { userAuth, db } from "../config/firebaseConfig.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
export const fetchUser = async (userId) => {
    const userRef = doc(db, 'USERS', userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
        return userSnap.data();
    }
    else {
        return null;
    }
};
export const updateUser = async (userId, data) => {
    const userRef = doc(db, 'USERS', userId);
    await updateDoc(userRef, data);
    const updatedDoc = await getDoc(userRef);
    if (updatedDoc.exists()) {
        return updatedDoc.data();
    }
    return null;
};
export const signUpUser = async (email, password, age, name) => {
    try {
        const newUser = await createUserWithEmailAndPassword(userAuth, email, password);
        const user = newUser.user;
        const userDocRef = doc(db, "USERS", user.uid);
        await setDoc(userDocRef, {
            email: user.email,
            name: name,
            age: age,
        });
    }
    catch (error) {
        console.error("Error signing up or creating document:", error);
        throw error;
    }
};
export const signInUser = async (email, password) => {
    try {
        const response = await signInWithEmailAndPassword(userAuth, email, password);
        return response;
    }
    catch (error) {
        console.error("Error signing in user:", error);
        throw error;
    }
};
