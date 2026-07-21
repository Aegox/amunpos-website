import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className="size-4"
          fill={n <= Math.round(rating) ? "var(--primary-500)" : "none"}
          stroke={n <= Math.round(rating) ? "var(--primary-500)" : "var(--stroke-sub-300)"}
        />
      ))}
    </div>
  );
};

export default RatingStars;
