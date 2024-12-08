import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Download,
    FileType,
    Loader2,
    FileText,
    Code,
    FileEdit,
} from 'lucide-react'
import {
    exportToPDF,
    exportToHTML,
    exportToPlainText,
    exportToDOCX,
    downloadFile,
    type ExportOptions,
} from '@/lib/utils/export'

export default function ExportPage() {
    const [isExporting, setIsExporting] = useState(false)
    const options: ExportOptions = {
        format: 'A4',
        orientation: 'portrait',
        scale: 2,
        margin: 10,
        fileName: 'cv',
        includeLinks: true,
        quality: 'normal',
    }

    const handleExport = async (format: 'pdf' | 'docx' | 'html' | 'txt') => {
        const cvElement = document.querySelector('#cv-preview')
        if (!cvElement) return

        setIsExporting(true)
        try {
            switch (format) {
                case 'pdf': {
                    const blob = await exportToPDF(cvElement as HTMLElement, options)
                    await downloadFile(blob, `${options.fileName}.pdf`, 'application/pdf')
                    break
                }
                case 'docx': {
                    const blob = await exportToDOCX(cvElement as HTMLElement, options)
                    await downloadFile(
                        blob,
                        `${options.fileName}.docx`,
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                    )
                    break
                }
                case 'html': {
                    const html = await exportToHTML(cvElement as HTMLElement, options)
                    await downloadFile(html, `${options.fileName}.html`, 'text/html')
                    break
                }
                case 'txt': {
                    const text = await exportToPlainText(cvElement as HTMLElement)
                    await downloadFile(text, `${options.fileName}.txt`, 'text/plain')
                    break
                }
            }
        } catch (error) {
            console.error('Failed to export:', error)
        } finally {
            setIsExporting(false)
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Export</h3>
                <p className="text-sm text-muted-foreground">
                    Export your CV in different formats.
                </p>
            </div>

            <div className="grid gap-6">

                <div className="grid gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileType className="h-5 w-5" />
                                PDF Format
                            </CardTitle>
                            <CardDescription>
                                Export as a professional PDF document
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button
                                onClick={() => handleExport('pdf')}
                                disabled={isExporting}
                                className="w-full"
                            >
                                {isExporting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Exporting...
                                    </>
                                ) : (
                                    <>
                                        <Download className="mr-2 h-4 w-4" />
                                        Export as PDF
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileEdit className="h-5 w-5" />
                                Word Format
                            </CardTitle>
                            <CardDescription>
                                Export as an editable DOCX document
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button
                                onClick={() => handleExport('docx')}
                                disabled={isExporting}
                                variant="outline"
                                className="w-full"
                            >
                                {isExporting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Exporting...
                                    </>
                                ) : (
                                    <>
                                        <FileEdit className="mr-2 h-4 w-4" />
                                        Export as DOCX
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Code className="h-5 w-5" />
                                HTML Format
                            </CardTitle>
                            <CardDescription>
                                Export as a web-ready HTML document
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button
                                onClick={() => handleExport('html')}
                                disabled={isExporting}
                                variant="outline"
                                className="w-full"
                            >
                                {isExporting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Exporting...
                                    </>
                                ) : (
                                    <>
                                        <Code className="mr-2 h-4 w-4" />
                                        Export as HTML
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5" />
                                Plain Text
                            </CardTitle>
                            <CardDescription>
                                Export as a simple text document
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button
                                onClick={() => handleExport('txt')}
                                disabled={isExporting}
                                variant="outline"
                                className="w-full"
                            >
                                {isExporting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Exporting...
                                    </>
                                ) : (
                                    <>
                                        <FileText className="mr-2 h-4 w-4" />
                                        Export as Text
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    )
} 