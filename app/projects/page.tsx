'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { getProjects, deleteProject } from '@/lib/cosmic'
import { Project } from '@/types'
import { formatDate, getImageUrl, truncateText } from '@/lib/utils'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects()
        setProjects(data)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return
    }

    try {
      await deleteProject(id)
      setProjects(projects.filter(p => p.id !== id))
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Failed to delete project')
    }
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.metadata.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.metadata.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (filter === 'all') return matchesSearch
    if (filter === 'featured') return matchesSearch && project.metadata.featured
    if (filter === 'type') return matchesSearch && project.metadata.project_type?.key === filter
    
    return matchesSearch
  })

  if (loading) {
    return (
      <DashboardLayout>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <Link
            href="/projects/new"
            className="dashboard-button-primary"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Project
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="form-input w-auto"
          >
            <option value="all">All Projects</option>
            <option value="featured">Featured Only</option>
            <option value="web_app">Web Applications</option>
            <option value="website">Websites</option>
            <option value="mobile_app">Mobile Apps</option>
          </select>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <div key={project.id} className="dashboard-card">
              {project.metadata.featured_image && (
                <img
                  src={getImageUrl(project.metadata.featured_image, 'w=400&h=200&fit=crop')}
                  alt={project.metadata.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {project.metadata.name}
                </h3>
                {project.metadata.featured && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Featured
                  </span>
                )}
              </div>
              
              <p className="text-gray-600 text-sm mb-4">
                {truncateText(project.metadata.description, 120)}
              </p>
              
              {project.metadata.technologies && (
                <p className="text-xs text-gray-500 mb-4">
                  {project.metadata.technologies}
                </p>
              )}
              
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span>{formatDate(project.created_at)}</span>
                {project.metadata.project_type && (
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {project.metadata.project_type.value}
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Link
                  href={`/projects/${project.id}`}
                  className="flex-1 text-center dashboard-button-secondary text-sm py-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="dashboard-button-danger text-sm py-2 px-3"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No projects found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery || filter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by creating your first project.'
              }
            </p>
            {searchQuery === '' && filter === 'all' && (
              <div className="mt-6">
                <Link
                  href="/projects/new"
                  className="dashboard-button-primary"
                >
                  Add Project
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}