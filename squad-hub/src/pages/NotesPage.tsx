import { useState } from 'react'

type Note = {
  id: string
  title: string
  subject: string
  url: string
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', title: 'DSA Cheat Sheet', subject: 'DSA', url: '#' },
    { id: '2', title: 'React Revision', subject: 'Frontend', url: '#' },
  ])

  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [url, setUrl] = useState('')

  const onAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !subject || !url) return
    setNotes((prev) => [{ id: crypto.randomUUID(), title, subject, url }, ...prev])
    setTitle('')
    setSubject('')
    setUrl('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="page-title">Shared Notes</h2>
        <p className="muted">Upload links to notes, cheat sheets, and guides.</p>
      </div>

      <form onSubmit={onAdd} className="grid grid-cols-1 gap-3 rounded-lg border p-4 sm:grid-cols-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Public URL"
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
        />
        <button
          type="submit"
          className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-700"
        >
          Add
        </button>
      </form>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {notes.map((n) => (
          <a key={n.id} href={n.url} target="_blank" className="rounded-lg border p-4 hover:bg-slate-50">
            <div className="text-xs text-slate-500">{n.subject}</div>
            <div className="font-medium text-slate-900">{n.title}</div>
            <div className="text-xs text-slate-500">{n.url}</div>
          </a>
        ))}
      </div>
    </div>
  )
}

