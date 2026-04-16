interface StepHeaderProps {
  step: number;
  total: number;
  question: string;
  hint?: string;
}

export function StepHeader({ step, total, question, hint }: StepHeaderProps) {
  return (
    <div className="mb-5">
      <div className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-1">
        KROK {step} Z {total}
      </div>
      <h2 className="text-lg font-bold text-gray-900">{question}</h2>
      {hint && <p className="text-sm text-gray-500 mt-0.5">{hint}</p>}
    </div>
  );
}
