import firebase_app from "./clientApp";
import "firebase/auth";

const auth = firebase_app.auth();

export default async function signIn(email: string, password: string) {
  let result = null,
    error: any = null;
  try {
    result = await firebase_app
      .auth()
      .signInWithEmailAndPassword(email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
