import React from 'react';

// Import the external CSS module

interface AccessibleButtonProps {
  name: string;
  label: string;
  intent: 'primary' | 'primary/small' |'primary/xs' | 'secondary' | 'danger';
  fullWidth?: boolean;
  onClick?: () => void;
  href?: string;
}

export default function AccessibleButton({
  name,
  label,
  intent,
  fullWidth,
  onClick,
  href
}: AccessibleButtonProps) {
  const buttonClasses = `button button-${intent.split('/')[0]} ${
    intent.split('/')[1] ? `button-${intent.split('/')[1]}` : ''
  } ${fullWidth ? 'button-fullWidth' : ''}`;

  if(href) return (
    <a
      tabIndex={0}
      role="button"
      aria-label={label}
      className={buttonClasses + ' hover clean-button'}
      href={href}
      target={'_blank'}
      rel={'noopener noreferrer'}
    >
      {name}
    </a>
  );
  return (
    <button
      tabIndex={0}
      role="button"
      aria-label={label}
      className={buttonClasses + ' hover'}
      onClick={onClick}
    >
      {name}
    </button>
  );
}
