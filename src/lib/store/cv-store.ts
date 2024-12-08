import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface PersonalInfo {
    fullName: string
    email: string
    phone: string
    location: string
    title: string
    summary: string
    links: {
        id: string
        label: string
        url: string
    }[]
}

export interface Education {
    id: string
    school: string
    degree: string
    field: string
    startDate: string
    endDate: string
    location: string
    description: string
}

export interface Experience {
    id: string
    company: string
    position: string
    startDate: string
    endDate: string
    location: string
    description: string
}

export interface Skill {
    id: string
    name: string
    group: string
}

export interface Project {
    id: string
    name: string
    description: string
    technologies: string[]
    link?: string
}

interface CVState {
    personalInfo: PersonalInfo
    education: Education[]
    experience: Experience[]
    skills: Skill[]
    projects: Project[]
    theme: {
        template: string
        primary: string
        font: string
        spacing: number
    }
    setPersonalInfo: (info: PersonalInfo) => void
    addEducation: (edu: Education) => void
    updateEducation: (id: string, edu: Education) => void
    removeEducation: (id: string) => void
    addExperience: (exp: Experience) => void
    updateExperience: (id: string, exp: Experience) => void
    removeExperience: (id: string) => void
    addSkill: (skill: Skill) => void
    updateSkill: (id: string, skill: Skill) => void
    removeSkill: (id: string) => void
    addProject: (project: Project) => void
    updateProject: (id: string, project: Project) => void
    removeProject: (id: string) => void
    updateTheme: (theme: Partial<CVState['theme']>) => void
}

const initialState = {
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        title: '',
        summary: '',
        links: []
    },
    education: [],
    experience: [],
    skills: [],
    projects: [],
    theme: {
        template: 'modern',
        primary: '#2563eb',
        font: 'Inter',
        spacing: 1,
    },
}

export const useCVStore = create<CVState>()(
    persist(
        (set) => ({
            ...initialState,
            setPersonalInfo: (info) => set({ personalInfo: info }),
            addEducation: (edu) =>
                set((state) => ({ education: [...state.education, edu] })),
            updateEducation: (id, edu) =>
                set((state) => ({
                    education: state.education.map((e) => (e.id === id ? edu : e)),
                })),
            removeEducation: (id) =>
                set((state) => ({
                    education: state.education.filter((e) => e.id !== id),
                })),
            addExperience: (exp) =>
                set((state) => ({ experience: [...state.experience, exp] })),
            updateExperience: (id, exp) =>
                set((state) => ({
                    experience: state.experience.map((e) => (e.id === id ? exp : e)),
                })),
            removeExperience: (id) =>
                set((state) => ({
                    experience: state.experience.filter((e) => e.id !== id),
                })),
            addSkill: (skill) =>
                set((state) => ({ skills: [...state.skills, skill] })),
            updateSkill: (id, skill) =>
                set((state) => ({
                    skills: state.skills.map((s) => (s.id === id ? skill : s)),
                })),
            removeSkill: (id) =>
                set((state) => ({
                    skills: state.skills.filter((s) => s.id !== id),
                })),
            addProject: (project) =>
                set((state) => ({ projects: [...state.projects, project] })),
            updateProject: (id, project) =>
                set((state) => ({
                    projects: state.projects.map((p) => (p.id === id ? project : p)),
                })),
            removeProject: (id) =>
                set((state) => ({
                    projects: state.projects.filter((p) => p.id !== id),
                })),
            updateTheme: (theme) =>
                set((state) => ({ theme: { ...state.theme, ...theme } })),
        }),
        {
            name: 'cv-storage',
        }
    )
) 