import SolarSystem from "../components/SolarSystem";
import Typewriter from "../components/Typewriter";

const CARD_BASE =
  "rounded-3xl border border-white/10 bg-white/5 backdrop-blur text-white";

export default function Home() {
  return (
    <main className="min-h-screen px-4">
      <div className="mx-auto max-w-6xl">

        {/* ================= HERO SECTION ================= */}
        <section className="pt-20 pb-24 md:pt-40 md:pb-48">

          {/* Header */}
          <header className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
              Clean Lines <span className="opacity-70">+ Bold Styles</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-sm md:text-base text-white/70">
              Independent Designer & Developer. Crafting high-performance digital
              experiences for forward-thinking brands.
            </p>
          </header>

          {/* Bento Grid */}
          <section className="mt-16 md:mt-24 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">

            {/* Philosophy */}
            <article
              className={`${CARD_BASE} p-6 md:col-span-4 md:col-start-1 md:row-start-1`}
            >
              <p className="text-xs uppercase tracking-widest text-white/50">
                About
              </p>
              <h2 className="mt-3 text-lg font-semibold">Frontend Developer | UX Experimentalist</h2>
              <p className="mt-2 text-sm text-white/70">
                I push the UX envelope while keeping the design clean and the code cleaner. 
                My passion is crafting high-performance digital interfaces where less truly delivers more. I specialize in turning complex ideas into simple, functional beauty, ensuring every interaction feels intuitive and intentional.
              </p>
            </article>

            {/* Hero Image */}
            <article
              className={`${CARD_BASE} overflow-hidden md:col-span-4 md:col-start-5 md:row-span-2`}
            >
              <div className="aspect-[4/5] md:h-full md:aspect-auto">
                <img
                  src="/catfee_riding.png"
                  alt="Featured project"
                  className="h-full w-full object-cover"
                />
              </div>
            </article>

            {/* Stack */}
            <article
              className={`${CARD_BASE} p-6 md:col-span-4 md:col-start-9`}
            >
              <p className="text-xs uppercase tracking-widest text-white/50">
                Stack
              </p>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                <li>React + Vite</li>
                <li>Tailwind CSS</li>
                <li>Netlify</li>
                <li>Git</li>
                <li>Python</li>
                <li>SQL</li>
                <li>WordPress Theme Development</li>
                <li>WooCommerce</li>
              </ul>
            </article>

            {/* Portfolio */}
            <article
              className={`${CARD_BASE} p-6 md:col-span-4 md:col-start-1 md:row-start-2`}
            >
              <h2 className="text-lg font-semibold tracking-tight">
                PORTFOLIO / FREELANCE
              </h2>
              <p className="mt-4 text-sm text-white/70">
                This section contains selected work.
                <br />
                If you’re an employer or potential client, feel free to request
                access.
              </p>
              <p className="pt-4 text-sm text-white/80">
                catfeewebdev@gmail.com
              </p>
            </article>

            {/* Quote */}
            <article
              className={`${CARD_BASE} p-6 flex items-center justify-center text-center italic md:col-span-4 md:col-start-9 md:row-start-2`}
            >
              “Lets make the internet a little more interesting together”
            </article>

            {/* Wide Image */}
            <article
              className={`${CARD_BASE} overflow-hidden md:col-span-12 md:row-start-3`}
            >
              <div className="aspect-[16/10] md:aspect-[21/9]">
                <img
                  src="/control-room.png"
                  alt="Control room"
                  className="h-full w-full object-cover object-[center_35%] md:object-center"
                />
              </div>
            </article>

          </section>
        </section>

        {/* ================= SCROLL PAUSE ================= */}
        <section className="py-24 md:py-40" />

        {/* ================= SOCIAL / SOLAR SECTION ================= */}
        <section className="relative py-24 md:py-40 text-center">

          <Typewriter
            text="Follow me on social media"
            speed={70}
            startDelay={400}
            pauseAfter={1800}
            pauseBetween={900}
            loop
            sound
            className="neon-text text-lg md:2xl tracking-wide text-zinc-200 drop-shadow-[0_0_12px_rgba(120,200,255,0.25)]"
          />

          <div className="mt-12 md:mt-20">
            <SolarSystem />
          </div>

        </section>

      </div>
    </main>
  );
}
