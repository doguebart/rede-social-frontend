import { useEffect } from "react";
import { Router } from "./router";
import { signInAnonymouslyFirebase } from "./services/firebase";

export const App = () => {
  useEffect(() => {
    signInAnonymouslyFirebase();
  }, []);

  return <Router />;
};
