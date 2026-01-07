import useMediaQuery from "./hooks/useMediaQuery";
import { Routes, Route } from "react-router-dom";
import StarsBg from "./components/StarsBg";
import SpaceBg from "./components/SpaceBg";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export default function App() {

  const isMobile = useMediaQuery("(max-width: 640px)");
  return (
    <>
      <SpaceBg />
      <StarsBg
        count={isMobile ? 10 : 40}
        meteors={isMobile ? 2 : 6}
      />

      <div className="min-h-screen text-zinc-100">
      <div className="w-full md:mx-auto md:max-w-6xl md:border-x md:border-white/10">
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
