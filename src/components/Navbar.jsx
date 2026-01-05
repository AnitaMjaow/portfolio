import { NavLink } from "react-router-dom";

const linkBase =
  "px-3 py-2 rounded-md text-sm transition hover:bg-zinc-800";

export default function Navbar() {
  return (
    <header className="border border-zinc-800 bg-zinc-900/40">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="font-semibold">Catfeewebdev</div>

          <nav className="flex gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${linkBase} ${isActive ? "bg-zinc-800" : ""}`
              }
            >
              Home
            </NavLink>
            <a className={linkBase} href="#packages">Packages</a>
            <a className={linkBase} href="#about">About</a>
            <a className={linkBase} href="#contact">Contact</a>
          </nav>

          <a
            href="#contact"
            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-zinc-900"
          >
            Let’s talk
          </a>
        </div>
      </div>
    </header>
  );
}
