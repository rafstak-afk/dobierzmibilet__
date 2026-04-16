import type { WizardState } from '@/types/wizard';
import { OptionCard } from './OptionCard';
import { StepHeader } from './StepHeader';
import { NavigationButtons } from './NavigationButtons';

interface Props {
  state: WizardState;
  onChange: (field: keyof WizardState, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step4Trasa({ state, onChange, onNext, onBack }: Props) {
  return (
    <div>
      <StepHeader
        step={4}
        total={5}
        question="Jak wygląda Twoja typowa trasa?"
        hint="Chodzi o obszar, po którym najczęściej się poruszasz"
      />
      <div className="grid grid-cols-1 gap-3">
        <OptionCard
          icon="🏙️"
          title="W obrębie jednego miasta"
          description="Poruszam się głównie w obrębie jednego miasta, np. w Katowicach, Gliwicach lub Sosnowcu"
          selected={state.trasa === 'jedno_miasto'}
          onClick={() => onChange('trasa', 'jedno_miasto')}
        />
        <OptionCard
          icon="🔀"
          title="Między sąsiednimi miastami"
          description="Regularnie podróżuję między kilkoma sąsiednimi miastami GZM"
          selected={state.trasa === 'sasiednie_miasta'}
          onClick={() => onChange('trasa', 'sasiednie_miasta')}
        />
        <OptionCard
          icon="🗺️"
          title="Po całej metropolii"
          description="Moje przejazdy obejmują cały obszar GZM — wiele różnych miast"
          selected={state.trasa === 'cale_gzm'}
          onClick={() => onChange('trasa', 'cale_gzm')}
        />
      </div>
      <NavigationButtons onBack={onBack} onNext={onNext} nextDisabled={!state.trasa} />
    </div>
  );
}
