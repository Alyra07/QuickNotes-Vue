### AI-Log

**Modell für Prompts:** ChatGPT (GPT-5.6 Sol) \
**Inline Code Suggestions:** GitHub Copilot

1. **Prompt**: `useNotes.js` anhand des Assignments vervollständigen und erklären
     - **Übernommen**: `addNote`, `deleteNote` und computed Live-Filter
     - **Geändert/Verstanden**: Notizlogik liegt im Composable, nicht in den Components; localStorage bleibt getrennt (nur in `useLocalStorage`)

2. **Prompt**: `NoteForm.vue`, `NoteCard.vue` und `App.vue` Grundgerüst erstellen
     - **Übernommen**: Props/Events zwischen den Komponenten, v-model für die Suche
     - **Geändert/Verstanden**: `NoteForm` nimmt neue Note auf und meldet diese per `emit`, `NoteCard` emittiert nur die ID zum Löschen, `App.vue` verbindet die Komponenten mit `useNotes`

3. **Prompt**: TypeScript Import Error in `App.vue` beheben
     - **Übernommen**: `note.ts` nicht importieren, `App.vue` Script-Block bleibt JavaScript
     - **Geändert/verstanden**: Ich habe vorher `note.ts` in `App.vue` importiert, aber `App.vue` braucht das Note-Interface nicht -> TypeScript verwende ich gezielt in den Components, in denen ich Props und Events typisiere (z.B. in `NoteForm` und `NoteCard`).

4. **Prompt**: Projektstruktur und Erfüllung der Assignment-Anforderungen überprüfen und erklären
     - **Übernommen**: Struktur-Skizze für `README.md`
     - **Geändert/Verstanden**: App verbindet nur die einzelnen Teile; `NoteForm` und `NoteCard` kommunizieren per Events, während Notizlogik und Persistenz ausschließlich in den Composables liegen

5. **Prompt**: CSS vereinfachen, aufräumen + Hilfe, die App allgemein optisch zu verbessern
     - **Übernommen**: einfaches Layout mit direkten Farben, Card-, Formular- und Tag-Styling
     - **Geändert/Verstanden**: Globale styles liegen in `style.css`, komponentenspezifische styles bleiben scoped in den Vue-Components