# QuickNotes

NextGen Web Frontends - Solo Assignment 2

QuickNotes ist eine kleine Vue-Anwendung zum Erstellen, Löschen und Durchsuchen von Notizen. Notizen können einen Titel, einen Textinhalt und beliebig viele Tags enthalten und werden im `localStorage` gespeichert.

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
`App.vue` verbindet die einzelnen Komponenten miteinander, während die eigentliche Notiz-Logik in `useNotes.js` liegt. 
Die Speicherung im `localStorage` ist zusätzlich in `useLocalStorage.js` gekapselt, damit Komponenten keine Persistenz-Logik enthalten.

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

- **Composition / Slots:** `BaseCard.vue` stellt einen benannten header-Slot und einen Default-Slot bereit. NoteCard.vue verwendet diese Slots zur Darstellung einer Notiz.
- **Composables:** `useNotes.js` enthält die Notiz-Logik für Hinzufügen, Löschen und Filtern. 
  `useLocalStorage.js` übernimmt das Laden und Speichern der Notizen.
- **Props / State / Events:** `NoteForm.vue` und `NoteCard.vue` kommunizieren über Events mit `App.vue`. `SearchBar.vue` wird über `v-model` mit dem Such-State in `App.vue` verbunden.

## Reflexion

1. **Warum darf `NoteCard` die Notiz-Prop nicht selbst verändern, und wie löst ihr das stattdessen?**
   - Props werden von der Parent-Komponente an eine Child-Komponente übergeben und sollen dort nicht direkt verändert werden. `NoteCard` ist nur für die Darstellung einer einzelnen Note verantwortlich.
   - Wenn eine Note gelöscht werden soll, verändert `NoteCard` die Notiz deshalb nicht selbst. Stattdessen wird die ID der Notiz über ein delete-Event nach oben gesendet: `@click="emit('delete', note.id)"`
   - `App.vue` empfängt dieses Event und ruft `deleteNote()` aus `useNotes.js` auf, was dann erst wirklich dafür sorgt, dass die Note gelöscht wird.
   
2. **Was passiert, wenn zwei Komponenten dasselbe `useNotes()` aufrufen — teilen sie sich die Notizen oder nicht? Begründe kurz**
   - In meiner aktuellen Implementierung teilen zwei getrennte Aufrufe von `useNotes()` nicht denselben `ref` -> Bei jedem Aufruf von `useNotes()` wird nochmal `const notes = useLocalStorage('quicknotes', [])` ausgeführt. Dadurch entsteht jeweils ein eigener reaktiver State.
   - Beide Instanzen verwenden zwar denselben localStorage-Key "quicknotes", aber eine Änderung an einem `ref` aktualisiert den anderen `ref` nicht automatisch.
   - In meiner App wird `useNotes()` also nur einmal in `App.vue` aufgerufen. Die Daten und Funktionen werden anschließend über Props und Events mit den Components verbunden.
   
3. **Wozu dient das `Note`-Interface, wenn der Code auch ohne liefe?**
   - Das `Note`-Interface beschreibt die erwartete Struktur einer Notiz.
   - Zur Laufzeit könnte JavaScript auch ohne dieses Interface funktionieren. TypeScript kann damit aber bereits während der Entwicklung prüfen, ob eine Note die richtigen Eigenschaften und Datentypen hat.
   - Das Interface verbessert also die Verständlichkeit und hilft, Fehler beim Datenfluss zwischen den einzelnen Components früh zu erkennen.