// components/LoadingSpinner.tsx
import React from 'react';

const BouncingDotsLoader: React.FC = () => {
  return (
    <div
      className='flex min-h-screen flex-col items-center justify-center'
      role='status'
      aria-live='polite'
      aria-label='Loading content'
    >
      <div className='flex space-x-3' aria-hidden='true'>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className='h-6 w-6 animate-bounce rounded-full bg-white'
            style={{ animationDelay: `${i * 0.2}s`, animationDuration: '1s' }}
          />
        ))}
      </div>
      <span className='mt-8 text-2xl font-medium text-white select-none'>Loading...</span>
    </div>
  );
};

const RingSpinner: React.FC = () => {
  return (
    <div className='flex h-20 items-center justify-center'>
      <div className='h-12 w-12 animate-spin rounded-full border-b-3 border-blue-600'></div>
    </div>
  );
};

const RotatingDotsSpinner: React.FC = () => {
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='relative h-16 w-16 animate-spin'>
        <div className='absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white'></div>
        <div className='absolute top-0 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-white'></div>
        <div className='absolute top-1/2 right-0 h-3 w-3 -translate-y-1/2 rounded-full bg-white'></div>
        <div className='absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-white'></div>
        <div className='absolute top-1/2 left-0 h-3 w-3 -translate-y-1/2 rounded-full bg-white'></div>
      </div>
    </div>
  );
};

export { BouncingDotsLoader, RingSpinner, RotatingDotsSpinner };
