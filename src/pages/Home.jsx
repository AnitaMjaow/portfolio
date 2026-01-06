import SolarSystem from "../components/SolarSystem";
export default function Home() {
  return (
    <section className="px-4 py-20">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        {/* LEFT */}
        <div>
          <p className="inline-block rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-400">
            React + Vite + Tailwind
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            Anita Olsson
          </h1>

          <p className="mt-4 text-zinc-300">
            I am a freelance WordPress theme developer working with building custom and unique experiences to showcase.
          </p>

          <p className="mt-4 text-zinc-300">
            I love to deep dive into front end to create unique styles for webpages and believe that
            minimalistic does not mean it has to be dull.
          </p>

          <SolarSystem />


          <div className="mt-6 flex gap-3">
            <a
              href="#work"
              className="rounded-md border border-zinc-800 bg-zinc-900/40 px-4 py-2 text-sm"
            >
              View work
            </a>
            <a
              href="#contact"
              className="rounded-md border border-zinc-800 bg-zinc-900/40 px-4 py-2 text-sm"
            >
              Contact
            </a>
          </div>
        </div>

        {/* RIGHT */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
          <h3 className="font-semibold">Featured</h3>
          <p className="mt-2 text-sm text-zinc-300">
            Replace this with image / video / canvas later.
          </p>
        </div>
      </div>
    </section>
  );
}
