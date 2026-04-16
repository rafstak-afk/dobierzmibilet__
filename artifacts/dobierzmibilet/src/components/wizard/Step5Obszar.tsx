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

export function Step5Obszar({ state, onChange, onNext, onBack }: Props) {
  return (
    <div>
      <StepHeader
        step={5}
        total={5}
        question="W jakim obszarze najczęściej podróżujesz?"
        hint="Wybierz strefę biletową, która najlepiej odpowiada Twoim potrzebom"
      />
      <div className="grid grid-cols-1 gap-3">
        <OptionCard
          icon="🏛️"
          title="Katowice i okolice"
          description="Centrum metropolii — Katowice, Chorzów, Siemianowice Śląskie, Mysłowice i okolice"
          selected={state.obszar === 'katowice'}
          onClick={() => onChange('obszar', 'katowice')}
        />
        <OptionCard
          icon="📐"
          title="Trójkąt (centrum GZM)"
          description="Gliwice – Bytom – Sosnowiec i obszar między nimi, obejmujący główne miasta"
          selected={state.obszar === 'trojkat'}
          onClick={() => onChange('obszar', 'trojkat')}
        />
        <OptionCard
          icon="🌐"
          title="Cały obszar GZM"
          description="Cała Górnośląsko-Zagłębiowska Metropolia — wszystkie 41 gmin"
          selected={state.obszar === 'cale_gzm'}
          onClick={() => onChange('obszar', 'cale_gzm')}
        />
      </div>
      <NavigationButtons onBack={onBack} onNext={onNext} nextDisabled={!state.obszar} isLast />
    </div>
  );
}
