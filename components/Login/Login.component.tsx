import { NextPage } from "next";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { auth } from "../../db/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, getDocs, where } from "firebase/firestore";
import { signInWithGoogle, dbInstance } from "../../db/db";
import { useEffect } from "react";
import PIL_Logo from "../../assets/PIL.jpeg";


interface LoginProps {
    setPassword: Dispatch<SetStateAction<string>>;
    setDisplayState: Dispatch<SetStateAction<string>>;
};

const Login : NextPage<LoginProps> = (props) => {
    const [user, loading, error] = useAuthState(auth);

    const fetchPassword = async () => {
        try {
          const q = query(dbInstance, where("uid", "==", user?.uid));
          const doc = await getDocs(q);
          const data = doc.docs[0].data();
          props.setPassword(data.password);
        } catch (err) {
          console.error(err);
          alert("An error occured while fetching password");
        }
    };

    useEffect(() => {
        (async () => {
          if (loading) {
            props.setDisplayState("loading");
          } else if (user) {
            props.setDisplayState("user");
            await fetchPassword();
          }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [user, loading]);


    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <div>
                        <Image src={PIL_Logo} alt="PIL Logo" className="mx-auto h-12 w-auto" layout="responsive"/>
                    </div>
                    <div>
                        <br />
                        <button
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => signInWithGoogle()}
                        >
                            Sign in with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
