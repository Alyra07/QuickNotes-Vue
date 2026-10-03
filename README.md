# QuickNotes

NextGen Web Frontends - Solo Assignment 2

AI-Use Information: [AI-LOG](./AI-LOG.md)

## Setup

### Requirements
* Node.js
* npm

### Installation

Clone the repository:

```bash
git clone https://github.com/Alyra07/QuickNotes-Vue.git
```

Navigate into the project directory:

```bash
cd QuickNotes-Vue
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Struktur

Die Anwendung ist in Components, Composables und Typdefinitionen aufgeteilt.
Die eigentliche Notiz-Logik liegt in `useNotes.js`, damit sie zentral an einer Stelle verwaltet wird und nicht in mehreren Komponenten doppelt vorkommt. Die Components bleiben dadurch hauptsächlich für Darstellung und Benutzerinteraktion zuständig, während `useLocalStorage.js` separat das Speichern und Laden übernimmt.

Der Datenfluss sieht vereinfacht so aus:

                    App.vue
                       │
        ┌──────────────┼───────────────┐
        │              │               │
    NoteForm        SearchBar       NoteCard
        │              │               │
     emit add        v-model        emit delete
        │              │               │
        └──────────────┼───────────────┘
                       │
                  useNotes.js
                       │
                useLocalStorage.js
                       │
                  localStorage

Die **drei zentralen Muster** aus der Lehrveranstaltung werden folgendermaßen verwendet:

- **Composition / Slots:** `BaseCard.vue` stellt einen benannten `header`-Slot und einen Default-Slot bereit. `NoteCard.vue` verwendet diese Slots zur Darstellung einer Notiz.
- **Composables:** `useNotes.js` enthält die Notiz-Logik für Hinzufügen, Löschen und Filtern. `useLocalStorage.js` übernimmt das Laden und Speichern der Notizen.
- **Props / State / Events:** `NoteForm.vue` und `NoteCard.vue` kommunizieren über Events mit `App.vue`. `SearchBar.vue` wird über `v-model` mit dem Such-State in `App.vue` verbunden.

## Reflexion

1. **Warum darf `NoteCard` die Notiz-Prop nicht selbst verändern, und wie löst ihr das stattdessen?**
   - Props werden von der Parent-Komponente an eine Child-Komponente übergeben und sollen dort nicht direkt verändert werden. `NoteCard` ist nur für die Darstellung einer einzelnen Notiz verantwortlich.
   - Wenn eine Notiz gelöscht werden soll, verändert `NoteCard` sie deshalb nicht selbst. Stattdessen wird die ID über ein `delete`-Event nach oben gesendet: `emit('delete', note.id)`.
   - `App.vue` empfängt dieses Event und ruft `deleteNote()` aus `useNotes.js` auf. Dort wird die Notiz tatsächlich aus der Liste entfernt.

2. **Was passiert, wenn zwei Komponenten dasselbe `useNotes()` aufrufen — teilen sie sich die Notizen oder nicht? Begründe kurz.**
   - In meiner aktuellen Implementierung teilen zwei getrennte Aufrufe von `useNotes()` nicht denselben `ref`.
   - Bei jedem Aufruf von `useNotes()` wird erneut `const notes = useLocalStorage('quicknotes', [])` ausgeführt. Dadurch entsteht jeweils ein eigener reaktiver State.
   - Beide Instanzen verwenden zwar denselben `localStorage`-Key, aber eine Änderung an einem `ref` aktualisiert den anderen `ref` nicht automatisch.
   - In meiner App wird `useNotes()` deshalb nur einmal in `App.vue` aufgerufen. Die Komponenten greifen anschließend über Props und Events darauf zu.

3. **Wozu dient das `Note`-Interface, wenn der Code auch ohne liefe?**
   - Das `Note`-Interface beschreibt die erwartete Struktur einer Notiz.
   - Zur Laufzeit könnte JavaScript auch ohne dieses Interface funktionieren. TypeScript kann damit aber schon während der Entwicklung prüfen, ob eine Notiz die richtigen Eigenschaften und Datentypen hat.
   - Das Interface verbessert dadurch die Verständlichkeit und hilft, Fehler beim Datenfluss zwischen den Components früh zu erkennen.