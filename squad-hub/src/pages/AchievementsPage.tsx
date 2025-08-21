export default function AchievementsPage() {
  const achievements = [
    { id: '1', name: 'Aarav Singh', title: 'Won Kalvium Hackathon 2025', type: 'Hackathon' },
    { id: '2', name: 'Isha Rao', title: 'Dojo Black Belt', type: 'Dojo' },
    { id: '3', name: 'Rohan Patel', title: 'Summer Internship @ Acme', type: 'Internship' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="page-title">Achievements</h2>
        <p className="muted">Celebrate recent wins from the squads.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {achievements.map((a) => (
          <div key={a.id} className="rounded-lg border p-4">
            <div className="text-sm text-slate-500">{a.type}</div>
            <div className="mt-1 font-semibold text-slate-900">{a.title}</div>
            <div className="text-sm text-slate-600">by {a.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

