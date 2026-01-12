import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import "./styles/solar-system.css";
import useMediaQuery from "../hooks/useMediaQuery";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faGithub,
  faCodepen,
} from "@fortawesome/free-brands-svg-icons";

export default function SolarSystem() {
  const solarRef = useRef(null);

  const [activeId, setActiveId] = useState(null);
  const [fromPoint, setFromPoint] = useState(null);
  const [toPoint, setToPoint] = useState(null);

  const isTouchLike = useMediaQuery("(hover: none), (pointer: coarse)");

  const socials = useMemo(
    () => [
      {
        id: "ig",
        className: "p p--ig",
        href: "https://www.instagram.com/anita__lalita/",
        label: "Instagram",
        title: "Instagram",
        desc: "Follow my work and behind-the-scenes updates.",
        icon: faInstagram,
      },
      {
        id: "gh",
        className: "p p--gh",
        href: "https://github.com/AnitaMjaow",
        label: "GitHub",
        title: "GitHub",
        desc: "Open-source projects and experiments.",
        icon: faGithub,
      },
      {
        id: "cp",
        className: "p p--cp",
        href: "https://codepen.io/catfeewebdev",
        label: "CodePen",
        title: "CodePen",
        desc: "Free code snippets and UI micro-interactions.",
        icon: faCodepen,
      },
    ],
    []
  );

  /* ---------- Orbit sizing (keeps your existing behavior) ---------- */
  useEffect(() => {
    const solar = solarRef.current;
    if (!solar) return;

    const planets = Array.from(solar.querySelectorAll(".p"));
    if (!planets.length) return;

    const layout = () => {
      const { width, height } = solar.getBoundingClientRect();
      const size = Math.min(width, height);

      const inset = Math.round(size * 0.04);
      const planetSize = parseFloat(
        getComputedStyle(planets[0]).width
      );

      const maxR = size / 2 - inset - planetSize / 2 - 6;

      const radii = [
        maxR * 0.35,
        maxR * 0.55,
        maxR * 0.75,
      ];

      const config = [
        { r: radii[2], dur: 26, phase: 320 },
        { r: radii[0], dur: 14, phase: 160 },
        { r: radii[1], dur: 20, phase: 60 },
      ];

      planets.forEach((p, i) => {
        const c = config[i];
        p.style.setProperty("--r", `${c.r}px`);
        p.style.setProperty("--dur", `${c.dur}s`);
        p.style.setProperty("--phase", `${c.phase}deg`);
      });
    };

    layout();
    window.addEventListener("resize", layout);
    return () => window.removeEventListener("resize", layout);
  }, []);

  /* ---------- Connector line positioning ---------- */
  useLayoutEffect(() => {
    const solar = solarRef.current;
    if (!solar || !activeId) {
      setFromPoint(null);
      setToPoint(null);
      return;
    }

    const planet = solar.querySelector(`.p[data-id="${activeId}"]`);
    const card = solar.querySelector(".planet-card");
    if (!planet || !card) return;

    const s = solar.getBoundingClientRect();
    const p = planet.getBoundingClientRect();
    const c = card.getBoundingClientRect();

    setFromPoint({
      x: p.left - s.left + p.width / 2,
      y: p.top - s.top + p.height / 2,
    });

    setToPoint({
      x: c.left - s.left,
      y: c.top - s.top + c.height / 2,
    });
  }, [activeId]);

  const active = socials.find((s) => s.id === activeId);

  return (
    <section className="solar-wrap">
      <div className="solar2" ref={solarRef}>
        <div className="sun" />

        {/* Connector Line */}
        {fromPoint && toPoint && (
          <svg className="planet-line">
            <line
              x1={fromPoint.x}
              y1={fromPoint.y}
              x2={toPoint.x}
              y2={toPoint.y}
            />
          </svg>
        )}

        {/* Info Card */}
        {active && (
          <div className="planet-card">
            <div className="planet-card__title">
              <span className="planet-card__dot" />
              <span>
                Follow me on <strong>{active.title}</strong>
              </span>
            </div>

            <p className="planet-card__desc">{active.desc}</p>

            {isTouchLike && (
              <p className="planet-card__hint">
                Tap the planet again to open.
              </p>
            )}
          </div>
        )}

        {/* Planets */}
        {socials.map((s) => (
          <a
            key={s.id}
            data-id={s.id}
            className={s.className}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            onMouseEnter={() => !isTouchLike && setActiveId(s.id)}
            onMouseLeave={() => !isTouchLike && setActiveId(null)}
            onFocus={() => setActiveId(s.id)}
            onBlur={() => setActiveId(null)}
            onClick={(e) => {
              if (isTouchLike && activeId !== s.id) {
                e.preventDefault();
                setActiveId(s.id);
              }
            }}
          >
            <span className="p__icon">
              <FontAwesomeIcon icon={s.icon} />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
