import React from 'react';

type LoadingFallbackProps = {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
  withOverlay?: boolean;
};

const LoadingFallback: React.FC<LoadingFallbackProps> = ({
  message = 'Loading...',
  size = 'medium',
  fullScreen = false,
  withOverlay = false,
}) => {
  // Size configurations
  const sizeConfig = {
    small: {
      spinner: 'h-4 w-4',
      text: 'text-sm',
      padding: 'p-2',
    },
    medium: {
      spinner: 'h-8 w-8',
      text: 'text-base',
      padding: 'p-4',
    },
    large: {
      spinner: 'h-12 w-12',
      text: 'text-lg',
      padding: 'p-6',
    },
  };

  const { spinner, text, padding } = sizeConfig[size];

  // Container classes based on props
  const containerClasses = `
    flex flex-col items-center justify-center ${padding}
    ${fullScreen ? 'fixed inset-0 z-50' : 'flex items-center justify-center w-full h-full min-h-20'}
    ${withOverlay && fullScreen ? 'bg-zinc-950 bg-opacity-75' : ''}
  `;

  // Wrapper div to center the component when not fullScreen
  const wrapperClasses = !fullScreen ? 'flex items-center justify-center w-full h-full' : '';

  return (
    <div className={wrapperClasses}>
      <div className={containerClasses}>
        {/* Spinner */}
        <svg 
          className={`animate-spin text-blue-500 ${spinner}`} 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          ></circle>
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        
        {/* Message */}
        {message && (
          <p className={`mt-4 text-gray-700 font-medium ${text}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoadingFallback;