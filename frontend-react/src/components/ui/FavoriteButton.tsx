import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

interface FavoriteButtonProps {
  propertyId: string;
  initialFavorited?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  onToggle?: (isFavorited: boolean) => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  propertyId,
  initialFavorited = false,
  size = 'md',
  showText = false,
  onToggle
}) => {
  const { user } = useAuth();
  const [isFavorited, setIsFavorited] = useState(initialFavorited);
  const [isLoading, setIsLoading] = useState(false);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const buttonSizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3'
  };

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!user) return;

      try {
        const response = await api.get(`/favorites/check/${propertyId}`);
        setIsFavorited(response.data.isFavorited);
      } catch (error) {
        // Silently fail - not critical
      }
    };

    checkFavoriteStatus();
  }, [propertyId, user]);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error('Please login to save favorites');
      return;
    }

    setIsLoading(true);

    try {
      if (isFavorited) {
        await api.delete(`/favorites/${propertyId}`);
        setIsFavorited(false);
        toast.success('Removed from favorites');
      } else {
        await api.post(`/favorites/${propertyId}`);
        setIsFavorited(true);
        toast.success('Added to favorites');
      }

      onToggle?.(!isFavorited);
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to update favorites');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={isLoading}
      className={`
        ${buttonSizeClasses[size]}
        ${showText ? 'flex items-center gap-2 px-4' : ''}
        rounded-full transition-all duration-200
        ${isFavorited
          ? 'bg-red-50 text-red-500 hover:bg-red-100'
          : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
        }
        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        shadow-md hover:shadow-lg
      `}
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        className={`
          ${sizeClasses[size]}
          ${isFavorited ? 'fill-current' : ''}
          ${isLoading ? 'animate-pulse' : ''}
        `}
      />
      {showText && (
        <span className="font-medium">
          {isFavorited ? 'Saved' : 'Save'}
        </span>
      )}
    </button>
  );
};

export default FavoriteButton;
