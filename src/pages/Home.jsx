import SolarSystem from "../components/SolarSystem";
import Typewriter from "../components/Typewriter";

export default function Home() {
  return (
    <section className="px-4 py-20">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        {/* LEFT */}
        <div>
          <h1 className="mt-4 text-4xl font-bold md:text-4xl">
            Clean Lines + Bold Styles
          </h1>

          <p className="mt-4 text-zinc-300">
            I’m Anita, and I build high-end web experiences for the fun of it. I
            love both sallads and burgers the same for clean lines and bold
            styles.
          </p>

          <SolarSystem />

          {/* <div className="mt-6 flex gap-3">
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
          </div> */}
        </div>

        {/* RIGHT */}

        <p>
          <Typewriter
            text={`Follow me on social media`}
            speed={70}
            startDelay={400}
            pauseAfter={1800}
            pauseBetween={900}
            loop
            sound 
            className="neon-text text-xs md:text-base tracking-wide text-zinc-200 drop-shadow-[0_0_12px_rgba(120,200,255,0.25)]"
          />
        </p>

        {/* SPANNING PILL (desktop) */}
        <div className="md:col-span-2">
          <div
            className="
      w-full
      md:w-auto
      max-w-full
      md:max-w-none
      rounded-2xl
      md:rounded-full
      border border-white/10
      bg-zinc-900/40
      px-4 py-2
      text-m
      text-center 
      text-zinc-300 
      backdrop-blur
      wrap-break-words
      whitespace-normal
    "
          >
            WordPress Theme Development + React + Vite + Tailwind + Python + UX
            + Data Analytics
          </div>
        </div>




        <h1 className="mt-4 text-4xl font-bold md:text-4xl">
            Portfolio
        </h1>

          <p className="mt-4 text-zinc-300">
            Send me a request and I'll give you access to display my work.
             Somehow the Aliens has shut down this page and I need to ask their leader
             for the password.
          </p>

        <h1 className="mt-4 text-4xl font-bold md:text-4xl">
            Freelance
        </h1>

          <p className="mt-4 text-zinc-300">
            The aliens has been active and has also shut down my freelance page.
            So you will need a password for that too!
          </p>



      </div>
    </section>
  );
}
