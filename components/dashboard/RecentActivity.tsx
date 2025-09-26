'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getProjects, getWorkExperience, getTestimonials } from '@/lib/cosmic'
import { Project, WorkExperience, Testimonial } from '@/types'
import { formatDate, truncateText } from '@/lib/utils'

interface ActivityItem {
  id: string
  type: 'project' | 'work-experience' | 'testimonial'
  title: string
  description: string
  date: string
  href: string
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRecentActivity() {
      try {
        const [projects, workExperience, testimonials] = await Promise.all([
          getProjects(),
          getWorkExperience(),
          getTestimonials(),
        ])

        const activityItems: ActivityItem[] = []

        // Add projects
        projects.slice(0, 3).forEach(project => {
          activityItems.push({
            id: project.id,
            type: 'project',
            title: project.metadata.name,
            description: truncateText(project.metadata.description, 100),
            date: project.created_at,
            href: `/projects/${project.id}`,
          })
        })

        // Add work experience
        workExperience.slice(0, 2).forEach(work => {
          activityItems.push({
            id: work.id,
            type: 'work-experience',
            title: `${work.metadata.job_title} at ${work.metadata.company}`,
            description: truncateText(work.metadata.description || '', 100),
            date: work.created_at,
            href: `/work-experience/${work.id}`,
          })
        })

        // Add testimonials
        testimonials.slice(0, 2).forEach(testimonial => {
          activityItems.push({
            id: testimonial.id,
            type: 'testimonial',
            title: `Testimonial from ${testimonial.metadata.name}`,
            description: truncateText(testimonial.metadata.testimonial, 100),
            date: testimonial.created_at,
            href: `/testimonials/${testimonial.id}`,
          })
        })

        // Sort by date and take most recent
        activityItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        setActivities(activityItems.slice(0, 6))
      } catch (error) {
        console.error('Error fetching recent activity:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecentActivity()
  }, [])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'project':
        return 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
      case 'work-experience':
        return 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
      case 'testimonial':
        return 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
      default:
        return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'project':
        return 'bg-blue-100 text-blue-600'
      case 'work-experience':
        return 'bg-purple-100 text-purple-600'
      case 'testimonial':
        return 'bg-yellow-100 text-yellow-600'
      default:
        return 'bg-gray-100 text-gray-600'
    }
  }

  if (loading) {
    return (
      <div className="dashboard-card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-start space-x-3 animate-pulse">
              <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        <Link 
          href="/projects" 
          className="text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          View all
        </Link>
      </div>

      <div className="flow-root">
        <ul className="-mb-8">
          {activities.map((activity, index) => (
            <li key={activity.id}>
              <div className="relative pb-8">
                {index !== activities.length - 1 && (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-md flex items-center justify-center ${getTypeColor(activity.type)}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={getTypeIcon(activity.type)}
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div>
                      <Link
                        href={activity.href}
                        className="text-sm font-medium text-gray-900 hover:text-primary-600"
                      >
                        {activity.title}
                      </Link>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                    <div className="mt-2 text-xs text-gray-400">
                      {formatDate(activity.date)}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {activities.length === 0 && (
        <div className="text-center py-6">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No recent activity</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating your first project.</p>
        </div>
      )}
    </div>
  )
}