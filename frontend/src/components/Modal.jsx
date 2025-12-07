import { X, Maximize2, Minimize2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  showCloseButton = true,
  backdropClose = true,
  fullscreen = false,
  showHeader = true,
  className = '',
  ...props 
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-full mx-4',
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && backdropClose) {
      onClose();
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        {/* Modal Container */}
        <div 
          className={`
            bg-gray-800/90 backdrop-blur-sm 
            rounded-2xl 
            border border-gray-700 
            shadow-2xl
            ${isFullscreen ? 'w-full h-full max-h-[95vh]' : sizeClasses[size]}
            ${isFullscreen ? 'rounded-none sm:rounded-2xl' : ''}
            transition-all duration-300
            flex flex-col
            max-h-[90vh]
            ${className}
          `}
          {...props}
        >
          {/* Header */}
          {showHeader && (
            <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900/50">
              <div className="flex items-center space-x-3">
                {props.icon && (
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    {props.icon}
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-bold text-white">{title}</h2>
                  {props.subtitle && (
                    <p className="text-sm text-gray-400">{props.subtitle}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {/* Fullscreen Toggle */}
                {!isFullscreen && (
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                    aria-label="Enter fullscreen"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                )}
                {isFullscreen && (
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                    aria-label="Exit fullscreen"
                  >
                    <Minimize2 className="h-4 w-4" />
                  </button>
                )}
                
                {/* Close Button */}
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Content */}
          <div className={`flex-1 overflow-y-auto ${isFullscreen ? 'p-6' : 'p-6'}`}>
            {children}
          </div>

          {/* Footer (if actions provided) */}
          {props.actions && (
            <div className="p-6 border-t border-gray-700 bg-gradient-to-r from-gray-900/50 to-gray-800/30">
              <div className="flex items-center justify-end space-x-3">
                {props.actions}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen overlay styling */}
      <style jsx>{`
        @media (max-width: 640px) {
          .fullscreen-modal {
            margin: 0;
            border-radius: 0;
            max-height: 100vh;
          }
        }
      `}</style>
    </>
  );
};

export default Modal;