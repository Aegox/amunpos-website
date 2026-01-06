'use client';

import { animateScroll as scroll } from 'react-scroll';

const NAVBAR_SELECTOR = 'nav.navbar-slide';
const DEFAULT_DURATION = 600;

const getNavbarOffset = () => {
  const navbar = document.querySelector(NAVBAR_SELECTOR) as HTMLElement | null;
  return navbar?.offsetHeight ?? 0;
};

export const scrollToSection = (sectionId: string, extraOffset: number = 8): boolean => {
  if (typeof window === 'undefined') return false;

  const element = document.getElementById(sectionId);
  if (!element) return false;

  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const offset = getNavbarOffset() + extraOffset;
  const targetPosition = elementPosition - offset;

  scroll.scrollTo(targetPosition, {
    duration: DEFAULT_DURATION,
    smooth: 'easeInOutQuart',
  });

  return true;
};

export const scrollToHash = () => {
  if (typeof window === 'undefined') return;
  const target = window.location.hash.replace('#', '');
  if (!target) return;

  // Try immediately, and retry shortly after in case the section isn't mounted yet.
  requestAnimationFrame(() => {
    const didScroll = scrollToSection(target);
    if (!didScroll) {
      setTimeout(() => scrollToSection(target), 150);
    }
  });
};
