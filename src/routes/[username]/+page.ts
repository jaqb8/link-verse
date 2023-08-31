import type { PageLoad } from "./$types";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "$lib/firebase";
import { error } from "@sveltejs/kit";

export const load = (async ({ params }) => {
  const collectionRef = collection(db, "users");
  const q = query(
    collectionRef,
    where("username", "==", params.username),
    limit(1)
  );

  const querySnapshot = await getDocs(q);
  const exists = querySnapshot.docs[0]?.exists();

  if (!exists) {
    throw error(404, "that user does not exist");
  }

  const data = querySnapshot.docs[0].data();

  if (!data.published) {
    throw error(403, `The profile of @${data.username} is not public!`);
  }

  return {
    username: data.username,
    photoURL: data.photoURL,
    bio: data.bio,
    links: data.links ?? [],
  };
}) satisfies PageLoad;
