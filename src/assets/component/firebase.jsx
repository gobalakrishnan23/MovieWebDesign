// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSiCICwVVm3GfUqpgmhhm0fXiJPnQ8jKQ",
  authDomain: "movie-website-257d0.firebaseapp.com",
  projectId: "movie-website-257d0",
  storageBucket: "movie-website-257d0.firebasestorage.app",
  messagingSenderId: "257553780404",
  appId: "1:257553780404:web:d7fea0f49635ff050291e1",
  measurementId: "G-XMFCZXR8D0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
<GoogleOAuthProvider clientId="">
                 <GoogleLogin
                    onSuccess={(response) => console.log(response)}
                    onError={() => console.log("Login Failed")}
                 />
                </GoogleOAuthProvider>