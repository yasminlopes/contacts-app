interface Props {
  selected: string;
  onSelect: (letter: string) => void;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function AlphaFilter({ selected, onSelect }: Props) {
  return (
    <div className="flex flex-col items-center px-2 py-4 rounded-xl bg-primary/10 text-xs gap-1">
      {ALPHABET.map((letter) => (
        <button
          key={letter}
          onClick={() => onSelect(letter)}
          className={`w-6 h-6 rounded-full flex items-center justify-center transition-all font-semibold ${
            selected === letter
              ? 'bg-primary text-white scale-105'
              : 'hover:bg-primary hover:text-white text-primary hover:w-12 hover:h-12 hover:scale-105'
          }`}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}
