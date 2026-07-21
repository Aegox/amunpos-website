import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import React from "react";

interface SocialsProps {
  styles?: string;
}

const links = [
  { href: "https://www.facebook.com/", label: "Facebook", Icon: Facebook },
  { href: "https://twitter.com/", label: "Twitter", Icon: Twitter },
  { href: "https://www.linkedin.com/", label: "LinkedIn", Icon: Linkedin },
  { href: "https://www.instagram.com/", label: "Instagram", Icon: Instagram },
];

const Socials: React.FC<SocialsProps> = ({ styles }) => {
  return (
    <div className={`${styles ?? ""} flex gap-3`}>
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          target="_blank"
          rel="noreferrer"
          className="group flex size-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-400 hover:text-white"
        >
          <Icon size={15} />
        </a>
      ))}
    </div>
  );
};

export default Socials;
