"use client";

import { useEffect, useState, useRef } from "react";

export function useScrollDirection() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY.current ? "down" : "up";

      // Only hide if scrolling down and past a threshold (e.g., 10px)
      // Always show if scrolling up
      if (direction === "down" && scrollY > 10) {
        setIsVisible(false);
      } else if (direction === "up") {
        setIsVisible(true);
      }

      lastScrollY.current = scrollY > 0 ? scrollY : 0;
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollDirection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isVisible;
}
