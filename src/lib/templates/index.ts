export interface CVTemplate {
  id: string
  name: string
  description: string
  preview: string
  styles: {
    container: string
    header: string
    section: string
    sectionTitle: string
    content: string
    skillBar: string
    timeline: string
    tags: string
  }
}

export const templates: CVTemplate[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and professional design with a modern touch',
    preview: '/templates/modern.png',
    styles: {
      container: 'bg-white p-8 max-w-[210mm] mx-auto',
      header: 'text-center mb-8',
      section: 'mb-8',
      sectionTitle: 'text-xl font-semibold text-primary mb-3 border-b pb-2',
      content: 'space-y-4',
      skillBar: 'bg-primary/20 rounded-full h-1.5',
      timeline: 'flex justify-between items-start',
      tags: 'flex flex-wrap gap-1 mt-2',
    },
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant design focusing on content',
    preview: '/templates/minimal.png',
    styles: {
      container: 'bg-white p-8 max-w-[210mm] mx-auto font-light',
      header: 'mb-2 border-b pb-4',
      section: 'mb-2',
      sectionTitle: 'text-lg uppercase tracking-wider text-primary mb-2',
      content: 'space-y-6',
      skillBar: 'bg-gray-200 rounded-sm h-1',
      timeline: 'grid gap-1',
      tags: 'flex flex-wrap gap-2 mt-2',
    },
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold and creative design for standing out',
    preview: '/templates/creative.png',
    styles: {
      container: 'bg-white p-8 max-w-[210mm] mx-auto',
      header: 'mb-12 relative after:content-[""] after:absolute after:left-0 after:-bottom-4 after:w-24 after:h-1 after:bg-primary',
      section: 'mb-10',
      sectionTitle: 'text-2xl font-bold text-primary mb-6',
      content: 'space-y-8',
      skillBar: 'bg-primary/10 rounded-full h-2',
      timeline: 'relative pl-6 before:content-[""] before:absolute before:left-0 before:top-0 before:w-px before:h-full before:bg-primary/20',
      tags: 'flex flex-wrap gap-2 mt-2',
    },
  },
  {
    id: 'compact',
    name: 'Compact',
    description: 'Space-efficient design for extensive experience',
    preview: '/templates/compact.png',
    styles: {
      container: 'bg-white p-6 max-w-[210mm] mx-auto text-sm',
      header: 'mb-4',
      section: 'mb-4',
      sectionTitle: 'text-base font-semibold text-primary mb-2 flex items-center gap-2 before:content-[""] before:w-2 before:h-2 before:bg-primary before:rounded-full',
      content: 'space-y-3',
      skillBar: 'bg-gray-100 rounded-full h-1',
      timeline: 'grid grid-cols-[1fr_auto] gap-4',
      tags: 'inline-flex gap-1 text-xs mt-2',
    },
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Sophisticated design for senior professionals',
    preview: '/templates/executive.png',
    styles: {
      container: 'bg-white p-10 max-w-[210mm] mx-auto font-serif',
      header: 'border-b-2 border-primary pb-6 mb-8',
      section: 'mb-10',
      sectionTitle: 'text-xl text-primary mb-4 font-normal',
      content: 'space-y-6',
      skillBar: 'bg-primary/10 rounded-none h-1',
      timeline: 'grid gap-6',
      tags: 'flex flex-wrap gap-3 text-primary/80 mt-2',
    },
  },
  {
    id: 'tech',
    name: 'Tech',
    description: 'Modern design for tech professionals',
    
    styles: {
      container: 'bg-white p-8 max-w-[210mm] font-mono',
      header: 'mb-8 bg-primary/5 p-6 rounded-lg',
      section: 'mb-8',
      sectionTitle: 'text-lg font-bold text-primary mb-4 flex items-center gap-2 before:content-["</>"]',
      content: 'space-y-4',
      skillBar: 'bg-primary rounded-sm h-2',
      timeline: 'grid gap-4 relative before:absolute before:left-0 before:top-0 before:w-[2px] before:h-full before:bg-gradient-to-b before:from-primary before:to-primary/20 pl-6',
      tags: 'flex flex-wrap gap-2 font-mono text-xs mt-2',
    },
  },
  {
    id: 'academic',
    name: 'Academic',
    description: 'Traditional design for academic professionals',
    preview: '/templates/academic.png',
    styles: {
      container: 'bg-white p-8 max-w-[210mm] mx-auto',
      header: 'text-center mb-10',
      section: 'mb-8',
      sectionTitle: 'text-xl font-serif text-primary mb-4 text-center uppercase tracking-widest',
      content: 'space-y-6',
      skillBar: 'bg-primary/20 h-1',
      timeline: 'grid gap-4',
      tags: 'flex flex-wrap gap-2 justify-center mt-2',
    },
  },
  {
    id: 'startup',
    name: 'Startup',
    description: 'Dynamic design for startup environment',
    preview: '/templates/startup.png',
    styles: {
      container: 'bg-white p-8 max-w-[210mm] mx-auto',
      header: 'bg-primary text-white p-6 -mx-8 mb-8',
      section: 'mb-10',
      sectionTitle: 'text-xl font-bold mb-6 flex items-center gap-2 before:w-8 before:h-[2px] before:bg-primary',
      content: 'space-y-6',
      skillBar: 'bg-gradient-to-r from-primary to-primary/50 rounded-full h-2',
      timeline: 'grid gap-6 relative',
      tags: 'flex flex-wrap gap-2 text-xs font-medium',
    },
  },
]

export function getTemplate(id: string): CVTemplate {
  return templates.find((t) => t.id === id) || templates[0]
} 