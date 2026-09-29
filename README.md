# QuickNotes

NextGen Web Frontends - Solo Assignment 2

AI-use information: [AI-LOG](/AI-LOG.md)

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

## Reflexion

### Struktur

                    App.vue
                       │
        ┌──────────────┼───────────────┐
        │              │               │
    NoteForm        SearchBar       NoteCard
        │              │               │
     emit add        v-model         emit delete
        │              │               │
        └──────────────┼───────────────┘
                       │
                  useNotes.js
                       │
                useLocalStorage.js
                       │
                  localStorage

- **Composition / Slots** -> `BaseCard` & `NoteCard`
- **Composables** -> `useNotes` & `useLocalStorage`
- **Props / State / Events** -> `NoteForm`, `NoteCard`, `SearchBar`, `App.vue`

### Drei Fragen...

1. **Warum darf `NoteCard` die Notiz-Prop nicht selbst verändern, und wie löst ihr das stattdessen?**
   
2. **Was passiert, wenn zwei Komponenten dasselbe `useNotes()` aufrufen — teilen sie sich die Notizen oder nicht? Begründe kurz**
   
3. **Wozu dient das `Note`-Interface, wenn der Code auch ohne liefe?**
   