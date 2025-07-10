import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center flex-col xl:flex-row gap-[2rem] px-6 xl:px-0">
      <Outlet />
    </div>
  );
};
