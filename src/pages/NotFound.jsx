import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-3 text-zinc-300">
        Page not found.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block rounded-md bg-white px-4 py-2 text-sm font-semibold text-zinc-900"
      >
        Back home
      </Link>
    </div>
  );
}
