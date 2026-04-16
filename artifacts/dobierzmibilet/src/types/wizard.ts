export type UlgaChoice = 'normalny' | 'ulgowy' | 'check';
export type CzestotliwoscChoice = 'codziennie' | 'kilka_tydzien' | 'kilka_miesiac' | 'sporadycznie';
export type KolejChoice = 'tak_regularnie' | 'tak_rzadko' | 'nie';
export type TrasaChoice = 'jedno_miasto' | 'sasiednie_miasta' | 'cale_gzm';
export type ObszarChoice = 'katowice' | 'trojkat' | 'cale_gzm';

export interface WizardState {
  ulga: UlgaChoice | null;
  czestotliwosc: CzestotliwoscChoice | null;
  kolej: KolejChoice | null;
  trasa: TrasaChoice | null;
  obszar: ObszarChoice | null;
}

export interface TicketRecommendation {
  name: string;
  description: string;
  priceNormal: number;
  priceUlgowy: number;
  validity: string;
  includesRail: boolean;
  coverageArea: string;
  recommended: boolean;
  reasons: string[];
}
