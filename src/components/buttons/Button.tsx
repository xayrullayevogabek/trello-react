import React from "react";

interface ButtonProps {
  icon?: React.ReactNode;
  label?: string;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  icon,
  label,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-md hover:bg-slate-600 transition ${className}`}
    >
      {icon && icon}
      {label && <span>{label}</span>}
    </button>
  );
};

export default Button;
