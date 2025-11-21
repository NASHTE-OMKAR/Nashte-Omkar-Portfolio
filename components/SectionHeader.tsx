import React from 'react';

interface SectionHeaderProps {
  number: string;
  title: string;
  color?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ number, title, color = 'bg-black' }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-12 border-b-4 border-black pb-4">
      <span className={`font-mono text-white px-3 py-1 text-xl font-bold border-2 border-black shadow-neo-sm ${color}`}>
        {number}
      </span>
      <h2 className="text-4xl md:text-6xl font-sans font-black uppercase tracking-tighter">
        {title}
      </h2>
    </div>
  );
};