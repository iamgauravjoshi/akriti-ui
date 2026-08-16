import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useDeferredValue,
  useId,
} from 'react';
import type { SelectProps, Option } from './Select.types';
import { Check, ChevronDown, ChevronUp, CircleAlert, X } from 'lucide-react';

const Select: React.FC<SelectProps> = ({
  label,
  required,
  icon,
  options = [],
  value,
  onChange,
  multiple = false,
  placeholder = 'Select an option...',
  disabled = false,
  clearable = false,
  searchable = false,
  loading = false,
  loadOptions,
  maxHeight = '200px',
  className = '',
  error = false,
  touched,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [asyncOptions, setAsyncOptions] = useState<Option[]>([]);
  const [isLoadingAsync, setIsLoadingAsync] = useState(false);
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const selectId = useId();

  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Combine static and async options
  const allOptions = useMemo(() => {
    return loadOptions ? asyncOptions : options;
  }, [options, asyncOptions, loadOptions]);

  const filteredOptions = useMemo(() => {
    if (!searchable || !deferredSearchTerm) return allOptions;
    return allOptions.filter((option) =>
      option.label.toLowerCase().includes(deferredSearchTerm.toLowerCase()),
    );
  }, [allOptions, deferredSearchTerm, searchable]);

  // Get selected options for display
  const selectedOptions = useMemo(() => {
    if (!value) return [];
    const values = Array.isArray(value) ? value : [value];
    return allOptions.filter((option) => values.includes(option.value));
  }, [value, allOptions]);

  // Handle async option loading
  const handleAsyncLoad = useCallback(
    async (inputValue: string) => {
      if (!loadOptions) return;

      setIsLoadingAsync(true);
      try {
        const newOptions = await loadOptions(inputValue);
        setAsyncOptions(newOptions);
      } catch (error) {
        console.error('Error loading options:', error);
      } finally {
        setIsLoadingAsync(false);
      }
    },
    [loadOptions],
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    setHighlightedIndex(-1);

    if (loadOptions) {
      handleAsyncLoad(newSearchTerm);
    }
  };

  // Handle option selection
  const handleOptionSelect = (option: Option) => {
    if (option.disabled) return;

    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(option.value)
        ? currentValues.filter((v) => v !== option.value)
        : [...currentValues, option.value];
      onChange(newValues);
    } else {
      onChange(option.value);
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  // Handle clear selection
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(multiple ? [] : '');
    setSearchTerm('');
  };

  // Handle remove single item (for multiple mode)
  const handleRemoveItem = (valueToRemove: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!multiple || !Array.isArray(value)) return;

    const newValues = value.filter((v) => v !== valueToRemove);
    onChange(newValues);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : 0));
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : filteredOptions.length - 1));
        }
        break;
      case 'Enter':
        e.preventDefault();
        if (isOpen && highlightedIndex >= 0) {
          handleOptionSelect(filteredOptions[highlightedIndex]);
        } else if (!isOpen) {
          setIsOpen(true);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(-1);
        break;
      case 'Backspace':
        if (multiple && Array.isArray(value) && value.length > 0 && !searchTerm) {
          const newValues = [...value];
          newValues.pop();
          onChange(newValues);
        }
        break;
    }
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  // Load initial async options
  useEffect(() => {
    if (loadOptions && !asyncOptions.length) {
      handleAsyncLoad('');
    }
  }, [loadOptions, asyncOptions.length, handleAsyncLoad]);

  const hasValue = multiple
    ? Array.isArray(value) && value.length > 0
    : value !== undefined && value !== '';

  return (
    <div className='space-y-2'>
      <label htmlFor={selectId} className='block text-sm font-semibold text-gray-700'>
        {label}
        {required && <span className='ml-1 text-red-500'>*</span>}
      </label>
      <div className={`relative leading-normal ${className}`} ref={containerRef} id={selectId}>
        {/* Main Select Button */}
        {icon && (
          <span
            className={`absolute top-1/2 left-3 z-10 -translate-y-1/2 transform ${error && touched ? 'text-red-600' : 'text-gray-600'}`}
          >
            {icon}
          </span>
        )}
        <div
          className={`relative w-full cursor-pointer rounded-lg border px-4 py-3 transition-all duration-200 ease-in-out ${
            disabled
              ? '!cursor-not-allowed !border-gray-300 !bg-gray-100'
              : error && touched
                ? 'shake border-red-500 bg-red-50 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-200'
                : isOpen
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-gray-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 hover:border-gray-400'
          } ${icon ? 'pl-10' : ''}`}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          tabIndex={disabled ? -1 : 0}
          role='combobox'
          aria-expanded={isOpen}
          aria-haspopup='listbox'
          aria-label={placeholder}
        >
          <div className='flex items-center justify-between'>
            <div className='flex flex-1 flex-wrap items-center gap-1'>
              {/* Multiple selection chips */}
              {multiple && selectedOptions.length > 0 ? (
                selectedOptions.map((option) => (
                  <span
                    key={option.value}
                    className='chip-enter inline-flex items-center gap-1 rounded-md bg-blue-100 px-2 py-1 text-sm text-blue-800'
                  >
                    {option.label}
                    {!disabled && (
                      <button
                        onClick={(e) => handleRemoveItem(option.value, e)}
                        className='rounded-full p-0.5 transition-colors hover:bg-blue-200'
                        aria-label={`Remove ${option.label}`}
                      >
                        <X size={12} className='text-blue-800' />
                      </button>
                    )}
                  </span>
                ))
              ) : (
                /* Single selection or placeholder */
                <span
                  className={`truncate ${disabled ? 'text-gray-500' : error && touched ? 'text-red-600' : 'text-gray-900'}`}
                >
                  {!multiple && selectedOptions.length > 0 ? selectedOptions[0].label : placeholder}
                </span>
              )}
            </div>

            {/* Action buttons */}
            <div className='ml-2 flex items-center gap-1'>
              {clearable && hasValue && !disabled && (
                <button
                  onClick={handleClear}
                  className='rounded p-1 transition-colors hover:bg-gray-100'
                  aria-label='Clear selection'
                >
                  <X size={14} className='text-gray-500' />
                </button>
              )}

              {loading || isLoadingAsync ? (
                <div className='h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent'></div>
              ) : isOpen ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </div>
          </div>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div
            className='select-dropdown absolute z-50 mt-1 w-full rounded-lg border border-gray-300 bg-white shadow-lg'
            style={{ maxHeight: maxHeight }}
          >
            {/* Search input */}
            {searchable && (
              <div className='border-b border-gray-200 p-2'>
                <input
                  ref={searchInputRef}
                  type='text'
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder='Search options...'
                  className='w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none'
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}

            {/* Options list */}
            <div
              className='overflow-y-auto'
              style={{ maxHeight: `calc(${maxHeight} - ${searchable ? '60px' : '0px'})` }}
            >
              {filteredOptions.length === 0 ? (
                <div className='px-3 py-2 text-center text-gray-500'>
                  {isLoadingAsync ? 'Loading...' : 'No options found'}
                </div>
              ) : (
                <div role='listbox' aria-multiselectable={multiple}>
                  {filteredOptions.map((option, index) => {
                    const isSelected = multiple
                      ? Array.isArray(value) && value.includes(option.value)
                      : value === option.value;
                    const isHighlighted = index === highlightedIndex;

                    return (
                      <div
                        key={option.value}
                        ref={(el) => {
                          optionsRef.current[index] = el;
                        }}
                        className={`cursor-pointer px-3 py-2 transition-colors duration-150 ${
                          option.disabled
                            ? '!cursor-not-allowed text-gray-400'
                            : isHighlighted
                              ? 'option-highlight text-white'
                              : isSelected
                                ? 'bg-blue-50 text-blue-700'
                                : 'hover:bg-gray-50'
                        } `}
                        onClick={() => handleOptionSelect(option)}
                        role='option'
                        aria-selected={isSelected}
                        aria-disabled={option.disabled}
                      >
                        <div className='flex items-center justify-between'>
                          <span className='truncate'>{option.label}</span>
                          {isSelected && <Check size={16} className='ml-2' />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {error && touched ? (
        <p className='fade-in flex items-center text-sm text-red-600'>
          <CircleAlert size={18} fill='#e7000b' className={'mr-1 text-white'} />
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default Select;
