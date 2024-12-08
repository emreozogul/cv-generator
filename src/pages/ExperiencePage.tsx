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
import { Pencil, Trash2 } from 'lucide-react'

export default function ExperiencePage() {
    const { experience, addExperience, updateExperience, removeExperience } =
        useCVStore()
    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        id: '',
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        location: '',
        description: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (editingId) {
            updateExperience(editingId, { ...formData, id: editingId })
            setEditingId(null)
        } else {
            addExperience({ ...formData, id: crypto.randomUUID() })
        }
        setFormData({
            id: '',
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            location: '',
            description: '',
        })
    }

    const handleEdit = (exp: typeof formData) => {
        setFormData(exp)
        setEditingId(exp.id)
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Work Experience</h3>
                <p className="text-sm text-muted-foreground">
                    Add your professional experience.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Google"
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="position">Position</Label>
                        <Input
                            id="position"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            placeholder="Senior Software Engineer"
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Mountain View, CA"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                            id="startDate"
                            name="startDate"
                            type="month"
                            value={formData.startDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                            id="endDate"
                            name="endDate"
                            type="month"
                            value={formData.endDate}
                            onChange={handleChange}
                            placeholder="Leave empty if current position"
                        />
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="• Key responsibilities&#10;• Notable achievements&#10;• Technologies used&#10;• Projects completed"
                        className="min-h-[150px]"
                    />
                </div>

                <Button type="submit">
                    {editingId ? 'Update Experience' : 'Add Experience'}
                </Button>
            </form>

            <div className="space-y-4">
                {experience.map((exp) => (
                    <Card key={exp.id}>
                        <CardHeader>
                            <CardTitle>{exp.position}</CardTitle>
                            <CardDescription>{exp.company}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm">
                                <p className="text-muted-foreground">
                                    {exp.startDate} - {exp.endDate || 'Present'}
                                </p>
                                <p className="text-muted-foreground">{exp.location}</p>
                                {exp.description && (
                                    <p className="mt-2 whitespace-pre-line">{exp.description}</p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(exp)}
                            >
                                <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeExperience(exp.id)}
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