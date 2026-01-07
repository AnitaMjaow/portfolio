export default function Footer() {
  return (
    <footer className="border border-zinc-800 bg-zinc-900/40">
      <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-slate-400 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Catfee Web Development</p>
        <p>
          Contact:{" "}
          <a
            className="text-slate-200 hover:text-white underline underline-offset-4"
            href="mailto:catfeewebdev@gmail.com"
          >
            catfeewebdev@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
}