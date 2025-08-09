'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./playground.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { getImagePath } from "../utils/assets";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function PlaygroundPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // MakeWayGrid-like state and refs
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    // ensure refs array is at least large enough
    const total = itemRefs.current.length;
    itemRefs.current = itemRefs.current.slice(0, total);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    let lenis: Lenis | null = null;
    let tickerFn: ((time: number) => void) | null = null;
    const container = containerRef.current;

    const preloadBackgroundImages = async () => {
      const mod: any = await import("imagesloaded");
      const imagesLoaded = mod.default || mod;
      return new Promise<void>((resolve) => {
        const elements = container.querySelectorAll(".column__item-img");
        imagesLoaded(elements, { background: true }, () => resolve());
      });
    };

    const initSmoothScroll = () => {
      try {
        lenis = new Lenis({ lerp: 0.15, smoothWheel: true });

        // hook lenis with gsap ticker using a stable reference
        tickerFn = (time: number) => {
          lenis?.raf(time * 1000);
        };
        gsap.ticker.add(tickerFn);

        lenis.on("scroll", () => {
          ScrollTrigger.update();
        });

        // scroller proxy for more reliable measurements
        ScrollTrigger.scrollerProxy(document.documentElement, {
          scrollTop(value) {
            if (arguments.length && typeof value === "number") {
              lenis?.scrollTo(value);
            }
            return window.scrollY || document.documentElement.scrollTop || 0;
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
          },
          pinType: "transform",
        });

        ScrollTrigger.defaults({ scroller: document.documentElement as any });
      } catch {
        // If Lenis fails or conflicts, continue without it
        ScrollTrigger.refresh();
      }
    };

    const setupScrollAnimations = () => {
      const grid = container.querySelector(".columns");
      if (!grid) return;
      const columns = Array.from(grid.querySelectorAll(".column"));
      const items = columns.map((column, colIndex) =>
        Array.from(column.querySelectorAll(".column__item")).map((el) => ({
          element: el as HTMLElement,
          column: colIndex,
          wrapper: (el as HTMLElement).querySelector(
            ".column__item-imgwrap"
          ) as HTMLElement,
          image: (el as HTMLElement).querySelector(
            ".column__item-img"
          ) as HTMLElement,
        }))
      );

      const mergedItems = items.flat();

      if (columns[1]) {
        gsap.to(columns[1], {
          ease: "none",
          scrollTrigger: {
            trigger: grid,
            start: "clamp(top bottom)",
            end: "clamp(bottom top)",
            scrub: true,
          },
          yPercent: -20,
        });
      }

      mergedItems.forEach((item) => {
        if (item.column === 1) return;
        gsap.to(item.wrapper, {
          ease: "none",
          startAt: {
            transformOrigin: item.column === 0 ? "0% 100%" : "100% 100%",
          },
          scrollTrigger: {
            trigger: item.element,
            start: "clamp(top bottom)",
            end: "clamp(bottom top)",
            scrub: true,
          },
          rotation: item.column === 0 ? -6 : 6,
          xPercent: item.column === 0 ? -10 : 10,
        });
      });

      // ensure after layout
      setTimeout(() => ScrollTrigger.refresh(), 50);
    };

    let ctx: gsap.Context | null = null;
    let isMounted = true;

    (async () => {
      await preloadBackgroundImages();
      if (!isMounted) return;
      initSmoothScroll();
      ctx = gsap.context(() => {
        setupScrollAnimations();
      }, container);
    })();

    return () => {
      isMounted = false;
      ctx?.revert();
      if (tickerFn) gsap.ticker.remove(tickerFn);
      lenis?.destroy();
    };
  }, []);

  const imagePaths = useMemo(
    () => Array.from({ length: 15 }, (_, i) => `/images/playground/Card-${i + 1}.webp`),
    []
  );

  const images = useMemo(() => {
    const col1: string[] = [];
    const col2: string[] = [];
    const col3: string[] = [];
    imagePaths.forEach((src, idx) => {
      const prefixed = getImagePath(src);
      if (idx % 3 === 0) col1.push(prefixed);
      else if (idx % 3 === 1) col2.push(prefixed);
      else col3.push(prefixed);
    });
    return { col1, col2, col3 };
  }, [imagePaths]);

  // MakeWayGrid-like behavior
  const duration = 1; // seconds
  const ease = "elastic.out(0.5, 0.3)";
  const scale = 1.8;
  const maxRotation = 15;
  const spread = 120; // px push distance multiplier
  const maxDistance = 600; // px radius of influence

  const resetAll = useCallback(() => {
    const items = itemRefs.current.filter(Boolean) as HTMLElement[];
    gsap.killTweensOf(items);
    items.forEach((el) => {
      el.style.zIndex = "";
    });
    // reset column stacking context priorities
    const columns = containerRef.current?.querySelectorAll<HTMLElement>(".column");
    columns?.forEach((col) => {
      col.style.zIndex = "";
    });
    gsap.to(items, {
      duration: 0.5,
      ease: "power3.out",
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
    });
  }, []);

  const playEffect = useCallback(
    (index: number) => {
      const items = itemRefs.current.filter(Boolean) as HTMLElement[];
      if (!items[index]) return;

      const clicked = items[index];
      const clickedRect = clicked.getBoundingClientRect();
      const clickedCenterX = clickedRect.left + clickedRect.width / 2;
      const clickedCenterY = clickedRect.top + clickedRect.height / 2;

      // Elevate the entire column of the clicked item above others
      const clickedColumn = clicked.closest<HTMLElement>(".column");
      if (clickedColumn) {
        const allColumns = containerRef.current?.querySelectorAll<HTMLElement>(".column");
        allColumns?.forEach((col) => {
          col.style.zIndex = col === clickedColumn ? "1000" : "";
        });
      }

      clicked.style.zIndex = "2000";
      gsap.to(clicked, {
        duration,
        ease,
        scale,
      });

      items.forEach((item, i) => {
        if (i === index) return;
        const rect = item.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = centerX - clickedCenterX;
        const dy = centerY - clickedCenterY;
        const distance = Math.hypot(dx, dy);
        const influence = Math.max(0, Math.min(1, 1 - distance / maxDistance));
        if (influence <= 0) {
          gsap.to(item, { duration: 0.6, ease: "power3.out", x: 0, y: 0, rotate: 0, scale: 1 });
          return;
        }
        const norm = distance === 0 ? { x: 0, y: 0 } : { x: dx / distance, y: dy / distance };
        const push = spread * influence;
        const rot = (Math.random() * 2 - 1) * maxRotation * influence;
        gsap.to(item, {
          duration,
          ease,
          x: norm.x * push,
          y: norm.y * push,
          rotate: rot,
          scale: 1,
        });
      });
    },
    [duration, ease, maxDistance, maxRotation, spread, scale]
  );

  const handleItemClick = useCallback(
    (index: number) => {
      if (activeIndex === index) {
        setActiveIndex(null);
        resetAll();
      } else {
        setActiveIndex(index);
        resetAll();
        requestAnimationFrame(() => playEffect(index));
      }
    },
    [activeIndex, playEffect, resetAll]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
        resetAll();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [resetAll]);

  // compute global start indices for each column
  const col1Start = 0;
  const col2Start = images.col1.length;
  const col3Start = images.col1.length + images.col2.length;

  return (
    <div ref={containerRef} className={`${styles.playgroundRoot} ${styles.playground2}`}>
      <div className="max-w-[1120px] mx-auto pt-24 md:pt-32 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Playground</h1>
      </div>
      <main className={styles.main}>
        <div className="columns">
          <div className="column">
            {images.col1.map((src, idx) => {
              const globalIndex = col1Start + idx;
              return (
                <figure
                  key={`c1-${idx}`}
                  className="column__item"
                  ref={(el) => {
                    itemRefs.current[globalIndex] = el;
                  }}
                  onClick={() => handleItemClick(globalIndex)}
                  aria-label={`Grid item ${globalIndex + 1}`}
                >
                  <div className="column__item-imgwrap">
                    <div
                      className="column__item-img"
                      style={{ backgroundImage: `url(${src})` }}
                    />
                  </div>
                </figure>
              );
            })}
          </div>
          <div className="column">
            {images.col2.map((src, idx) => {
              const globalIndex = col2Start + idx;
              return (
                <figure
                  key={`c2-${idx}`}
                  className="column__item"
                  ref={(el) => {
                    itemRefs.current[globalIndex] = el;
                  }}
                  onClick={() => handleItemClick(globalIndex)}
                  aria-label={`Grid item ${globalIndex + 1}`}
                >
                  <div className="column__item-imgwrap">
                    <div
                      className="column__item-img"
                      style={{ backgroundImage: `url(${src})` }}
                    />
                  </div>
                </figure>
              );
            })}
          </div>
          <div className="column">
            {images.col3.map((src, idx) => {
              const globalIndex = col3Start + idx;
              return (
                <figure
                  key={`c3-${idx}`}
                  className="column__item"
                  ref={(el) => {
                    itemRefs.current[globalIndex] = el;
                  }}
                  onClick={() => handleItemClick(globalIndex)}
                  aria-label={`Grid item ${globalIndex + 1}`}
                >
                  <div className="column__item-imgwrap">
                    <div
                      className="column__item-img"
                      style={{ backgroundImage: `url(${src})` }}
                    />
                  </div>
                </figure>
              );
            })}
          </div>
        </div>
      </main>
      <div className="max-w-[1120px] mx-auto px-4">
        <Footer />
      </div>
    </div>
  );
} 