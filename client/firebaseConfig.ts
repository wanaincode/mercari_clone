// client/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "API Key",
  authDomain: "ProjectID.firebaseapp.com",
  projectId: "ProjectID",
  storageBucket: "ProjectID.appspot.com",
  messagingSenderId: "SenderID",
  appId: "AppID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);