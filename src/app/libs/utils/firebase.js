import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};




const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/**
 * Checks the user's authentication state and redirects if they are not logged in.
 * @param {import('next/navigation').AppRouterInstance} router - The Next.js router instance.
 */
function checkAuthAndRedirect(router) {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      // FIX: Redirect to the correct path based on your folder structure: /auth/login
      router.push("/auth/login"); 
    }
    // If user is logged in, no redirect happens and the user stays on the root page.
  });
}

export { auth, checkAuthAndRedirect };
