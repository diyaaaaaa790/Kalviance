export default function AnnouncementsPage() {
  const announcements = [
    {
      id: '1',
      title: 'Welcome to Squad Hub',
      body: 'Your central hub for updates, achievements, and shared notes.',
      date: '2025-08-20',
    },
    {
      id: '2',
      title: 'Dojo Belt Review',
      body: 'Submit your progress for the upcoming dojo belt assessments by Friday.',
      date: '2025-08-22',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="page-title">Announcements</h2>
        <p className="muted">Important updates for Squads 69 & 70.</p>
      </div>
      <ul className="space-y-3">
        {announcements.map((a) => (
          <li key={a.id} className="rounded-lg border p-4 hover:bg-slate-50">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-medium text-slate-900">{a.title}</div>
                <p className="text-sm text-slate-700 mt-1">{a.body}</p>
              </div>
              <div className="text-xs text-slate-500">{new Date(a.date).toLocaleDateString()}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

