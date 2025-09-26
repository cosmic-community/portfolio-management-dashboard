import { createBucketClient } from '@cosmicjs/sdk'
import { 
  Project, 
  Skill, 
  WorkExperience, 
  Testimonial, 
  CosmicResponse,
  CosmicError 
} from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Projects
export async function getProjects(): Promise<Project[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'projects' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return (response.objects as Project[]).sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return dateB - dateA; // Newest first
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch projects');
  }
}

export async function getProject(id: string): Promise<Project | null> {
  try {
    const response = await cosmic.objects.findOne({ 
      id,
      type: 'projects' 
    }).depth(1);
    
    return response.object as Project;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function createProject(data: any): Promise<Project> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'projects',
      title: data.name,
      metadata: {
        ...data,
        featured: data.featured || false
      }
    });
    
    return response.object as Project;
  } catch (error) {
    console.error('Error creating project:', error);
    throw new Error('Failed to create project');
  }
}

export async function updateProject(id: string, data: any): Promise<Project> {
  try {
    const response = await cosmic.objects.updateOne(id, {
      metadata: data
    });
    
    return response.object as Project;
  } catch (error) {
    console.error('Error updating project:', error);
    throw new Error('Failed to update project');
  }
}

export async function deleteProject(id: string): Promise<void> {
  try {
    await cosmic.objects.deleteOne(id);
  } catch (error) {
    console.error('Error deleting project:', error);
    throw new Error('Failed to delete project');
  }
}

// Skills
export async function getSkills(): Promise<Skill[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'skills' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Skill[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch skills');
  }
}

export async function createSkill(data: any): Promise<Skill> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'skills',
      title: data.name,
      metadata: data
    });
    
    return response.object as Skill;
  } catch (error) {
    console.error('Error creating skill:', error);
    throw new Error('Failed to create skill');
  }
}

export async function updateSkill(id: string, data: any): Promise<Skill> {
  try {
    const response = await cosmic.objects.updateOne(id, {
      metadata: data
    });
    
    return response.object as Skill;
  } catch (error) {
    console.error('Error updating skill:', error);
    throw new Error('Failed to update skill');
  }
}

export async function deleteSkill(id: string): Promise<void> {
  try {
    await cosmic.objects.deleteOne(id);
  } catch (error) {
    console.error('Error deleting skill:', error);
    throw new Error('Failed to delete skill');
  }
}

// Work Experience
export async function getWorkExperience(): Promise<WorkExperience[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'work-experience' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return (response.objects as WorkExperience[]).sort((a, b) => {
      const dateA = new Date(a.metadata?.start_date || '').getTime();
      const dateB = new Date(b.metadata?.start_date || '').getTime();
      return dateB - dateA; // Most recent first
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch work experience');
  }
}

export async function createWorkExperience(data: any): Promise<WorkExperience> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'work-experience',
      title: `${data.job_title} at ${data.company}`,
      metadata: {
        ...data,
        current_position: data.current_position || false
      }
    });
    
    return response.object as WorkExperience;
  } catch (error) {
    console.error('Error creating work experience:', error);
    throw new Error('Failed to create work experience');
  }
}

export async function updateWorkExperience(id: string, data: any): Promise<WorkExperience> {
  try {
    const response = await cosmic.objects.updateOne(id, {
      metadata: data
    });
    
    return response.object as WorkExperience;
  } catch (error) {
    console.error('Error updating work experience:', error);
    throw new Error('Failed to update work experience');
  }
}

export async function deleteWorkExperience(id: string): Promise<void> {
  try {
    await cosmic.objects.deleteOne(id);
  } catch (error) {
    console.error('Error deleting work experience:', error);
    throw new Error('Failed to delete work experience');
  }
}

// Testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'testimonials' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Testimonial[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch testimonials');
  }
}

export async function createTestimonial(data: any): Promise<Testimonial> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'testimonials',
      title: `${data.name} Testimonial`,
      metadata: {
        ...data,
        featured: data.featured || false
      }
    });
    
    return response.object as Testimonial;
  } catch (error) {
    console.error('Error creating testimonial:', error);
    throw new Error('Failed to create testimonial');
  }
}

export async function updateTestimonial(id: string, data: any): Promise<Testimonial> {
  try {
    const response = await cosmic.objects.updateOne(id, {
      metadata: data
    });
    
    return response.object as Testimonial;
  } catch (error) {
    console.error('Error updating testimonial:', error);
    throw new Error('Failed to update testimonial');
  }
}

export async function deleteTestimonial(id: string): Promise<void> {
  try {
    await cosmic.objects.deleteOne(id);
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    throw new Error('Failed to delete testimonial');
  }
}