'use client'

import { useState, useEffect } from 'react'
import { getProjects, getSkills, getWorkExperience, getTestimonials } from '@/lib/cosmic'
import { Project, Skill, WorkExperience, Testimonial } from '@/types'
import StatsCard from './StatsCard'

interface StatsCardProps {
  title: string;
  value: number;
  change: string;
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'yellow';
}

export default function DashboardStats() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    featuredProjects: 0,
    totalSkills: 0,
    skillCategories: 0,
    totalExperience: 0,
    currentPositions: 0,
    totalTestimonials: 0,
    featuredTestimonials: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const [projects, skills, workExperience, testimonials] = await Promise.all([
          getProjects(),
          getSkills(),
          getWorkExperience(),
          getTestimonials(),
        ])

        // Calculate stats
        const featuredProjects = projects.filter(p => p.metadata.featured).length
        const skillCategories = new Set(skills.map(s => s.metadata.category?.key)).size
        const currentPositions = workExperience.filter(w => w.metadata.current_position).length
        const featuredTestimonials = testimonials.filter(t => t.metadata.featured).length

        setStats({
          totalProjects: projects.length,
          featuredProjects,
          totalSkills: skills.length,
          skillCategories,
          totalExperience: workExperience.length,
          currentPositions,
          totalTestimonials: testimonials.length,
          featuredTestimonials,
        })
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="dashboard-card animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  const statsData: StatsCardProps[] = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      change: `${stats.featuredProjects} featured`,
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      color: 'blue',
    },
    {
      title: 'Skills',
      value: stats.totalSkills,
      change: `${stats.skillCategories} categories`,
      icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
      color: 'green',
    },
    {
      title: 'Work Experience',
      value: stats.totalExperience,
      change: `${stats.currentPositions} current`,
      icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      color: 'purple',
    },
    {
      title: 'Testimonials',
      value: stats.totalTestimonials,
      change: `${stats.featuredTestimonials} featured`,
      icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
      color: 'yellow',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}