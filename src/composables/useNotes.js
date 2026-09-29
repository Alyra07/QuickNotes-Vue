import { computed } from 'vue'
import { useLocalStorage } from './useLocalStorage.js'

// Liest die Notizen aus localStorage und bietet Funktionen zum Hinzufügen, Löschen und Filtern von Notes
export function useNotes() {
  const notes = useLocalStorage('quicknotes', [])

  // Hinzufügen
  function addNote(note) {
    notes.value.push({
      ...note,
      id: Date.now()
    })
  }

  // Löschen
  function deleteNote(id) {
    notes.value = notes.value.filter(
      note => note.id !== id
    )
  }

  // Filtert Notizen basierend auf dem Suchbegriff
  function filteredNotes(term) {
    return computed(() => {
      // Suchbegriff normalisieren
      const searchTerm = term.value
        .trim()
        .toLowerCase()

      if (!searchTerm) {
        return notes.value
      }
      
      // Filtert Notizen basierend auf Titel, Inhalt & Tags
      return notes.value.filter((note) => {
        const titleMatches = note.title
          .toLowerCase()
          .includes(searchTerm)

        const contentMatches = note.content
          .toLowerCase()
          .includes(searchTerm)

        const tagMatches = note.tags.some(tag =>
          tag.toLowerCase().includes(searchTerm)
        )

        return titleMatches ||
          contentMatches ||
          tagMatches
      })
    })
  }

  return {
    notes,
    addNote,
    deleteNote,
    filteredNotes
  }
}