import Link from 'next/link'

const quickActions = [
  {
    title: 'Add New Project',
    description: 'Create a new project entry',
    href: '/projects/new',
    icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6',
    color: 'bg-blue-50 text-blue-700 hover:bg-blue-100'
  },
  {
    title: 'Add Skill',
    description: 'Add a new skill to your profile',
    href: '/skills/new',
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
    color: 'bg-green-50 text-green-700 hover:bg-green-100'
  },
  {
    title: 'Add Work Experience',
    description: 'Add a new work experience entry',
    href: '/experience/new',
    icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    color: 'bg-purple-50 text-purple-700 hover:bg-purple-100'
  },
  {
    title: 'Add Testimonial',
    description: 'Add a new client testimonial',
    href: '/testimonials/new',
    icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    color: 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
  },
  {
    title: 'View Portfolio',
    description: 'Preview your public portfolio',
    href: '/portfolio',
    icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
    color: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
  },
  {
    title: 'Export Data',
    description: 'Export your portfolio data',
    href: '/export',
    icon: 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    color: 'bg-gray-50 text-gray-700 hover:bg-gray-100'
  }
]

export default function QuickActions() {
  return (
    <div className="dashboard-card">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {quickActions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className={`group relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-sm transition-colors hover:border-gray-400 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:shadow-md ${action.color}`}
          >
            <div className="flex-shrink-0">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">{action.title}</p>
              <p className="truncate text-sm text-gray-500">{action.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}