import { useState } from 'react';
import type { WizardState } from '@/types/wizard';
import { Step1Ulga } from '@/components/wizard/Step1Ulga';
import { Step2Czestotliwosc } from '@/components/wizard/Step2Czestotliwosc';
import { Step3Kolej } from '@/components/wizard/Step3Kolej';
import { Step4Trasa } from '@/components/wizard/Step4Trasa';
import { Step5Obszar } from '@/components/wizard/Step5Obszar';
import { Results } from '@/components/wizard/Results';
import { cn } from '@/lib/utils';

const STEPS = [
  { id: 'ulga', label: 'Ulga' },
  { id: 'czestotliwosc', label: 'Częstotliwość' },
  { id: 'kolej', label: 'Kolej' },
  { id: 'trasa', label: 'Trasa' },
  { id: 'obszar', label: 'Obszar' },
];

const INITIAL_STATE: WizardState = {
  ulga: null,
  czestotliwosc: null,
  kolej: null,
  trasa: null,
  obszar: null,
};

export function WizardPage() {
  const [step, setStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [state, setState] = useState<WizardState>(INITIAL_STATE);

  function handleChange(field: keyof WizardState, value: string) {
    setState(prev => ({ ...prev, [field as string]: value }));
  }

  function handleNext() {
    if (step < STEPS.length - 1) {
      setStep(s => s + 1);
    } else {
      setShowResults(true);
    }
  }

  function handleBack() {
    if (step > 0) setStep(s => s - 1);
  }

  function handleReset() {
    setState(INITIAL_STATE);
    setStep(0);
    setShowResults(false);
  }

  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      <div className="bg-[#1a1f36] text-white text-xs px-4 py-2.5 text-center">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
          Baza 7052 przystanków GZM gotowa ✓
        </span>
      </div>

      <div className="flex flex-col items-center pt-10 pb-16 px-4">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-[#1a1f36] flex items-center justify-center mb-4 shadow-lg">
            <span className="text-3xl">🚌</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 text-center">Dobierz mi bilet</h1>
          <p className="text-gray-500 text-sm text-center mt-1 max-w-xs">
            Odpowiedz na kilka pytań —<br />
            dobierzemy bilet idealnie dopasowany do Ciebie.
          </p>
        </div>

        <div className="w-full max-w-xl">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {!showResults && (
              <div className="border-b border-gray-100">
                <div className="flex">
                  {STEPS.map((s, i) => (
                    <div
                      key={s.id}
                      className={cn(
                        'flex-1 py-3 text-center text-xs font-medium transition-colors',
                        i === step
                          ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                          : i < step
                            ? 'text-green-600'
                            : 'text-gray-400',
                      )}
                    >
                      {i < step ? '✓ ' : ''}{s.label}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!showResults && (
              <div className="flex justify-center pt-4 pb-1">
                <a
                  href="https://ztm.gzm.pl/bilety"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-gray-700 border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
                >
                  <span>📊</span> Porównaj wszystkie bilety GZM
                </a>
              </div>
            )}

            <div className="p-6">
              {!showResults && step === 0 && (
                <Step1Ulga state={state} onChange={handleChange} onNext={handleNext} />
              )}
              {!showResults && step === 1 && (
                <Step2Czestotliwosc state={state} onChange={handleChange} onNext={handleNext} onBack={handleBack} />
              )}
              {!showResults && step === 2 && (
                <Step3Kolej state={state} onChange={handleChange} onNext={handleNext} onBack={handleBack} />
              )}
              {!showResults && step === 3 && (
                <Step4Trasa state={state} onChange={handleChange} onNext={handleNext} onBack={handleBack} />
              )}
              {!showResults && step === 4 && (
                <Step5Obszar state={state} onChange={handleChange} onNext={handleNext} onBack={handleBack} />
              )}
              {showResults && (
                <Results state={state} onReset={handleReset} />
              )}
            </div>
          </div>

          <p className="text-xs text-gray-400 text-center mt-4">
            Narzędzie nieoficjalne. Dane i ceny mogą być nieaktualne — zawsze sprawdź na{' '}
            <a href="https://ztm.gzm.pl" target="_blank" rel="noopener noreferrer" className="underline">ztm.gzm.pl</a>
          </p>
        </div>
      </div>
    </div>
  );
}
