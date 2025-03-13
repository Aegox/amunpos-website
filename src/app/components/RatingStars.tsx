import React from 'react';
import { FaStar , FaStarHalfAlt } from 'react-icons/fa';

interface RatingStarsProps {
  rating: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar
          key={`full_${i}`}
          className="star filled"
          style={{ color: 'var(--primary-color)', marginRight: '4px' }}
        />
      ))}
      {hasHalfStar && (
        <FaStarHalfAlt
          key="half"
          className="star half"
          style={{ color: 'var(--primary-color)', marginRight: '4px' }}
        />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <FaStar
          key={`empty_${i}`}
          className="star empty"
          style={{ color: 'gray', marginRight: '4px' }}
        />
      ))}
    </div>
  );
};

export default RatingStars;
