import { useState } from 'react'
import { useCVStore } from '@/lib/store/cv-store'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'

export default function PersonalInfoPage() {
    const { personalInfo, setPersonalInfo } = useCVStore()
    const [newLink, setNewLink] = useState({ label: '', url: '' })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setPersonalInfo({ ...personalInfo, [name]: value })
    }

    const handleAddLink = () => {
        if (newLink.label && newLink.url) {
            setPersonalInfo({
                ...personalInfo,
                links: [
                    ...personalInfo.links,
                    { ...newLink, id: crypto.randomUUID() }
                ]
            })
            setNewLink({ label: '', url: '' })
        }
    }

    const handleRemoveLink = (id: string) => {
        setPersonalInfo({
            ...personalInfo,
            links: personalInfo.links.filter(link => link.id !== id)
        })
    }

    return (
        <div className="max-w-2xl space-y-6">
            <div>
                <h3 className="text-lg font-medium">Personal Information</h3>
                <p className="text-sm text-muted-foreground">
                    Fill in your personal details that will appear on your CV.
                </p>
            </div>

            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                        id="fullName"
                        name="fullName"
                        placeholder="John Doe"
                        value={personalInfo.fullName}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="title">Professional Title</Label>
                    <Input
                        id="title"
                        name="title"
                        placeholder="Software Engineer"
                        value={personalInfo.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={personalInfo.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 234 567 890"
                        value={personalInfo.phone}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                        id="location"
                        name="location"
                        placeholder="City, Country"
                        value={personalInfo.location}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid gap-2">
                    <Label>Links</Label>
                    <div className="space-y-2">
                        {personalInfo.links.map((link) => (
                            <div key={link.id} className="flex gap-2">
                                <Input
                                    value={link.label}
                                    disabled
                                    className="flex-1"
                                />
                                <Input
                                    value={link.url}
                                    disabled
                                    className="flex-1"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleRemoveLink(link.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <div className="flex gap-2">
                            <Input
                                placeholder="Label (e.g., GitHub, LinkedIn)"
                                value={newLink.label}
                                onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
                                className="flex-1"
                            />
                            <Input
                                placeholder="URL"
                                type="url"
                                value={newLink.url}
                                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                                className="flex-1"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={handleAddLink}
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="summary">Professional Summary</Label>
                    <Textarea
                        id="summary"
                        name="summary"
                        placeholder="Write a brief summary of your professional background and career objectives..."
                        value={personalInfo.summary}
                        onChange={handleChange}
                        className="min-h-[120px]"
                    />
                </div>
            </div>
        </div>
    )
} 