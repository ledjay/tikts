import firebase_app from "./clientApp";
import "firebase/firestore";

const db = firebase_app.firestore();

export async function fetchTikts(colllection: string, uid: string) {
  let result = null,
    error: any = null;
  try {
    result = await db
      .collection(colllection)
      .where("uid", "==", uid)
      .where("status", "==", "active")
      .get()
      .then((querySnapshot) => {
        let data: any = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          let tikt = { id: doc.id, ...doc.data() };
          data.push(tikt);
        });

        data.sort((a: any, b: any) => {
          return a.createdAt < b.createdAt ? 1 : -1;
        });

        return data;
      });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
