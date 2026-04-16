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

export function Step2Czestotliwosc({ state, onChange, onNext, onBack }: Props) {
  return (
    <div>
      <StepHeader
        step={2}
        total={5}
        question="Jak często podróżujesz komunikacją zbiorową?"
        hint="Pomoże to dobrać najkorzystniejszy rodzaj biletu"
      />
      <div className="grid grid-cols-1 gap-3">
        <OptionCard
          icon="📅"
          title="Codziennie"
          description="Dojazdy do pracy, szkoły lub inne regularne codzienne przejazdy"
          selected={state.czestotliwosc === 'codziennie'}
          onClick={() => onChange('czestotliwosc', 'codziennie')}
        />
        <OptionCard
          icon="🗓️"
          title="Kilka razy w tygodniu"
          description="Regularne przejazdy, ale nie codziennie — 2-5 razy w tygodniu"
          selected={state.czestotliwosc === 'kilka_tydzien'}
          onClick={() => onChange('czestotliwosc', 'kilka_tydzien')}
        />
        <OptionCard
          icon="📆"
          title="Kilka razy w miesiącu"
          description="Nieregularne przejazdy — kilka razy w miesiącu"
          selected={state.czestotliwosc === 'kilka_miesiac'}
          onClick={() => onChange('czestotliwosc', 'kilka_miesiac')}
        />
        <OptionCard
          icon="🎲"
          title="Sporadycznie"
          description="Okazjonalne przejazdy — kilka razy w roku lub mniej"
          selected={state.czestotliwosc === 'sporadycznie'}
          onClick={() => onChange('czestotliwosc', 'sporadycznie')}
        />
      </div>
      <NavigationButtons onBack={onBack} onNext={onNext} nextDisabled={!state.czestotliwosc} />
    </div>
  );
}
