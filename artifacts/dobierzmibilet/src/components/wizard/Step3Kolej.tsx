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

export function Step3Kolej({ state, onChange, onNext, onBack }: Props) {
  return (
    <div>
      <StepHeader
        step={3}
        total={5}
        question="Czy korzystasz z pociągów regionalnych?"
        hint="Kolej regionalna to np. linia S1, S2, S3 i inne linie KZK/ŚKM objęte biletem ZTM"
      />
      <div className="grid grid-cols-1 gap-3">
        <OptionCard
          icon="🚆"
          title="Tak, regularnie"
          description="Codziennie lub kilka razy w tygodniu podróżuję pociągiem"
          selected={state.kolej === 'tak_regularnie'}
          onClick={() => onChange('kolej', 'tak_regularnie')}
        />
        <OptionCard
          icon="🚉"
          title="Tak, ale rzadko"
          description="Okazjonalnie korzystam z kolei — kilka razy w miesiącu lub rzadziej"
          selected={state.kolej === 'tak_rzadko'}
          onClick={() => onChange('kolej', 'tak_rzadko')}
        />
        <OptionCard
          icon="🚌"
          title="Nie korzystam z kolei"
          description="Podróżuję tylko autobusami i/lub tramwajami"
          selected={state.kolej === 'nie'}
          onClick={() => onChange('kolej', 'nie')}
        />
      </div>
      <NavigationButtons onBack={onBack} onNext={onNext} nextDisabled={!state.kolej} />
    </div>
  );
}
