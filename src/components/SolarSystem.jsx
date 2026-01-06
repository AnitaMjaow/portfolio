import { useEffect, useRef } from "react";
import "../components/styles/solar-system.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faGithub,
  faCodepen,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";



export default function SolarSystem() {
  const solarRef = useRef(null);

  useEffect(() => {
    const solar = solarRef.current;
    if (!solar) return;

    const planets = Array.from(solar.querySelectorAll(".p"));
    if (!planets.length) return;

    const layout = () => {
      const { width, height } = solar.getBoundingClientRect();
      const size = Math.min(width, height);

      const inset = Math.round(size * 0.04); // matches .solar2::before inset: 4%
      const outerPlanet = planets[0]; // IG outer in your config
      const planetSize =
        parseFloat(getComputedStyle(outerPlanet).width) || 44;

      const maxR = Math.round(size / 2 - inset - planetSize / 2 - 6);

      const radii = [
        Math.round(maxR * 0.38),
        Math.round(maxR * 0.58),
        Math.round(maxR * 0.78),
        Math.round(maxR * 0.98),
      ];

      const config = [
        { r: radii[3], dur: 30, phase: 320 }, // IG outer
        { r: radii[1], dur: 16, phase: 140 }, // GH inner-mid
        { r: radii[2], dur: 22, phase: 60 },  // CodePen mid
        { r: radii[0], dur: 12, phase: 260 }, // LinkedIn inner
      ];

      planets.forEach((p, i) => {
        const c = config[i] || config[0];
        p.style.setProperty("--r", `${c.r}px`);
        p.style.setProperty("--dur", `${c.dur}s`);
        p.style.setProperty("--phase", `${c.phase}deg`);
      });
    };

    // run once after mount
    layout();

    // resize handler
    const onResize = () => requestAnimationFrame(layout);
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section className="solar-wrap" aria-label="Social solar system">
      <div className="solar2" id="solar2" ref={solarRef}>
        <div className="sun" aria-hidden="true" />

        <a
        className="p p--ig"
        href="https://instagram.com/YOUR"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        >
        <span className="p__icon" aria-hidden="true">
            <FontAwesomeIcon icon={faInstagram} />
        </span>
        </a>

        <a
        className="p p--gh"
        href="https://github.com/YOUR"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        >
        <span className="p__icon" aria-hidden="true">
            <FontAwesomeIcon icon={faGithub} />
        </span>
        </a>


        <a
        className="p p--cp"
        href="https://codepen.io/YOUR"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="CodePen"
        >
        <span className="p__icon" aria-hidden="true">
            <FontAwesomeIcon icon={faCodepen} />
        </span>
        </a>

        <a
        className="p p--li"
        href="https://linkedin.com/in/YOUR"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        >
        <span className="p__icon" aria-hidden="true">
            <FontAwesomeIcon icon={faLinkedinIn} />
        </span>
        </a>
      </div>
    </section>
  );
}
