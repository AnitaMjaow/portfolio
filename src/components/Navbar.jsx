import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const linkBase =
  "px-3 py-2 rounded-md text-sm transition hover:bg-zinc-800";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Close menu on ESC
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Close menu when switching to desktop breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)"); // md
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return (
    <header className="border border-zinc-800 bg-zinc-900/40">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="font-semibold">Catfeewebdev</div>

          {/* Desktop nav */}
          <nav className="hidden md:flex md:items-center md:gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${linkBase} ${isActive ? "bg-zinc-800" : ""}`
              }
            >
              Home
            </NavLink>
            <a className={linkBase} href="#portfolio">
              Portfolio
            </a>
            <a className={linkBase} href="#freelance">
              Freelance
            </a>
          </nav>

          {/* Desktop CTA
          <a
            href="#contact"
            className="hidden md:inline-flex rounded-md bg-white px-3 py-2 text-sm font-semibold text-zinc-900"
          >
            Let’s talk
          </a> */}

          {/* Mobile hamburger */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-zinc-700 px-3 py-2 text-sm md:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {/* simple icon */}
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 bg-zinc-200 transition ${
                  open ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-5 bg-zinc-200 transition ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-3 h-0.5 w-5 bg-zinc-200 transition ${
                  open ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        {/* Mobile panel */}
        {open && (
          <div className="md:hidden pb-4">
            <div className="mt-2 grid gap-1 rounded-xl border border-zinc-800 bg-zinc-950/60 p-2">
              <NavLink
                to="/"
                end
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? "bg-zinc-800" : ""}`
                }
              >
                Home
              </NavLink>

              <a
                className={linkBase}
                href="#portfolio"
                onClick={() => setOpen(false)}
              >
                Portfolio
              </a>
              <a
                className={linkBase}
                href="#freelance"
                onClick={() => setOpen(false)}
              >
                Freelance
              </a>
              {/* <a
                className={linkBase}
                href="#contact"
                onClick={() => setOpen(false)}
              >
                Contact
              </a>

              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-md bg-white px-3 py-2 text-center text-sm font-semibold text-zinc-900"
              >
                Let’s talk
              </a> */}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
