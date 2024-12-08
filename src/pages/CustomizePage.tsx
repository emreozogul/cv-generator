import { useCVStore } from '@/lib/store/cv-store'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { templates } from '@/lib/templates'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

const fonts = [
    {
        name: 'System Default',
        value: 'system-ui, -apple-system, "Segoe UI", "Ubuntu", "Roboto", "Noto Sans", Arial, sans-serif'
    },
    {
        name: 'Windows (Segoe UI)',
        value: '"Segoe UI", system-ui, Arial, sans-serif'
    },
    {
        name: 'Mac (SF Pro)',
        value: '-apple-system, BlinkMacSystemFont, system-ui, Arial, sans-serif'
    },
    {
        name: 'Linux (Ubuntu)',
        value: '"Ubuntu", "Noto Sans", system-ui, Arial, sans-serif'
    },
    {
        name: 'Universal (Arial)',
        value: 'Arial, system-ui, sans-serif'
    }
]

export default function CustomizePage() {
    const { theme, updateTheme } = useCVStore()
    const handleFontChange = (value: string) => {
        updateTheme({ font: value })
    }

    const handleSpacingChange = (value: number[]) => {
        updateTheme({ spacing: value[0] })
    }

    const handleTemplateChange = (templateId: string) => {
        updateTheme({ template: templateId })
    }

    return (
        <div className="max-w-[800px] mx-auto space-y-8">
            <div>
                <h3 className="text-lg font-medium">Customize</h3>
                <p className="text-sm text-muted-foreground">
                    Customize the appearance of your CV.
                </p>
            </div>

            <div className="space-y-8">
                <div>
                    <h4 className="text-sm font-medium mb-4">Template</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {templates.map((template) => (
                            <Card
                                key={template.id}
                                className={`cursor-pointer transition-colors hover:bg-muted/50 ${theme.template === template.id ? 'ring-2 ring-primary' : ''
                                    }`}
                                onClick={() => handleTemplateChange(template.id)}
                            >
                                <CardHeader className="p-4">
                                    <CardTitle className="text-base flex justify-between items-center">
                                        {template.name}
                                    </CardTitle>
                                    <CardDescription>{template.description}</CardDescription>
                                </CardHeader>

                            </Card>
                        ))}
                    </div>
                </div>

                <div className="grid gap-6">
                    <div className="space-y-4">
                        <h4 className="text-sm font-medium">Theme Settings</h4>
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="font">Font Family</Label>
                                <Select value={theme.font} onValueChange={handleFontChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a font" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {fonts.map((font) => (
                                            <SelectItem key={font.value} value={font.value}>
                                                <span style={{ fontFamily: font.value }}>{font.name}</span>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label>Content Spacing</Label>
                                <div className="flex gap-4 items-center">
                                    <Slider
                                        value={[theme.spacing]}
                                        onValueChange={handleSpacingChange}
                                        min={0.8}
                                        max={1.5}
                                        step={0.1}
                                        className="w-[200px]"
                                    />
                                    <span className="text-sm text-muted-foreground">
                                        {theme.spacing.toFixed(1)}x
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
} 