import { useState } from "react";
import { api } from "../lib/axios";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (credentials: { email: string; password: string }) => {
    try {
      setIsLoading(true);

      const response = await api.post("/auth/signin", credentials);

      const { token } = response.data;
      localStorage.setItem("token", token);

      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: {
    fullName: string;
    email: string;
    password: string;
    profilePicture: string;
  }) => {
    try {
      setIsLoading(true);

      const response = await api.post("/auth/signup", data);

      const { token } = response.data;
      localStorage.setItem("token", token);

      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, register, isLoading };
};
