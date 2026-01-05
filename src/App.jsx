import { Routes, Route } from "react-router-dom";
import SpaceBg from "./components/SpaceBg";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <SpaceBg />
      <div className="min-h-screen text-zinc-100">
      <div className="mx-auto w-full max-w-6xl border-x border-white/10">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
      </div>
    </>
  );
}
