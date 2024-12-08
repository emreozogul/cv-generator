import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export interface ExportOptions {
    format: 'A4' | 'Letter'
    orientation: 'portrait' | 'landscape'
    scale: number
    margin: number
}

export async function exportToPDF(
    element: HTMLElement,
    options: ExportOptions
): Promise<Blob> {
    const { format, orientation, scale, margin } = options

    // Get page dimensions
    const formats = {
        A4: { width: 210, height: 297 },
        Letter: { width: 215.9, height: 279.4 },
    }
    const formatSize = formats[format]
    const isPortrait = orientation === 'portrait'
    const pageWidth = isPortrait ? formatSize.width : formatSize.height

    // Create canvas
    const canvas = await html2canvas(element, {
        scale: scale,
        useCORS: true,
        logging: false,
    })

    // Calculate dimensions
    const imgWidth = pageWidth - 2 * margin
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    // Create PDF
    const pdf = new jsPDF({
        format: format.toLowerCase(),
        orientation: orientation,
        unit: 'mm',
    })

    // Add image to PDF
    const imgData = canvas.toDataURL('image/png')
    pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight)

    // Return as blob
    return new Blob([pdf.output('blob')], { type: 'application/pdf' })
} 