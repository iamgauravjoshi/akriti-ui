import React, { useEffect, useRef, useState } from 'react';



interface MultiSelectDropdownProps {
  options: { value: string; label: string }[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
                                                                   options,
                                                                   selectedValues,
                                                                   onChange,
                                                                   placeholder = "Select options...",
                                                                   className = "",
                                                                   required = false
                                                                 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement|null>(null);
  const triggerRef = useRef<HTMLButtonElement|null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };
    if(typeof document !=='undefined') {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    onChange(newValues);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(0);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => (prev + 1) % options.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => prev <= 0 ? options.length - 1 : prev - 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusedIndex >= 0) {
          toggleOption(options[focusedIndex].value);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        triggerRef.current?.focus();
        break;
    }
  };

  const getSelectedLabels = () => {
    return selectedValues.map(value => {
      const option = options.find(opt => opt.value === value);
      return option ? option.label : value;
    });
  };

  const displayText = selectedValues.length === 0
    ? placeholder
    : selectedValues.length === 1
      ? getSelectedLabels()[0]
      : `${selectedValues.length} items selected`;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`w-full px-3 py-2 text-left border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white ${
          selectedValues.length === 0 ? 'text-gray-500' : 'text-gray-900'
        } border-gray-200 hover:border-gray-300`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-required={required}
      >
        <div className="flex items-center justify-between">
          <span className="block truncate">{displayText}</span>
          <svg
            className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </button>

      {/* Selected Values Display (when multiple selected) */}
      {selectedValues.length > 1 && (
        <div className="mt-1 flex flex-wrap gap-1">
          {getSelectedLabels().map((label, index) => (
            <span
              key={selectedValues[index]}
              className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
            >
              {label}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleOption(selectedValues[index]);
                }}
                className="ml-1 hover:bg-blue-200 rounded-full p-0.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"/>
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Dropdown Options */}
      {isOpen && (
        <div
          className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          <div role="listbox" aria-multiselectable="true">
            {options.map((option, index) => {
              const isSelected = selectedValues.includes(option.value);
              const isFocused = index === focusedIndex;

              return (
                <div
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  className={`relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-gray-50 ${
                    isFocused ? 'bg-blue-50' : ''
                  } ${isSelected ? 'bg-blue-50' : ''}`}
                  onClick={() => toggleOption(option.value)}
                  onMouseEnter={() => setFocusedIndex(index)}
                >
                  <div className="flex items-center">
                    <span className={`block truncate ${isSelected ? 'font-semibold text-blue-900' : 'text-gray-900'}`}>
                      {option.label}
                    </span>
                  </div>

                  {isSelected && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"/>
                      </svg>
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Clear All / Select All Actions */}
          {options.length > 0 && (
            <div className="border-t border-gray-200 px-3 py-2 bg-gray-50">
              <div className="flex justify-between text-xs">
                <button
                  type="button"
                  onClick={() => onChange([])}
                  className="text-gray-600 hover:text-gray-800 hover:underline focus:outline-none focus:underline"
                  disabled={selectedValues.length === 0}
                >
                  Clear All
                </button>
                <button
                  type="button"
                  onClick={() => onChange(options.map(opt => opt.value))}
                  className="text-blue-600 hover:text-blue-800 hover:underline focus:outline-none focus:underline"
                  disabled={selectedValues.length === options.length}
                >
                  Select All
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MultiSelectDropdown;
