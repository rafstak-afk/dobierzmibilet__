import type { WizardState, UlgaChoice } from '@/types/wizard';
import { OptionCard } from './OptionCard';
import { StepHeader } from './StepHeader';
import { NavigationButtons } from './NavigationButtons';

interface Props {
  state: WizardState;
  onChange: (field: keyof WizardState, value: string) => void;
  onNext: () => void;
}

export function Step1Ulga({ state, onChange, onNext }: Props) {
  return (
    <div>
      <StepHeader
        step={1}
        total={5}
        question="Z jakiego biletu korzystasz?"
        hint="Wpływa na ceny wszystkich biletów"
      />
      <div className="grid grid-cols-2 gap-3">
        <OptionCard
          icon="🧑"
          title="Bilet normalny"
          description="Pełna cena — brak uprawnień do ulgi"
          selected={state.ulga === 'normalny'}
          onClick={() => onChange('ulga', 'normalny')}
        />
        <OptionCard
          icon="🎓"
          title="Bilet ulgowy"
          description="Uczniowie, studenci, emeryci 60+, renciści i inni uprawnieni"
          selected={state.ulga === 'ulgowy'}
          onClick={() => onChange('ulga', 'ulgowy')}
        />
        <OptionCard
          icon="🎫"
          title="Sprawdź czy przysługuje Ci ulga lub bezpłatny przejazd"
          description="Dzieci, emeryci 70+, osoby z niepełnosprawnością i inni uprawnieni"
          selected={state.ulga === 'check'}
          onClick={() => onChange('ulga', 'check')}
          highlighted
          fullWidth
        />
      </div>
      <NavigationButtons onNext={onNext} nextDisabled={!state.ulga} />
    </div>
  );
}
