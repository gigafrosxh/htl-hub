export interface NavigationItem {
  label: string;
  path: string;
  shortLabel: string;
}

export interface NavigationGroup {
  label: string;
  items: NavigationItem[];
}

export const navigationGroups: NavigationGroup[] = [
  {
    label: 'Übersicht',
    items: [{ label: 'Dashboard', path: '/dashboard', shortLabel: 'DB' }],
  },
  {
    label: 'Organisation',
    items: [
      { label: 'Stundenplan', path: '/timetable', shortLabel: 'SP' },
      { label: 'Aufgaben', path: '/tasks', shortLabel: 'AU' },
      { label: 'Prüfungen', path: '/exams', shortLabel: 'PR' },
      { label: 'Kalender', path: '/calendar', shortLabel: 'KA' },
      { label: 'Anwesenheit', path: '/attendance', shortLabel: 'AN' },
    ],
  },
  {
    label: 'Navigation',
    items: [{ label: 'Wayfinder', path: '/wayfinder', shortLabel: 'WF' }],
  },
  {
    label: 'Lernen',
    items: [
      { label: 'Notizen', path: '/notes', shortLabel: 'NO' },
      { label: 'Karteikarten', path: '/flashcards', shortLabel: 'KK' },
      { label: 'Noten', path: '/grades', shortLabel: 'NT' },
      { label: 'Pomodoro', path: '/pomodoro', shortLabel: 'PO' },
    ],
  },
  {
    label: 'HTL-Tools',
    items: [
      { label: 'Rechner', path: '/calculators', shortLabel: 'RE' },
      { label: 'Netzwerk-Tools', path: '/network-tools', shortLabel: 'NW' },
      { label: 'Developer-Tools', path: '/developer-tools', shortLabel: 'DV' },
    ],
  },
  {
    label: 'Projekte',
    items: [
      { label: 'Projektverwaltung', path: '/projects', shortLabel: 'PJ' },
      { label: 'Code-Snippets', path: '/snippets', shortLabel: 'CS' },
      { label: 'Dateien', path: '/files', shortLabel: 'DA' },
      { label: 'Link Manager', path: '/links', shortLabel: 'LI' },
    ],
  },
  {
    label: 'Konto',
    items: [
      { label: 'Benutzer', path: '/users', shortLabel: 'BE' },
      { label: 'Einstellungen', path: '/settings', shortLabel: 'ES' },
    ],
  },
];
