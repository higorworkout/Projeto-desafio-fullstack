import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
}

export function Button({
  variant = 'primary',
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const baseClasses =
    'px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition';

  const variantes = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed w-full',
    secondary:
      'bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed w-full',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300 disabled:cursor-not-allowed w-full',
  };

  const className = `${baseClasses} ${variantes[variant]} ${
    disabled || loading ? 'pointer-events-none' : ''
  }`;

  return (
    <button className={className} disabled={disabled || loading} {...props}>
      {loading ? 'Carregando...' : children}
    </button>
  );
}