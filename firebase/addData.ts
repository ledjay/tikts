import firebase_app from "./clientApp";
import "firebase/firestore";

const db = firebase_app.firestore();

export async function addData(colllection: any, id: any, data: any) {
  let result = null,
    error: any = null;
  try {
    result = await db
      .collection(colllection)
      .doc(id)
      .set({ data }, { merge: true });
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function editData(colllection: any, data: any) {
  let result = null,
    error: any = null;
  try {
    result = await db.collection(colllection).add(data);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
