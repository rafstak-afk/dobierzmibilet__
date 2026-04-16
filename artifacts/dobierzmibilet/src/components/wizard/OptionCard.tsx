import { cn } from '@/lib/utils';

interface OptionCardProps {
  icon: string;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  highlighted?: boolean;
  fullWidth?: boolean;
}

export function OptionCard({ icon, title, description, selected, onClick, highlighted, fullWidth }: OptionCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left rounded-xl border-2 p-4 transition-all duration-150 cursor-pointer',
        fullWidth && 'col-span-2',
        selected
          ? 'border-blue-500 bg-blue-50'
          : highlighted
            ? 'border-amber-300 bg-amber-50 hover:border-amber-400'
            : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50',
      )}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl leading-none mt-0.5">{icon}</span>
        <div>
          <div className={cn('font-semibold text-sm', highlighted && !selected ? 'text-amber-800' : 'text-gray-900', selected && 'text-blue-700')}>
            {title}
          </div>
          <div className={cn('text-xs mt-0.5 leading-relaxed', highlighted && !selected ? 'text-amber-700' : 'text-gray-500', selected && 'text-blue-600')}>
            {description}
          </div>
        </div>
        {selected && (
          <div className="ml-auto flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
    </button>
  );
}
