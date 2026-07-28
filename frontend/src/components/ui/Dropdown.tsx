import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

export const Dropdown: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen, triggerRef }}>
      <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

export const DropdownTrigger: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const context = useContext(DropdownContext);
  if (!context) throw new Error('DropdownTrigger must be used inside a Dropdown');

  const { isOpen, setIsOpen, triggerRef } = context;

  return (
    <div
      ref={triggerRef}
      onClick={() => setIsOpen(!isOpen)}
      className="cursor-pointer inline-flex items-center"
    >
      {children}
    </div>
  );
};

export const DropdownMenu: React.FC<{
  children: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
}> = ({ children, align = 'right', className = '' }) => {
  const context = useContext(DropdownContext);
  if (!context) throw new Error('DropdownMenu must be used inside a Dropdown');

  const { isOpen } = context;

  if (!isOpen) return null;

  const alignClasses = align === 'right' ? 'right-0' : 'left-0';

  return (
    <div
      className={`absolute ${alignClasses} mt-2 w-56 rounded-2xl shadow-xl bg-white border border-slate-200 focus:outline-none z-50 py-1 ${className}`}
    >
      {children}
    </div>
  );
};

export const DropdownItem: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}> = ({ children, onClick, className = '' }) => {
  const context = useContext(DropdownContext);
  if (!context) throw new Error('DropdownItem must be used inside a Dropdown');

  const { setIsOpen } = context;

  const handleClick = () => {
    if (onClick) onClick();
    setIsOpen(false);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center transition-colors cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};
