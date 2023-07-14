import firebase_app from "./clientApp";
import "firebase/firestore";

const db = firebase_app.firestore();

export async function updateData(
  colllection: any,
  id: any,
  key: any,
  value: any
) {
  let result = null,
    error: any = null;
  try {
    console.log(key);
    result = await db.collection(colllection).doc(id).set(
      {
        status: value,
      },
      { merge: true }
    );
  } catch (e) {
    error = e;
  }

  return { result, error };
}
