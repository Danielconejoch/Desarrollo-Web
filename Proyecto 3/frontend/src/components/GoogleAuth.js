import { gapi } from "gapi-script";

let authInstance;

export const initializeGoogleAuth = (clientId) => {
  return new Promise((resolve, reject) => {
    gapi.load("client:auth2", () => {
      gapi.auth2
        .init({
          client_id: clientId,
          scope: "profile email",
        })
        .then((auth) => {
          authInstance = auth;
          resolve(auth);
        })
        .catch((err) => {
          console.error("Error initializing Google Auth:", err);
          reject(err);
        });
    });
  });
};

export const signInWithGoogle = async () => {
  try {
    const googleUser = await authInstance.signIn();
    const profile = googleUser.getBasicProfile();
    const idToken = googleUser.getAuthResponse().id_token;

    // Información del usuario
    return {
      idToken,
      email: profile.getEmail(),
      name: profile.getName(),
      imageUrl: profile.getImageUrl(),
    };
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

export const signOutFromGoogle = async () => {
  try {
    if (authInstance) {
      await authInstance.signOut();
      console.log("User signed out from Google.");
    }
  } catch (error) {
    console.error("Error signing out from Google:", error);
    throw error;
  }
};
