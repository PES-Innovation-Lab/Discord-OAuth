import { app, database, auth } from "./firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import generateKey from "../utils/generateKey.util";

export const dbInstance = collection(database, "links");
const googleProvider = new GoogleAuthProvider();


export const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(dbInstance, where("uid", "==", user.uid));
        const docs = await getDocs(q);
        const password = generateKey();
        if (docs.docs.length === 0) {
            await addDoc(dbInstance, {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            password: password
            });
        }
    } catch (err: any) {
        console.error(err);
        alert(err.message);
    }
};

export const logOut = async () => {
    signOut(auth)
        .then(() => {
            console.log("Signed out");
        })
        .catch((err: any) => {
            console.log(err);
        })
    localStorage.removeItem("user");
}
