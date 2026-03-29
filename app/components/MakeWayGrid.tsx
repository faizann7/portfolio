'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';

type GridImage = {
  src: string;
  alt: string;
};

type MakeWayGridProps = {
  images: GridImage[];
  columns?: number;
  duration?: number; // seconds
  ease?: string; // gsap ease string
  scale?: number; // scale for active item
  maxRotation?: number; // degrees
  spread?: number; // px push distance multiplier
  maxDistance?: number; // px radius of influence
  className?: string;
};

/**
 * MakeWayGrid: A Codrops-like grid effect where surrounding items make way
 * when one item expands. Inspired by Codrops "Make Way Grid Effect".
 */
export default function MakeWayGrid({
  images,
  columns = 4,
  duration = 1,
  ease = 'elastic.out(0.5, 0.3)',
  scale = 2.5,
  maxRotation = 15,
  spread = 120,
  maxDistance = 600,
  className,
}: MakeWayGridProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Ensure refs array length matches images
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, images.length);
  }, [images.length]);

  const resetAll = useCallback(() => {
    const items = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    gsap.killTweensOf(items);
    gsap.killTweensOf(containerRef.current);
    items.forEach((el) => {
      el.style.zIndex = '';
    });
    gsap.to(items, {
      duration: 0.5,
      ease: 'power3.out',
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
    });
  }, []);

  const playEffect = useCallback(
    (index: number) => {
      const container = containerRef.current;
      if (!container) return;
      const items = itemRefs.current.map((el) => el!).filter(Boolean);
      if (!items[index]) return;

      const clicked = items[index];
      const clickedRect = clicked.getBoundingClientRect();
      const clickedCenterX = clickedRect.left + clickedRect.width / 2;
      const clickedCenterY = clickedRect.top + clickedRect.height / 2;

      // Bring clicked item to front and scale
      clicked.style.zIndex = '50';
      gsap.to(clicked, {
        duration,
        ease,
        scale,
      });

      // Push away other items depending on distance and direction
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
          // Items outside influence reset back
          gsap.to(item, { duration: 0.6, ease: 'power3.out', x: 0, y: 0, rotate: 0, scale: 1 });
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
        // Play on next frame to avoid conflicting with reset animation
        requestAnimationFrame(() => playEffect(index));
      }
    },
    [activeIndex, playEffect, resetAll]
  );

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveIndex(null);
        resetAll();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [resetAll]);

  // Cleanup on unmount
  useEffect(() => () => resetAll(), [resetAll]);

  const gridTemplateColumns = useMemo(() => `repeat(${columns}, minmax(0, 1fr))`, [columns]);

  return (
    <div
      ref={containerRef}
      className={['mw-grid w-full', className].filter(Boolean).join(' ')}
      style={{ display: 'grid', gridTemplateColumns, gap: '1rem' }}
      data-duration={duration}
      data-ease={ease}
      data-scale={scale}
      data-max-rotation={maxRotation}
      data-spread={spread}
      data-max-distance={maxDistance}
    >
      {images.map((img, i) => (
        <div
          key={i}
          ref={(el) => { itemRefs.current[i] = el; }}
          className="mw-grid__item relative aspect-square overflow-hidden rounded-[var(--radius-button)] cursor-pointer select-none bg-black/5 dark:bg-white/5"
          onClick={() => handleItemClick(i)}
          aria-label={`Grid item ${i + 1}: ${img.alt}`}
        >
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url(${img.src})` }}
          />
        </div>
      ))}
    </div>
  );
}


