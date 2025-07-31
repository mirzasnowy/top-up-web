// @/components/ui/WaveDivider.tsx
import React from "react";

interface WaveDividerProps {
  className?: string;
}

const WaveDivider: React.FC<WaveDividerProps> = ({ className }) => {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" style={{ lineHeight: 0 }}>
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className={`relative block w-full h-[100px] ${className}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* This path creates a concave curve (a valley) */}
        <path d="M1440,0 L1440,100 L0,100 L0,0 C480,100 960,100 1440,0 Z"></path>
      </svg>
    </div>
  );
};

export default WaveDivider;
