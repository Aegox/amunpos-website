import React from "react";

interface EyebrowProps {
  icon?: React.ReactNode;
  text: string;
  className?: string;
}

const Eyebrow: React.FC<EyebrowProps> = ({ icon, text, className = "" }) => {
  return (
    <span className={`eyebrow-badge ${className}`}>
      {icon}
      {text}
    </span>
  );
};

export default Eyebrow;
