import { cn } from '@/lib/utils';

interface NavigationButtonsProps {
  onBack?: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
  isLast?: boolean;
}

export function NavigationButtons({ onBack, onNext, nextDisabled, isLast }: NavigationButtonsProps) {
  return (
    <div className={cn('flex gap-3 mt-6', onBack ? 'justify-between' : 'justify-end')}>
      {onBack && (
        <button
          onClick={onBack}
          className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          ← Wróć
        </button>
      )}
      <button
        onClick={onNext}
        disabled={nextDisabled}
        className={cn(
          'px-5 py-2.5 text-sm font-semibold rounded-lg transition-all',
          nextDisabled
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
          isLast && !nextDisabled && 'bg-green-600 hover:bg-green-700 active:bg-green-800',
        )}
      >
        {isLast ? 'Zobacz rekomendacje →' : 'Dalej →'}
      </button>
    </div>
  );
}
