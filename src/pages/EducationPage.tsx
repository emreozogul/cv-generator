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

export default function EducationPage() {
    const { education, addEducation, updateEducation, removeEducation } =
        useCVStore()
    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        id: '',
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        location: '',
        description: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (editingId) {
            updateEducation(editingId, { ...formData, id: editingId })
            setEditingId(null)
        } else {
            addEducation({ ...formData, id: crypto.randomUUID() })
        }
        setFormData({
            id: '',
            school: '',
            degree: '',
            field: '',
            startDate: '',
            endDate: '',
            location: '',
            description: '',
        })
    }

    const handleEdit = (edu: typeof formData) => {
        setFormData(edu)
        setEditingId(edu.id)
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
                <h3 className="text-lg font-medium">Education</h3>
                <p className="text-sm text-muted-foreground">
                    Add your educational background.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                        <Label htmlFor="school">School/University</Label>
                        <Input
                            id="school"
                            name="school"
                            value={formData.school}
                            onChange={handleChange}
                            placeholder="Harvard University"
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="degree">Degree</Label>
                        <Input
                            id="degree"
                            name="degree"
                            value={formData.degree}
                            onChange={handleChange}
                            placeholder="Bachelor's"
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="field">Field of Study</Label>
                        <Input
                            id="field"
                            name="field"
                            value={formData.field}
                            onChange={handleChange}
                            placeholder="Computer Science"
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
                            placeholder="Cambridge, MA"
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
                        placeholder="Relevant coursework, achievements, activities..."
                    />
                </div>

                <Button type="submit">
                    {editingId ? 'Update Education' : 'Add Education'}
                </Button>
            </form>

            <div className="space-y-4">
                {education.map((edu) => (
                    <Card key={edu.id}>
                        <CardHeader>
                            <CardTitle>{edu.school}</CardTitle>
                            <CardDescription>
                                {edu.degree} in {edu.field}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm">
                                <p className="text-muted-foreground">
                                    {edu.startDate} - {edu.endDate || 'Present'}
                                </p>
                                <p className="text-muted-foreground">{edu.location}</p>
                                {edu.description && (
                                    <p className="mt-2 whitespace-pre-line">{edu.description}</p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter className="gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(edu)}
                            >
                                <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeEducation(edu.id)}
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