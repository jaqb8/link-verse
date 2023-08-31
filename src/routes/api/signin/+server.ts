import { adminAuth } from "$lib/server/admin";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, cookies }) => {
  const { idToken } = await request.json();

  const expiresIn = 60 * 60 * 24 * 7 * 1000;

  const decodedIdToken = await adminAuth.verifyIdToken(idToken);

  // cookie should only be set if the user authenticated recently
  if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
    const cookie = await adminAuth.createSessionCookie(idToken, { expiresIn });
    const options = {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
      path: "/", // if not set, cookie will only be scoped to /api/signin
    };

    cookies.set("__session", cookie, options); // cookie name must be __session in order to deploy to Firebase (Firebase will cache this data on CDN)

    return json({ status: "signedIn" });
  } else {
    throw error(401, "Recent sign in required!");
  }
};

export const DELETE: RequestHandler = async ({ cookies }) => {
  cookies.delete("__session");
  return json({ status: "signedOut" });
};
