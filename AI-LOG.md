### AI-Log

- Prompt: `useNotes.js` anhand des Assignments vervollständigen und erklären
  Übernommen: `addNote`, `deleteNote` und `computed` Live-Filter
  Geändert/verstanden: Notizlogik liegt im Composable; localStorage bleibt getrennt in `useLocalStorage`

- Prompt: `NoteForm.vue`, `NoteCard.vue` und `App.vue` Grundgerüst erstellen
  Übernommen: Props/Events zwischen den Komponenten, v-model für die Suche
  Geändert/verstanden: `NoteForm` nimmt neue Note auf und meldet diese per `emit`, `NoteCard` emittiert nur die ID zum Löschen, `App.vue` verbindet die Komponenten mit `useNotes`

- Prompt: TypeScript Import Error in `App.vue` beheben und Note-Interface sinnvoller einsetzen
  Übernommen: `note.ts` nur in `NoteForm` und `NoteCard` verwenden, `App.vue` bleibt JavaScript
  Geändert/verstanden: `App.vue` braucht das Note-Interface nicht -> TypeScript wird dort eingesetzt, wo Props und Events typisiert werden

- Prompt: Projektstruktur und Erfüllung der Assignment-Anforderungen überprüfen und erklären
  Übernommen: Struktur-Skizze für README
  Geändert/verstanden: App verbindet nur die einzelnen Teile; `NoteForm` und `NoteCard` kommunizieren per Events, während Notizlogik und Persistenz ausschließlich in den Composables liegen