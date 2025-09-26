interface StatsCardProps {
  title: string;
  value: number;
  change: string;
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'yellow';
}

export default function StatsCard({ title, value, change, icon, color }: StatsCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-green-50 text-green-700', 
    purple: 'bg-purple-50 text-purple-700',
    yellow: 'bg-yellow-50 text-yellow-700'
  }

  return (
    <div className="dashboard-card">
      <div className="flex items-center">
        <div className={`flex-shrink-0 p-3 rounded-md ${colorClasses[color]}`}>
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd>
              <div className="text-2xl font-bold text-gray-900">{value}</div>
            </dd>
          </dl>
        </div>
      </div>
      <div className="mt-4">
        <div className="text-sm text-gray-600">{change}</div>
      </div>
    </div>
  )
}