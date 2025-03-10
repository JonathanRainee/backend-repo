import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { User } from "../entities/user";
import { userAuth, db } from "../config/firebaseConfig"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import e from 'express';

export const fetchUser = async (userId: string) => {
    const userRef = doc(db, 'USERS', userId);
    const userSnap = await getDoc(userRef);

    if(userSnap.exists()){
        return userSnap.data() as User;
    }else{
        return null;
    }
};

export const updateUser = (userId: string, data: Partial<User>): Promise<void> => {
    const userRef = doc(db, 'USERS', userId);
    return updateDoc(userRef, data);
};

export const signUpUser = async (email: string, password: string, age: number, name: string) => {

    try {
        const newUser = await createUserWithEmailAndPassword(userAuth, email, password);
        const user = newUser.user;
    
        const userDocRef = doc(db, "USERS", user.uid);
    
        await setDoc(userDocRef, {
            email: user.email,
            name: name,
            age: age,
            uid: user.uid,
        });
    } catch (error) {
        console.error("Error signing up or creating document:", error);
    }
}

export const signInUser = async (email: string, password: string):Promise<UserCredential> => {
    try {
        const response = await signInWithEmailAndPassword(userAuth, email, password);
        return response;
    } catch (error) {
        console.error("Error signing in user:", error);
        throw error;
    }
}