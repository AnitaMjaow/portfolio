import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import "./styles/solar-system.css";
import useMediaQuery from "../hooks/useMediaQuery";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faGithub, faCodepen } from "@fortawesome/free-brands-svg-icons";

export default function SolarSystem() {
  const solarRef = useRef(null);

  const [activeId, setActiveId] = useState(null);
  const [fromPoint, setFromPoint] = useState(null);
  const [toPoint, setToPoint] = useState(null);

  const isTouchLike = useMediaQuery("(hover: none), (pointer: coarse)");

  // Idle timeout: if user stops interacting, resume spinning
  const idleTimerRef = useRef(null);

  // Hover grace timer: lets the user travel from planet -> card without it disappearing
  const closeTimerRef = useRef(null);

  const socials = useMemo(
    () => [
      {
        id: "ig",
        className: "p p--ig",
        href: "https://www.instagram.com/anita__lalita/",
        label: "Instagram",
        title: "Instagram",
        desc: "Follow my digital diary on Instagram",
        icon: faInstagram,
      },
      {
        id: "gh",
        className: "p p--gh",
        href: "https://github.com/AnitaMjaow",
        label: "GitHub",
        title: "GitHub",
        desc: "Check out my Open-source projects and experiments.",
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

  const active = socials.find((s) => s.id === activeId);

  const clearIdleTimer = () => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  };

  const armIdleTimer = () => {
    clearIdleTimer();
    const ms = isTouchLike ? 7000 : 4500; // a bit longer on mobile for reading
    idleTimerRef.current = setTimeout(() => setActiveId(null), ms);
  };

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleClose = (ms = 320) => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setActiveId(null), ms);
  };

  useEffect(() => {
    return () => {
      clearIdleTimer();
      clearCloseTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Any interaction while card is open should reset the idle timer
  const onInteract = () => {
    if (!activeId) return;
    armIdleTimer();
  };

  // When card opens, reset timers
  useEffect(() => {
    if (activeId) {
      clearCloseTimer();
      armIdleTimer();
    } else {
      clearIdleTimer();
      clearCloseTimer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, isTouchLike]);

  /* ---------- Orbit sizing (keeps your behavior) ---------- */
  useEffect(() => {
    const solar = solarRef.current;
    if (!solar) return;

    const planets = Array.from(solar.querySelectorAll(".p"));
    if (!planets.length) return;

    const layout = () => {
      const { width, height } = solar.getBoundingClientRect();
      const size = Math.min(width, height);

      const inset = Math.round(size * 0.04);
      const planetSize = parseFloat(getComputedStyle(planets[0]).width) || 44;

      const maxR = size / 2 - inset - planetSize / 2 - 6;

      const radii = [maxR * 0.35, maxR * 0.55, maxR * 0.75];

      const config = [
        { r: radii[2], dur: 26, phase: 320 },
        { r: radii[0], dur: 14, phase: 160 },
        { r: radii[1], dur: 20, phase: 60 },
      ];

      planets.forEach((p, i) => {
        const c = config[i] || config[0];
        p.style.setProperty("--r", `${c.r}px`);
        p.style.setProperty("--dur", `${c.dur}s`);
        p.style.setProperty("--phase", `${c.phase}deg`);
      });
    };

    layout();
    const onResize = () => requestAnimationFrame(layout);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ---------- Connector line positioning ---------- */
  useLayoutEffect(() => {
    const solar = solarRef.current;
    if (!solar || !activeId) {
      setFromPoint(null);
      setToPoint(null);
      return;
    }

    const compute = () => {
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
    };

    compute();
    const onResize = () => requestAnimationFrame(compute);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeId]);

  return (
    <section className="solar-wrap" aria-label="Social solar system">
      <div
        ref={solarRef}
        className={`solar2 ${activeId ? "is-paused" : ""}`}
        onMouseMove={onInteract}
        onTouchStart={onInteract}
        onPointerDown={onInteract}
        // Optional: makes it extra forgiving if cursor leaves a planet briefly
        onMouseEnter={() => {
          if (!isTouchLike) clearCloseTimer();
        }}
        onMouseLeave={() => {
          if (!isTouchLike && activeId) scheduleClose(320);
        }}
      >
        <div className="sun" aria-hidden="true" />

        {/* Connector Line */}
        {fromPoint && toPoint && (
          <svg className="planet-line" aria-hidden="true">
            <line x1={fromPoint.x} y1={fromPoint.y} x2={toPoint.x} y2={toPoint.y} />
          </svg>
        )}

        {/* Info Card */}
        {active && (
          <div
            className="planet-card"
            role="dialog"
            aria-label={`${active.title} info`}
            // Desktop: keep card open when hovering it
            onMouseEnter={() => {
              if (!isTouchLike) clearCloseTimer();
              onInteract();
            }}
            onMouseLeave={() => {
              if (!isTouchLike) scheduleClose(220);
            }}
            // Mobile: touching card also counts as interaction (keeps it open longer)
            onTouchStart={onInteract}
          >
            <div className="planet-card__title">
              <span className="planet-card__dot" aria-hidden="true" />
              <span>
                Follow me on <strong>{active.title}</strong>
              </span>
            </div>

            <p className="planet-card__desc">{active.desc}</p>

            {/* Consistent CTA (desktop + mobile) */}
            <a
              className="planet-card__cta"
              href={active.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => {
                if (!isTouchLike) clearCloseTimer();
              }}
              onFocus={() => {
                clearCloseTimer();
                armIdleTimer();
              }}
              onClick={() => {
                // Keep it from collapsing instantly due to any pending timers
                clearCloseTimer();
                clearIdleTimer();
              }}
            >
              Go to {active.title} →
            </a>

            {/* {isTouchLike && (
              <p className="planet-card__hint">
                Tip: tap a planet to preview, or use “Go to …” above.
              </p>
            )} */}
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
            // Desktop hover behavior (with grace period)
            onMouseEnter={() => {
              if (!isTouchLike) {
                clearCloseTimer();
                setActiveId(s.id);
              }
            }}
            onMouseLeave={() => {
              if (!isTouchLike) {
                // Delay so user can move to the card
                scheduleClose(320);
              }
            }}
            onFocus={() => {
              clearCloseTimer();
              setActiveId(s.id);
            }}
            onBlur={() => {
              // Let focus move to the card link without instant close
              if (!isTouchLike) scheduleClose(220);
            }}
            onClick={(e) => {
              // Mobile: first tap previews, second tap follows link
              if (isTouchLike && activeId !== s.id) {
                e.preventDefault();
                setActiveId(s.id);
              }
            }}
          >
            <span className="p__icon" aria-hidden="true">
              <FontAwesomeIcon icon={s.icon} />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
