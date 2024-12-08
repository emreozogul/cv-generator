import { useState } from 'react'
import { useCVStore } from '@/lib/store/cv-store'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Pencil, Trash2, Link as LinkIcon } from 'lucide-react'

interface ProjectFormData {
    id: string
    name: string
    description: string
    technologies: string[]
    link: string
}

export default function ProjectsPage() {
    const { projects, addProject, updateProject, removeProject } = useCVStore()
    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState<ProjectFormData>({
        id: '',
        name: '',
        description: '',
        technologies: [],
        link: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (editingId) {
            updateProject(editingId, { ...formData, id: editingId })
            setEditingId(null)
        } else {
            addProject({ ...formData, id: crypto.randomUUID() })
        }
        setFormData({
            id: '',
            name: '',
            description: '',
            technologies: [],
            link: '',
        })
    }

    const handleEdit = (project: typeof projects[0]) => {
        setFormData({
            ...project,
            link: project.link || '',
        })
        setEditingId(project.id)
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        if (name === 'technologies') {
            setFormData((prev) => ({
                ...prev,
                technologies: value.split(',').map((tech) => tech.trim()),
            }))
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }))
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Projects</h3>
                <p className="text-sm text-muted-foreground">
                    Add your notable projects and achievements.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Project Name</Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g., E-commerce Platform"
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="technologies">
                            Technologies Used (comma-separated)
                        </Label>
                        <Input
                            id="technologies"
                            name="technologies"
                            value={formData.technologies.join(', ')}
                            onChange={handleChange}
                            placeholder="e.g., React, Node.js, MongoDB"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="link">Project Link (optional)</Label>
                        <Input
                            id="link"
                            name="link"
                            type="url"
                            value={formData.link}
                            onChange={handleChange}
                            placeholder="https://github.com/yourusername/project"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Project Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="• Project overview&#10;• Your role&#10;• Key features&#10;• Achievements and impact"
                            className="min-h-[150px]"
                        />
                    </div>
                </div>

                <Button type="submit">
                    {editingId ? 'Update Project' : 'Add Project'}
                </Button>
            </form>

            <div className="grid gap-4 ">
                {projects.map((project) => (
                    <Card key={project.id}>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                {project.name}
                                {project.link && (
                                    <a
                                        title="View project"
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-muted-foreground hover:text-primary"
                                    >
                                        <LinkIcon className="h-4 w-4" />
                                    </a>
                                )}
                            </CardTitle>
                            {project.technologies.length > 0 && (
                                <CardDescription>
                                    <div className="flex flex-wrap gap-1">
                                        {project.technologies.map((tech, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </CardDescription>
                            )}
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm whitespace-pre-line">
                                {project.description}
                            </p>
                        </CardContent>
                        <CardFooter className="gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(project)}
                            >
                                <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeProject(project.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
} 