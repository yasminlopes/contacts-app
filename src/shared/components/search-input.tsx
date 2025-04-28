import { Search } from 'lucide-react';

export function SearchInput({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-3 text-gray-400" size={16} />
      <input
        type="text"
        placeholder="Pesquisar..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input input-bordered pl-10 w-full"
      />
    </div>
  );
}
