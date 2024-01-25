import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAVAYJr9pTnndlpN66lFGLM-y_s668sKas",
  authDomain: "movie-list-6b603.firebaseapp.com",
  projectId: "movie-list-6b603",
  storageBucket: "movie-list-6b603.appspot.com",
  messagingSenderId: "852704487358",
  appId: "1:852704487358:web:0eeb25703ebddc3a17bbef",
};

export const app = initializeApp(firebaseConfig);
