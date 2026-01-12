import useMediaQuery from "./hooks/useMediaQuery";
import { Routes, Route } from "react-router-dom";
import StarsBg from "./components/StarsBg";
import SpaceBg from "./components/SpaceBg";
import HoverSounds from "./components/HoverSounds";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export default function App() {

  const isMobile = useMediaQuery("(max-width: 640px)");
  return (
    <>
      <HoverSounds volume={0.25} />
      <SpaceBg />
      <StarsBg
        count={isMobile ? 10 : 40}
        meteors={isMobile ? 2 : 6}
      />

      <div className="min-h-screen flex flex-col text-zinc-100">
      <div className="flex flex-col flex-1 w-full md:mx-auto md:border-x md:border-white/10">
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
