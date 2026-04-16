import type { WizardState, TicketRecommendation } from '../types/wizard';

export function getRecommendations(state: WizardState): TicketRecommendation[] {
  const withRail = state.kolej === 'tak_regularnie';
  const occasionalRail = state.kolej === 'tak_rzadko';
  const isUlgowy = state.ulga === 'ulgowy';

  const tickets: TicketRecommendation[] = [
    {
      name: 'Bilet jednorazowy 90-minutowy',
      description: 'Bilet na przejazd w ciągu 90 minut, ważny na autobusy i tramwaje ZTM',
      priceNormal: 4.20,
      priceUlgowy: 2.10,
      validity: '90 minut',
      includesRail: false,
      coverageArea: 'Cała sieć ZTM GZM',
      recommended: false,
      reasons: [],
    },
    {
      name: 'Bilet jednorazowy 90-minutowy z koleją',
      description: 'Bilet na przejazd w ciągu 90 minut, ważny na autobusy, tramwaje i pociągi',
      priceNormal: 8.00,
      priceUlgowy: 4.00,
      validity: '90 minut',
      includesRail: true,
      coverageArea: 'Cała sieć ZTM GZM + kolej',
      recommended: false,
      reasons: [],
    },
    {
      name: 'Bilet dobowy (24h)',
      description: 'Nielimitowane przejazdy przez 24 godziny od pierwszego skasowania',
      priceNormal: 16.00,
      priceUlgowy: 8.00,
      validity: '24 godziny',
      includesRail: false,
      coverageArea: 'Cała sieć ZTM GZM',
      recommended: false,
      reasons: [],
    },
    {
      name: 'Bilet dobowy z koleją (24h)',
      description: 'Nielimitowane przejazdy przez 24 godziny na wszystkich środkach transportu',
      priceNormal: 24.00,
      priceUlgowy: 12.00,
      validity: '24 godziny',
      includesRail: true,
      coverageArea: 'Cała sieć ZTM GZM + kolej',
      recommended: false,
      reasons: [],
    },
    {
      name: 'Bilet 7-dniowy metropolitalny',
      description: 'Nielimitowane przejazdy przez 7 dni na terenie całego GZM',
      priceNormal: 47.00,
      priceUlgowy: 23.50,
      validity: '7 dni',
      includesRail: false,
      coverageArea: 'Cała metropolia GZM',
      recommended: false,
      reasons: [],
    },
    {
      name: 'Bilet 7-dniowy z koleją',
      description: 'Nielimitowane przejazdy przez 7 dni, w tym pociągi regionalne',
      priceNormal: 77.00,
      priceUlgowy: 38.50,
      validity: '7 dni',
      includesRail: true,
      coverageArea: 'Cała metropolia GZM + kolej',
      recommended: false,
      reasons: [],
    },
    {
      name: 'Bilet 30-dniowy metropolitalny',
      description: 'Miesięczny bilet na nieograniczone przejazdy w całym GZM',
      priceNormal: 130.00,
      priceUlgowy: 65.00,
      validity: '30 dni',
      includesRail: false,
      coverageArea: 'Cała metropolia GZM',
      recommended: false,
      reasons: [],
    },
    {
      name: 'Bilet 30-dniowy z koleją',
      description: 'Miesięczny bilet łączony na autobusy, tramwaje i pociągi regionalne',
      priceNormal: 215.00,
      priceUlgowy: 107.50,
      validity: '30 dni',
      includesRail: true,
      coverageArea: 'Cała metropolia GZM + kolej',
      recommended: false,
      reasons: [],
    },
    {
      name: 'Bilet 90-dniowy metropolitalny',
      description: 'Kwartalny bilet na maksymalne oszczędności przy codziennych przejazdach',
      priceNormal: 330.00,
      priceUlgowy: 165.00,
      validity: '90 dni',
      includesRail: false,
      coverageArea: 'Cała metropolia GZM',
      recommended: false,
      reasons: [],
    },
    {
      name: 'Bilet 90-dniowy z koleją',
      description: 'Kwartalny bilet łączony – najlepsza cena dla regularnych podróżnych z koleją',
      priceNormal: 540.00,
      priceUlgowy: 270.00,
      validity: '90 dni',
      includesRail: true,
      coverageArea: 'Cała metropolia GZM + kolej',
      recommended: false,
      reasons: [],
    },
  ];

  const recommended: TicketRecommendation[] = [];

  if (state.czestotliwosc === 'sporadycznie') {
    const t = withRail
      ? tickets.find(t => t.name.includes('jednorazowy') && t.includesRail)!
      : tickets.find(t => t.name.includes('jednorazowy') && !t.includesRail)!;
    t.recommended = true;
    t.reasons = [
      'Najlepsza opcja przy sporadycznych przejazdach',
      'Płacisz tylko za to, z czego korzystasz',
      withRail ? 'Obejmuje przejazdy kolejowe' : 'Ważny we wszystkich autobusach i tramwajach ZTM',
    ];
    recommended.push({ ...t });

    const t2 = tickets.find(t => t.name.includes('dobowy') && t.includesRail === withRail)!;
    t2.reasons = ['Dobra opcja jeśli planujesz kilka przejazdów jednego dnia'];
    recommended.push({ ...t2 });
  } else if (state.czestotliwosc === 'kilka_miesiac') {
    const t = withRail
      ? tickets.find(t => t.name.includes('jednorazowy') && t.includesRail)!
      : tickets.find(t => t.name.includes('jednorazowy') && !t.includesRail)!;
    t.recommended = true;
    t.reasons = [
      'Przy kilku przejazdach w miesiącu bilety jednorazowe są ekonomiczniejsze',
      'Brak abonamentu – pełna elastyczność',
    ];
    recommended.push({ ...t });

    const t2 = tickets.find(t => t.name.includes('7-dniowy') && t.includesRail === withRail)!;
    t2.reasons = ['Jeśli podróżujesz intensywnie w określonych tygodniach miesiąca'];
    recommended.push({ ...t2 });
  } else if (state.czestotliwosc === 'kilka_tydzien') {
    const t = withRail
      ? tickets.find(t => t.name.includes('30-dniowy') && t.includesRail)!
      : tickets.find(t => t.name.includes('30-dniowy') && !t.includesRail)!;
    t.recommended = true;
    t.reasons = [
      'Przy kilku przejazdach tygodniowo bilet miesięczny szybko się zwraca',
      isUlgowy ? `Tylko ${t.priceUlgowy} zł/miesiąc` : `${t.priceNormal} zł/miesiąc`,
      withRail ? 'Obejmuje przejazdy koleją' : 'Bez limitu przejazdów w całym GZM',
    ];
    recommended.push({ ...t });

    if (occasionalRail) {
      const t2 = tickets.find(t => t.name.includes('30-dniowy') && !t.includesRail)!;
      t2.reasons = ['Tańsza opcja jeśli kolej używasz tylko okazjonalnie', 'Dopłać jednorazowo za przejazd koleją gdy potrzebujesz'];
      recommended.push({ ...t2 });
    } else {
      const t2 = tickets.find(t => t.name.includes('7-dniowy') && t.includesRail === withRail)!;
      t2.reasons = ['Elastyczna opcja – kup tylko na tygodnie w których podróżujesz'];
      recommended.push({ ...t2 });
    }
  } else if (state.czestotliwosc === 'codziennie') {
    const t90 = withRail
      ? tickets.find(t => t.name.includes('90-dniowy') && t.includesRail)!
      : tickets.find(t => t.name.includes('90-dniowy') && !t.includesRail)!;
    t90.recommended = true;
    t90.reasons = [
      'Najlepsza opcja przy codziennych dojazdach – najtaniej za dzień przejazdu',
      isUlgowy ? `Tylko ${((t90.priceUlgowy / 90)).toFixed(2)} zł/dzień` : `${((t90.priceNormal / 90)).toFixed(2)} zł/dzień`,
      withRail ? 'Obejmuje kolej regionalną' : 'Bez limitu przejazdów w całej metropolii',
    ];
    recommended.push({ ...t90 });

    const t30 = withRail
      ? tickets.find(t => t.name.includes('30-dniowy') && t.includesRail)!
      : tickets.find(t => t.name.includes('30-dniowy') && !t.includesRail)!;
    t30.reasons = [
      'Dobra alternatywa jeśli wolisz płacić co miesiąc',
      'Większa elastyczność niż bilet kwartalny',
    ];
    recommended.push({ ...t30 });
  }

  return recommended;
}
