'use client';

import { useEffect } from 'react';
import { scrollToHash } from '../utils/scroll';

const SmoothScrollManager = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    scrollToHash();

    const handleHashChange = () => {
      scrollToHash();
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return null;
};

export default SmoothScrollManager;
