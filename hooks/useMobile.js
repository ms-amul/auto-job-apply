'use client';

import { useState, useEffect } from 'react';

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768 || 
                            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };

    // Check for reduced motion preference
    const checkReducedMotion = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsReducedMotion(prefersReducedMotion);
    };

    checkMobile();
    checkReducedMotion();

    const handleResize = () => checkMobile();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile, isReducedMotion };
}

