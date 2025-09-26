'use client'

import { useState, useEffect } from 'react'
import { getProjects, getSkills, getWorkExperience, getTestimonials } from '@/lib/cosmic'
import { Project, Skill, WorkExperience, Testimonial } from '@/types'
import { formatDate } from '@/lib/utils'

interface ActivityItem {
  id: string;
  type: 'project' | 'skill' | 'experience' | 'testimonial';
  title: string;
  description: string;
  date: string;
  icon: string;
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRecentActivity() {
      try {
        const [projects, skills, workExperience, testimonials] = await Promise.all([
          getProjects(),
          getSkills(), 
          getWorkExperience(),
          getTestimonials(),
        ])

        const allItems: ActivityItem[] = [
          ...projects.slice(0, 2).map(item => ({
            id: item.id,
            type: 'project' as const,
            title: item.metadata.name,
            description: item.metadata.description || '',
            date: item.created_at,
            icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
          })),
          ...skills.slice(0, 2).map(item => ({
            id: item.id,
            type: 'skill' as const,
            title: item.metadata.name,
            description: `${item.metadata.category?.value || 'Skill'} - ${item.metadata.proficiency?.value || 'Unknown'} level`,
            date: item.created_at,
            icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
          })),
          ...workExperience.slice(0, 2).map(item => ({
            id: item.id,
            type: 'experience' as const,
            title: item.metadata.job_title,
            description: `${item.metadata.company} - ${item.metadata.current_position ? 'Current' : 'Past'} position`,
            date: item.created_at,
            icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
          })),
          ...testimonials.slice(0, 2).map(item => ({
            id: item.id,
            type: 'testimonial' as const,
            title: `${item.metadata.name} testimonial`,
            description: `${item.metadata.position || 'Client'} at ${item.metadata.company || 'Company'}`,
            date: item.created_at,
            icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
          }))
        ]

        // Sort by date (newest first) and take first 6
        const sortedActivities = allItems
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 6)

        setActivities(sortedActivities)
      } catch (error) {
        console.error('Error fetching recent activity:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecentActivity()
  }, [])

  if (loading) {
    return (
      <div className="dashboard-card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse flex space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const typeColors = {
    project: 'bg-blue-100 text-blue-600',
    skill: 'bg-green-100 text-green-600',
    experience: 'bg-purple-100 text-purple-600',
    testimonial: 'bg-yellow-100 text-yellow-600'
  }

  return (
    <div className="dashboard-card">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
      
      {activities.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No recent activity</p>
      ) : (
        <div className="flow-root">
          <ul className="-mb-8">
            {activities.map((activity, activityIdx) => (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {activityIdx !== activities.length - 1 ? (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${typeColors[activity.type]}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={activity.icon} />
                        </svg>
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="text-sm">
                          <span className="font-medium text-gray-900">{activity.title}</span>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">{formatDate(activity.date)}</p>
                      </div>
                      <div className="mt-2 text-sm text-gray-700">
                        <p>{activity.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}