import { useState } from 'react'
import { useCVStore } from '@/lib/store/cv-store'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Pencil, Trash2 } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

interface Skill {
    id: string;
    name: string;
    group: string;
}

// Common skill groups that users can select from
const commonSkillGroups = [
    'Programming Languages',
    'Frameworks & Libraries',
    'Databases',
    'Cloud Services',
    'Tools & Software',
    'Soft Skills',
    'Languages',
    'Design',
    'Project Management',
    'Other'
]

export default function SkillsPage() {
    const { skills, addSkill, updateSkill, removeSkill } = useCVStore()
    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState<Skill>({
        id: '',
        name: '',
        group: '',
    })
    const [quickAdd, setQuickAdd] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (editingId) {
            updateSkill(editingId, { ...formData, id: editingId })
            setEditingId(null)
        } else {
            // Split and add multiple skills if using quick add
            const skillNames = quickAdd.split(',').map(s => s.trim()).filter(Boolean)
            if (skillNames.length > 0) {
                skillNames.forEach(name => {
                    addSkill({
                        id: crypto.randomUUID(),
                        name,
                        group: formData.group
                    })
                })
                setQuickAdd('')
            } else if (formData.name) {
                addSkill({ ...formData, id: crypto.randomUUID() })
            }
        }
        setFormData({
            id: '',
            name: '',
            group: formData.group, // Keep the selected group
        })
    }

    const handleEdit = (skill: Skill) => {
        setFormData(skill)
        setEditingId(skill.id)
        setQuickAdd('')
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target
        if (name === 'name') {
            setQuickAdd('')
        }
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleQuickAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuickAdd(e.target.value)
        setFormData(prev => ({ ...prev, name: '' }))
    }

    const handleGroupChange = (value: string) => {
        setFormData(prev => ({ ...prev, group: value }))
    }

    // Group skills by their group name
    const groupedSkills = skills.reduce((acc, skill) => {
        const group = skill.group || 'Uncategorized'
        if (!acc[group]) {
            acc[group] = []
        }
        acc[group].push(skill)
        return acc
    }, {} as Record<string, Skill[]>)

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Skills</h3>
                <p className="text-sm text-muted-foreground">
                    Add your skills and organize them into groups.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="group">Skill Group</Label>
                        <Select value={formData.group} onValueChange={handleGroupChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a skill group" />
                            </SelectTrigger>
                            <SelectContent>
                                {commonSkillGroups.map((group) => (
                                    <SelectItem key={group} value={group}>
                                        {group}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {!editingId && (
                        <div className="grid gap-2">
                            <Label htmlFor="quickAdd">Quick Add Multiple Skills (comma-separated)</Label>
                            <Input
                                id="quickAdd"
                                value={quickAdd}
                                onChange={handleQuickAddChange}
                                placeholder="e.g., JavaScript, TypeScript, React"
                            />
                        </div>
                    )}

                    {(editingId || !quickAdd) && (
                        <div className="grid gap-2">
                            <Label htmlFor="name">Skill Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g., React"
                                required={!quickAdd}
                            />
                        </div>
                    )}
                </div>

                <Button type="submit">
                    {editingId ? 'Update Skill' : 'Add Skill'}
                </Button>
            </form>

            {Object.entries(groupedSkills).map(([group, groupSkills]) => (
                <div key={group} className="space-y-4">
                    <h4 className="text-md font-medium">{group}</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                        {groupSkills.map((skill) => (
                            <Card key={skill.id}>
                                <CardHeader>
                                    <CardTitle>{skill.name}</CardTitle>
                                </CardHeader>
                                <CardFooter className="gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(skill)}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => removeSkill(skill.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
} 