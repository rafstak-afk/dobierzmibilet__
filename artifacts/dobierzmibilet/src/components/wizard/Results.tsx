import type { WizardState, TicketRecommendation } from '@/types/wizard';
import { getRecommendations } from '@/lib/ticketRecommendation';

interface Props {
  state: WizardState;
  onReset: () => void;
}

function formatPrice(n: number) {
  return n.toFixed(2).replace('.', ',') + ' zł';
}

function TicketCard({ ticket, isUlgowy, isPrimary }: { ticket: TicketRecommendation; isUlgowy: boolean; isPrimary: boolean }) {
  const price = isUlgowy ? ticket.priceUlgowy : ticket.priceNormal;
  return (
    <div className={`rounded-xl border-2 p-5 ${isPrimary ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}>
      {isPrimary && (
        <div className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full mb-3">
          <span>⭐</span> Najlepsza opcja dla Ciebie
        </div>
      )}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-base">{ticket.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{ticket.description}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 rounded-full px-2.5 py-1">
              🕐 Ważność: {ticket.validity}
            </span>
            <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 rounded-full px-2.5 py-1">
              🗺️ {ticket.coverageArea}
            </span>
            {ticket.includesRail && (
              <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 rounded-full px-2.5 py-1">
                🚆 Obejmuje kolej
              </span>
            )}
          </div>
          {ticket.reasons.length > 0 && (
            <ul className="mt-3 space-y-1">
              {ticket.reasons.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-green-500 flex-shrink-0 mt-0.5">✓</span>
                  {r}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="text-right flex-shrink-0">
          <div className={`text-2xl font-bold ${isPrimary ? 'text-blue-700' : 'text-gray-800'}`}>
            {formatPrice(price)}
          </div>
          {isUlgowy && (
            <div className="text-xs text-gray-400 mt-0.5 line-through">{formatPrice(ticket.priceNormal)}</div>
          )}
          <div className="text-xs text-gray-400 mt-0.5">cena biletu</div>
        </div>
      </div>
    </div>
  );
}

export function Results({ state, onReset }: Props) {
  const recommendations = getRecommendations(state);
  const isUlgowy = state.ulga === 'ulgowy';
  const isFreeEligible = state.ulga === 'check';

  if (isFreeEligible) {
    return (
      <div>
        <div className="text-center py-6">
          <div className="text-4xl mb-3">🎫</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Sprawdź swoje uprawnienia</h2>
          <p className="text-gray-600 text-sm max-w-md mx-auto">
            Możliwe, że przysługuje Ci bezpłatny przejazd lub ulga specjalna. Przejdź na stronę ZTM GZM, aby sprawdzić pełną listę uprawnień.
          </p>
        </div>
        <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-5 mb-4">
          <h3 className="font-bold text-amber-900 mb-3">Kto może jeździć bezpłatnie?</h3>
          <ul className="space-y-2 text-sm text-amber-800">
            {[
              'Dzieci do ukończenia 4. roku życia',
              'Emeryci i renciści powyżej 70. roku życia',
              'Osoby z orzeczeniem o znacznym stopniu niepełnosprawności',
              'Weterani i weterani poszkodowani',
              'Honorowi dawcy krwi (po spełnieniu określonych warunków)',
              'Posłowie, senatorowie i radni w określonych przypadkach',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-amber-600 flex-shrink-0">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <a
          href="https://ztm.gzm.pl/bilety/uprawnienia-do-ulgowych-przejazdow"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors mb-3"
        >
          Sprawdź pełną listę uprawnień na ZTM GZM →
        </a>
        <button
          onClick={onReset}
          className="block w-full text-center text-gray-600 text-sm py-2 hover:text-gray-800 transition-colors"
        >
          ← Zacznij od nowa
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5">
        <div className="text-xs font-bold tracking-widest text-green-600 uppercase mb-1">GOTOWE!</div>
        <h2 className="text-lg font-bold text-gray-900">Twoje rekomendowane bilety</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Na podstawie Twoich odpowiedzi dobraliśmy najlepsze opcje biletowe GZM
        </p>
      </div>
      <div className="space-y-4">
        {recommendations.map((ticket, i) => (
          <TicketCard
            key={ticket.name}
            ticket={ticket}
            isUlgowy={isUlgowy}
            isPrimary={i === 0}
          />
        ))}
      </div>
      <div className="mt-5 p-4 rounded-xl bg-gray-50 border border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Ceny są orientacyjne i mogą się różnić. Sprawdź aktualne ceny i kup bilet na{' '}
          <a
            href="https://ztm.gzm.pl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-medium"
          >
            ztm.gzm.pl
          </a>{' '}
          lub w aplikacji{' '}
          <a
            href="https://jakdojade.pl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-medium"
          >
            jakdojade
          </a>
        </p>
      </div>
      <button
        onClick={onReset}
        className="block w-full text-center text-gray-500 text-sm mt-4 py-2 hover:text-gray-700 transition-colors"
      >
        ← Zacznij od nowa
      </button>
    </div>
  );
}
