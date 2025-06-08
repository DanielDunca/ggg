import React from 'react';

interface Props {
  query: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ query, onChange }: Props) {
  return (
    <div className="absolute left-4 top-4 z-10">
      <input
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search..."
        className="rounded border px-2 py-1 text-sm"
      />
    </div>
  );
}
