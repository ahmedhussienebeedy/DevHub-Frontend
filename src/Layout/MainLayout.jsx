import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

export default function MainLayout() {
  return (
    <>
      <Navbar />

      <main className="pt-20 min-h-screen bg-slate-950 text-white">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}