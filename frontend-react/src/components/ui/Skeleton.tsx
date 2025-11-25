import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  count?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  count = 1
}) => {
  const baseClasses = 'animate-pulse bg-gray-200';

  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg'
  };

  const style = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1rem' : '100%')
  };

  const skeletons = Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  ));

  return count > 1 ? <>{skeletons}</> : skeletons[0];
};

// Property Card Skeleton
export const PropertyCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
    <Skeleton height={200} className="w-full" />
    <div className="p-4 space-y-3">
      <Skeleton variant="text" height={24} width="80%" />
      <Skeleton variant="text" height={16} width="60%" />
      <div className="flex justify-between items-center">
        <Skeleton variant="text" height={20} width="40%" />
        <Skeleton variant="text" height={20} width="30%" />
      </div>
      <div className="flex gap-2">
        <Skeleton variant="text" height={16} width="25%" />
        <Skeleton variant="text" height={16} width="25%" />
        <Skeleton variant="text" height={16} width="25%" />
      </div>
    </div>
  </div>
);

// Property List Skeleton
export const PropertyListSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, index) => (
      <PropertyCardSkeleton key={index} />
    ))}
  </div>
);

// Dashboard Stats Skeleton
export const DashboardStatsSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {Array.from({ length: 4 }).map((_, index) => (
      <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton variant="text" height={14} width={80} />
            <Skeleton variant="text" height={32} width={60} />
          </div>
          <Skeleton variant="circular" width={48} height={48} />
        </div>
      </div>
    ))}
  </div>
);

// Table Row Skeleton
export const TableRowSkeleton: React.FC<{ columns?: number }> = ({ columns = 5 }) => (
  <tr className="border-b">
    {Array.from({ length: columns }).map((_, index) => (
      <td key={index} className="p-4">
        <Skeleton variant="text" height={16} />
      </td>
    ))}
  </tr>
);

// Profile Skeleton
export const ProfileSkeleton: React.FC = () => (
  <div className="flex items-center gap-4">
    <Skeleton variant="circular" width={64} height={64} />
    <div className="space-y-2">
      <Skeleton variant="text" height={20} width={150} />
      <Skeleton variant="text" height={14} width={200} />
    </div>
  </div>
);

// Text Block Skeleton
export const TextBlockSkeleton: React.FC<{ lines?: number }> = ({ lines = 3 }) => (
  <div className="space-y-2">
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton
        key={index}
        variant="text"
        height={16}
        width={index === lines - 1 ? '60%' : '100%'}
      />
    ))}
  </div>
);

export default Skeleton;
