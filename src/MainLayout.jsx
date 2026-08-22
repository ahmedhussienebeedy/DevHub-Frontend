import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

export default function MainLayout() {
  return (
    <>
      <Navbar />

      <main className="pt-20">
        <Outlet />
      </main>
    </>
  );
}