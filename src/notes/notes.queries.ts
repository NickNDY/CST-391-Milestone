export const noteQueries = {
    readNotes: `
    SELECT
      id AS noteId, title AS title, content AS content,
      creation_date AS creation_date
    FROM notedatabase.notes
    `,
    readNotesByContentSearch: `
    SELECT
      id AS noteId, title AS title, content AS content,
      creation_date AS creation_date
    FROM notedatabase.notes
    WHERE LOWER(notedatabase.notes.content) LIKE ?
    `,
    readNotesByNoteId: `
    SELECT
      id AS noteId, title AS title, content AS content,
      creation_date AS creation_date
    FROM notedatabase.notes
    WHERE notedatabase.notes.id = ?
    `,
    createNote: `
    INSERT INTO notes(title, content, creation_date) VALUES (?,?,?)
    `,
    updateNote: `
    UPDATE notedatabase.notes
    SET title = ?, content = ?
    WHERE id = ?
    `,
    deleteNote: `
    DELETE FROM notedatabase.notes
    WHERE id = ?
    `
}