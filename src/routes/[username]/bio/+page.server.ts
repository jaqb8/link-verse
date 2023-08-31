import { adminAuth, adminDb } from "$lib/server/admin";
import type { PageServerLoad } from "./$types";
import { error, redirect, type Actions, fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals, params }) => {
  const uid = locals.userID;

  if (!uid) {
    throw redirect(301, "/login");
  }

  const userDoc = await adminDb.collection("users").doc(uid!).get();
  const { username, bio } = userDoc.data()!;

  if (username !== params.username) {
    throw error(401, "That username doesn't belong to you!");
  }

  return {
    bio,
  };
};

export const actions = {
  default: async ({ locals, request, params }) => {
    const uid = locals.userID;
    const data = await request.formData();

    const bio = data.get("bio");

    const userRef = adminDb.collection("users").doc(uid!);
    const { username } = (await userRef.get()).data()!;

    if (username !== params.username) {
      throw error(401, "That username doesn't belong to you!");
    }

    if (bio!.length > 260) {
      return fail(400, {
        problem: "Bio must be less than 260 characters long.",
      });
    }

    await userRef.update({ bio });
  },
} satisfies Actions;
