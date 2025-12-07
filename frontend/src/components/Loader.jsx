import { Shield, Loader2 } from 'lucide-react';

const Loader = ({ 
  size = 'md',
  type = 'spinner',
  text = 'Loading...',
  fullScreen = false,
  backdrop = false,
  overlay = false,
  className = '',
}) => {
  
  const sizeClasses = {
    sm: {
      icon: 'h-6 w-6',
      text: 'text-sm',
      spinner: 'w-8 h-8 border-3',
    },
    md: {
      icon: 'h-10 w-10',
      text: 'text-base',
      spinner: 'w-12 h-12 border-4',
    },
    lg: {
      icon: 'h-14 w-14',
      text: 'text-lg',
      spinner: 'w-16 h-16 border-4',
    },
  };

  const currentSize = sizeClasses[size];

  const loaderContent = (
    <div className={`flex flex-col items-center justify-center ${overlay ? 'backdrop-blur-sm rounded-2xl p-8' : ''} ${className}`}>
      {type === 'spinner' ? (
        <>
          <div className={`${currentSize.spinner} border-blue-600 border-t-transparent rounded-full animate-spin mb-4`}></div>
          <p className={`${currentSize.text} text-gray-300 font-medium`}>{text}</p>
        </>
      ) : type === 'dots' ? (
        <>
          <div className="flex space-x-2 mb-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <p className={`${currentSize.text} text-gray-300 font-medium`}>{text}</p>
        </>
      ) : type === 'pulse' ? (
        <>
          <div className="relative mb-4">
            <div className={`${currentSize.icon} bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full animate-pulse`}></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full animate-ping opacity-20"></div>
          </div>
          <p className={`${currentSize.text} text-gray-300 font-medium`}>{text}</p>
        </>
      ) : type === 'logo' ? (
        <>
          <div className="relative mb-4">
            <div className={`${currentSize.icon} bg-blue-600/20 rounded-xl flex items-center justify-center border border-blue-500/30`}>
              <Shield className="h-1/2 w-1/2 text-blue-400" />
            </div>
            <div className="absolute inset-0 bg-blue-600/10 rounded-xl animate-ping"></div>
          </div>
          <p className={`${currentSize.text} text-gray-300 font-medium`}>{text}</p>
        </>
      ) : type === 'progress' ? (
        <>
          <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 animate-progress"></div>
          </div>
          <p className={`${currentSize.text} text-gray-300 font-medium`}>{text}</p>
        </>
      ) : (
        // Default: spinner with icon
        <>
          <div className="relative mb-4">
            <div className={`${currentSize.spinner} border-blue-600 border-t-transparent rounded-full animate-spin`}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className={`${currentSize.icon} text-blue-400 animate-spin-slow`} />
            </div>
          </div>
          <p className={`${currentSize.text} text-gray-300 font-medium`}>{text}</p>
        </>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className={`fixed inset-0 z-50 ${backdrop ? 'bg-black/50 backdrop-blur-sm' : 'bg-gray-900'} flex items-center justify-center`}>
        {loaderContent}
      </div>
    );
  }

  return loaderContent;
};

export default Loader;

// Add custom animation styles
const styles = `
  @keyframes progress {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(400%); }
  }
  
  .animate-progress {
    animation: progress 2s ease-in-out infinite;
  }
  
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .animate-spin-slow {
    animation: spin-slow 3s linear infinite;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}