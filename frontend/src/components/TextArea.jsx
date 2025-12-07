import { forwardRef } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const TextArea = forwardRef(({ 
  label, 
  value, 
  onChange, 
  placeholder,
  rows = 4,
  className = '',
  error,
  success,
  required = false,
  disabled = false,
  maxLength,
  showCount = false,
  ...props 
}, ref) => {
  const remainingChars = maxLength ? maxLength - (value?.length || 0) : null;

  return (
    <div className="mb-6">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
          {showCount && maxLength && (
            <span className="float-right text-xs font-normal text-gray-400">
              {value?.length || 0}/{maxLength}
            </span>
          )}
        </label>
      )}
      
      <div className="relative">
        <textarea
          ref={ref}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          maxLength={maxLength}
          className={`
            w-full px-4 py-3 
            bg-gray-900/50 
            border ${error ? 'border-red-500' : success ? 'border-green-500' : 'border-gray-700'}
            rounded-xl 
            text-white 
            placeholder-gray-500
            focus:outline-none 
            focus:ring-2 
            ${error ? 'focus:ring-red-500/20' : success ? 'focus:ring-green-500/20' : 'focus:ring-blue-500/20'}
            focus:border-blue-500
            transition-all duration-300
            resize-none
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        />
        
        {error && (
          <div className="absolute right-3 top-3">
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>
        )}
        
        {success && !error && (
          <div className="absolute right-3 top-3">
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
        )}
      </div>
      
      {error && (
        <div className="mt-2 flex items-center space-x-2">
          <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}
      
      {success && !error && (
        <div className="mt-2 flex items-center space-x-2">
          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
          <p className="text-sm text-green-400">{success}</p>
        </div>
      )}
      
      {remainingChars !== null && remainingChars < 50 && (
        <div className="mt-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Characters remaining:</span>
            <span className={remainingChars < 20 ? 'text-amber-400' : remainingChars < 10 ? 'text-red-400' : ''}>
              {remainingChars}
            </span>
          </div>
          <div className="mt-1 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`h-full ${
                remainingChars < 10 ? 'bg-red-500' : 
                remainingChars < 20 ? 'bg-amber-500' : 
                remainingChars < 50 ? 'bg-blue-500' : 'bg-green-500'
              }`}
              style={{ width: `${((maxLength - remainingChars) / maxLength) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;