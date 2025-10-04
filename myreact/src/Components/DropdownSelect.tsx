import { useState, useEffect, useRef } from "react";

type DropdownItem = {
  id?: string | number;
  label?: string;
  value?: unknown;
  [key: string]: unknown;
};

interface DropdownSelectProps<T extends DropdownItem> {
  label: string;
  items: T[];
  onSelect: (item: T) => void;
}

export default function DropdownSelect<T extends DropdownItem>({
  label,
  items,
  onSelect,
}: DropdownSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <div
      className="dropdown"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <p className="dropdown-toggle">
        {label}
        <i className="fi fi-ts-angle-small-down"></i>
      </p>
      {isOpen && (
        <div className="dropdown-menu">
          {items && items.length > 0 ? (
    items.map((item, index) => (
      <p
        key={item.id ?? index}
        className="dropdown-item"
        onClick={() => {
         onSelect(item);
          setIsOpen(false);
        }}
      >
        {String(item.label || item.name || (item.value !== undefined && item.value !== null ? item.value : "Unnamed"))}
      </p>
    ))
          ):(
            <p
          
            className="dropdown-item"
            onClick={() => {
            
              setIsOpen(false);
            }}
          >
            no data
          </p>
          )}
      
        </div>
      )}
    </div>
  );
}
