import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long'
  }).format(date);
}

export function formatDateRange(startDate: string, endDate?: string | null): string {
  const start = formatDate(startDate);
  
  if (!endDate) {
    return `${start} - Present`;
  }
  
  const end = formatDate(endDate);
  return `${start} - ${end}`;
}

export function truncateText(text: string, maxLength: number = 150): string {
  if (!text) return '';
  
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.substring(0, maxLength).trim() + '...';
}

export function capitalizeFirst(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function getImageUrl(image: { url: string; imgix_url: string } | undefined, size?: string): string {
  if (!image) return '';
  
  const baseUrl = image.imgix_url || image.url;
  
  if (!size) {
    return `${baseUrl}?auto=format,compress`;
  }
  
  return `${baseUrl}?${size}&auto=format,compress`;
}

export function sortByCreatedAt<T extends { created_at: string }>(items: T[], order: 'asc' | 'desc' = 'desc'): T[] {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
}

export function groupByCategory<T extends { metadata: { category?: { key: string; value: string } } }>(items: T[]): Record<string, T[]> {
  return items.reduce((groups, item) => {
    const categoryKey = item.metadata.category?.key || 'other';
    
    if (!groups[categoryKey]) {
      groups[categoryKey] = [];
    }
    
    groups[categoryKey].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

export function calculateYearsFromDate(startDate: string, endDate?: string | null): number {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  const years = end.getFullYear() - start.getFullYear();
  const monthDiff = end.getMonth() - start.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && end.getDate() < start.getDate())) {
    return years - 1;
  }
  
  return years;
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
}