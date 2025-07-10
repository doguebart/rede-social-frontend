import { Route, Routes } from "react-router-dom";
import { AuthLayout } from "../pages/layout/auth";
import { Home } from "../pages/home";
import { SignIn } from "../pages/auth/signIn";
import { SignUp } from "../pages/auth/signUp";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<AuthLayout />}>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
};
