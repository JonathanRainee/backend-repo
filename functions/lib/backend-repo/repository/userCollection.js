import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { userAuth, db } from "../config/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// export const createUser = async (email: string, password: string, age: number, name: string) => {
//     try {
//         const userRecord = await auth.createUser({
//             email: email,
//             password: password,
//         });
//         const userDocRef = doc(db, "USERS", userRecord.uid);
//         await setDoc(userDocRef, {
//             email: userRecord.email,
//             name: name,
//             age: age,
//         });
//         console.log('Successfully created new user:', userRecord.uid);
//     } catch (error) {
//         console.error('Error creating new user:', error);
//     }
// };
// new
// =================================================================
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
        console.log("Firebase Auth User Created:", newUser.user);
        console.log("terstsete");
        console.log("user: ", user);
        const userDocRef = doc(db, "USERS", user.uid);
        await setDoc(userDocRef, {
            email: user.email,
            name: name,
            age: age,
        });
        console.log("User data saved to Firestore");
    }
    catch (error) {
        console.error("Error in signUpUser:", error);
        console.error("Error signing up or creating document:", error);
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
