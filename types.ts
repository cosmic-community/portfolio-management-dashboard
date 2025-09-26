// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Project interface
export interface Project extends CosmicObject {
  type: 'projects';
  metadata: {
    name: string;
    description: string;
    technologies?: string;
    live_url?: string;
    github_url?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    gallery?: Array<{
      url: string;
      imgix_url: string;
    }>;
    project_type?: {
      key: string;
      value: string;
    };
    featured?: boolean;
  };
}

// Skills interface
export interface Skill extends CosmicObject {
  type: 'skills';
  metadata: {
    name: string;
    category: {
      key: SkillCategory;
      value: string;
    };
    proficiency?: {
      key: ProficiencyLevel;
      value: string;
    };
    years_experience?: number;
  };
}

// Work Experience interface
export interface WorkExperience extends CosmicObject {
  type: 'work-experience';
  metadata: {
    job_title: string;
    company: string;
    company_website?: string;
    start_date: string;
    end_date?: string | null;
    current_position?: boolean;
    description?: string;
    achievements?: string;
    technologies?: string;
    company_logo?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Testimonial interface
export interface Testimonial extends CosmicObject {
  type: 'testimonials';
  metadata: {
    name: string;
    position?: string;
    company?: string;
    testimonial: string;
    rating?: {
      key: string;
      value: string;
    };
    photo?: {
      url: string;
      imgix_url: string;
    };
    featured?: boolean;
  };
}

// Type unions for select-dropdown values
export type SkillCategory = 'frontend' | 'backend' | 'database' | 'tools' | 'design' | 'other';
export type ProficiencyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type ProjectType = 'web_app' | 'website' | 'mobile_app' | 'api' | 'tool';
export type Rating = '3' | '4' | '5';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip?: number;
}

// Form data types
export interface ProjectFormData {
  name: string;
  description: string;
  technologies?: string;
  live_url?: string;
  github_url?: string;
  project_type?: ProjectType;
  featured?: boolean;
}

export interface SkillFormData {
  name: string;
  category: SkillCategory;
  proficiency?: ProficiencyLevel;
  years_experience?: number;
}

export interface WorkExperienceFormData {
  job_title: string;
  company: string;
  company_website?: string;
  start_date: string;
  end_date?: string;
  current_position?: boolean;
  description?: string;
  achievements?: string;
  technologies?: string;
}

export interface TestimonialFormData {
  name: string;
  position?: string;
  company?: string;
  testimonial: string;
  rating?: Rating;
  featured?: boolean;
}

// Dashboard stats interface
export interface DashboardStats {
  totalProjects: number;
  featuredProjects: number;
  totalSkills: number;
  skillCategories: number;
  totalExperience: number;
  currentPositions: number;
  totalTestimonials: number;
  featuredTestimonials: number;
}

// Type guards
export function isProject(obj: CosmicObject): obj is Project {
  return obj.type === 'projects';
}

export function isSkill(obj: CosmicObject): obj is Skill {
  return obj.type === 'skills';
}

export function isWorkExperience(obj: CosmicObject): obj is WorkExperience {
  return obj.type === 'work-experience';
}

export function isTestimonial(obj: CosmicObject): obj is Testimonial {
  return obj.type === 'testimonials';
}

// Error types
export interface CosmicError extends Error {
  status?: number;
  code?: string;
}

// Utility types
export type OptionalMetadata<T> = Partial<T>;
export type CreateProjectData = Omit<Project, 'id' | 'slug' | 'created_at' | 'modified_at'>;
export type UpdateProjectData = Partial<ProjectFormData>;