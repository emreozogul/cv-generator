import { writeFile } from '@tauri-apps/plugin-fs'
import { save } from '@tauri-apps/plugin-dialog'
import html2pdf from 'html2pdf.js'

import {
    Document,
    Paragraph,
    TextRun,
    ExternalHyperlink,
    Packer,
} from 'docx'

export interface ExportOptions {
    format: 'A4' | 'Letter'
    orientation: 'portrait' | 'landscape'
    scale: number
    margin: number
    fileName: string
    includeLinks: boolean
    quality: 'draft' | 'normal' | 'high'
}

const defaultOptions: ExportOptions = {
    format: 'A4',
    orientation: 'portrait',
    scale: 2,
    margin: 10,
    fileName: 'cv',
    includeLinks: true,
    quality: 'normal',
}

const formats = {
    A4: { width: 210, height: 297 },
    Letter: { width: 215.9, height: 279.4 },
}

const qualitySettings = {
    draft: { scale: 1, compress: true },
    normal: { scale: 2, compress: false },
    high: { scale: 3, compress: false },
}

export async function exportToPDF(
    element: HTMLElement,
    options: Partial<ExportOptions> = {}
): Promise<Blob> {
    const mergedOptions = { ...defaultOptions, ...options }
    const { format, orientation, margin, quality } = mergedOptions
    const qualityConfig = qualitySettings[quality]

    // Create a clone of the element
    const clone = element.cloneNode(true) as HTMLElement

    // Create a temporary container
    const container = document.createElement('div')
    container.style.position = 'absolute'
    container.style.left = '-9999px'
    container.style.top = '-9999px'
    document.body.appendChild(container)

    // Process styles
    const processElement = (el: HTMLElement) => {
        // Remove empty containers
        if (el.children.length === 0 && !el.textContent?.trim()) {
            el.style.display = 'none'
            return
        }

        el.style.backgroundColor = 'white'
        el.style.color = el.style.color === 'transparent' ? '#000000' : el.style.color
        el.classList.remove('shadow', 'shadow-lg', 'shadow-sm', 'shadow-md', 'shadow-xl', 'shadow-2xl')
        el.classList.remove('dark')
        el.style.boxShadow = 'none'

        // Improve text rendering
        el.style.setProperty('-webkit-font-smoothing', 'antialiased')
        el.style.setProperty('-moz-osx-font-smoothing', 'grayscale')

        // Ensure proper text wrapping and spacing
        if (getComputedStyle(el).display === 'flex') {
            el.style.flexWrap = 'wrap'
            el.style.gap = '4px'
        }

        // Fix heading rendering
        if (el.tagName.toLowerCase().match(/^h[1-6]$/)) {
            el.style.lineHeight = '1.4'
            el.style.marginBottom = '8px'
            el.style.pageBreakAfter = 'avoid'
            el.style.pageBreakInside = 'avoid'
        }

        // Fix project technologies container
        if (el.classList.contains('flex-wrap') && el.closest('[class*="Projects"]')) {
            el.style.cssText = `
                display: flex !important;
                flex-wrap: wrap !important;
                gap: 8px !important;
                margin-top: 4px !important;
                margin-bottom: 8px !important;
                background: none !important;
            `
        }

        // Style technology tags
        if (el.classList.contains('inline-flex') || el.classList.contains('bg-secondary')) {
            el.style.cssText = `
                display: inline-flex !important;
                background-color: #f3f4f6 !important;
                padding: 2px 8px !important;
                border-radius: 4px !important;
                font-size: 0.875rem !important;
                color: #374151 !important;
                margin: 0 !important;
            `
        }

        // Improve section spacing
        if (el.classList.contains('mb-4')) {
            el.style.marginBottom = '12px'
        }

        // Reduce extra space in sections
        if (el.classList.contains('space-y-4')) {
            el.style.gap = '12px'
        }

        // Adjust content margins
        if (el.classList.contains('mt-2')) {
            el.style.marginTop = '8px'
        }

        // Style individual technology tags in projects
        if (el.tagName.toLowerCase() === 'span' && el.closest('[class*="Projects"]')) {
            const techText = el.textContent?.trim()
            if (techText) {
                // Create a new styled span for each technology
                const techSpan = document.createElement('span')
                techSpan.textContent = techText
                techSpan.style.backgroundColor = '#f3f4f6'
                techSpan.style.color = '#374151'
                techSpan.style.padding = '2px 8px'
                techSpan.style.borderRadius = '4px'
                techSpan.style.fontSize = '0.875rem'
                techSpan.style.marginRight = '6px'
                techSpan.style.marginBottom = '6px'
                techSpan.style.display = 'inline-block'

                // Replace the original span with the styled one
                if (el.parentNode) {
                    el.parentNode.replaceChild(techSpan, el)
                }
            }
        }
    }

    // Process all elements
    processElement(clone)
    clone.querySelectorAll('*').forEach(child => {
        if (child instanceof HTMLElement) {
            processElement(child)
        }
    })

    // Style the clone for PDF
    clone.style.width = '210mm'
    clone.style.padding = `${margin}mm`
    clone.style.backgroundColor = 'white'
    clone.style.minHeight = '297mm'
    clone.style.lineHeight = '1.3'
    clone.style.gap = '16px'

    // Add clone to container
    container.appendChild(clone)

    try {
        // Configure html2pdf options
        const opt = {
            margin: margin,
            filename: `${mergedOptions.fileName}.pdf`,
            image: { type: 'png', quality: 1.0 }, // Use PNG for better quality
            html2canvas: {
                scale: 3, // Higher scale for better quality
                useCORS: true,
                logging: false,
                allowTaint: true,
                backgroundColor: '#ffffff',
                letterRendering: true, // Improve text rendering
                windowWidth: clone.scrollWidth * 2, // Increase canvas size
                windowHeight: clone.scrollHeight * 2,
            },
            jsPDF: {
                unit: 'mm',
                format: format,
                orientation: orientation,
                compress: false, // Disable compression for better quality
                precision: 16, // Increase precision
            },
            pagebreak: {
                mode: ['avoid-all', 'css', 'legacy'],
                before: ['.page-break-before'],
                after: ['.page-break-after'],
                avoid: ['tr', 'td', '.no-break', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'] // Avoid breaking inside headings
            }
        }

        // Generate PDF
        const pdf = await html2pdf().set(opt).from(clone).output('blob')

        return pdf
    } catch (error) {
        console.error('PDF Export Error:', error)
        throw error
    } finally {
        // Clean up
        if (container.parentNode) {
            container.parentNode.removeChild(container)
        }
    }
}

export async function exportToDOCX(
    element: HTMLElement,
    options: Partial<ExportOptions> = {}
): Promise<Blob> {
    const mergedOptions = { ...defaultOptions, ...options }
    const { includeLinks } = mergedOptions
    // Helper function to process section
    const processSection = (
        section: Element,
        headingLevel: "Heading1" | "Heading2" | "Heading3" | "Heading4" | "Heading5" | "Heading6" | "Title" = "Heading1"
    ): Paragraph[] => {
        const paragraphs: Paragraph[] = []

        // Process heading
        const heading = section.querySelector('h1, h2, h3, h4, h5, h6')
        if (heading) {
            paragraphs.push(
                new Paragraph({
                    text: heading.textContent || '',
                    heading: headingLevel,
                    spacing: { before: 240, after: 120 },
                })
            )
        }

        // Process content
        section.querySelectorAll('p').forEach((p) => {
            const runs: (TextRun | ExternalHyperlink)[] = []
            let currentText = ''

            // Process text nodes and links
            p.childNodes.forEach((node) => {
                if (node.nodeType === Node.TEXT_NODE) {
                    currentText += node.textContent
                } else if (
                    node.nodeType === Node.ELEMENT_NODE &&
                    node.nodeName === 'A' &&
                    includeLinks
                ) {
                    // Add accumulated text if any
                    if (currentText) {
                        runs.push(new TextRun(currentText))
                        currentText = ''
                    }

                    const link = node as HTMLAnchorElement
                    runs.push(
                        new ExternalHyperlink({
                            children: [new TextRun({ text: link.textContent || '' })],
                            link: link.href,
                        })
                    )
                }
            })

            // Add any remaining text
            if (currentText) {
                runs.push(new TextRun(currentText))
            }

            paragraphs.push(
                new Paragraph({
                    children: runs,
                    spacing: { before: 120, after: 120 },
                })
            )
        })

        return paragraphs
    }

    // Create document sections
    const sections = Array.from(element.children).flatMap((child) =>
        processSection(child)
    )

    // Create document
    const doc = new Document({
        sections: [
            {
                properties: {},
                children: sections,
            },
        ],
    })

    // Generate blob
    const buffer = await Packer.toBlob(doc)
    return buffer
}

export async function exportToHTML(
    element: HTMLElement,
    options: Partial<ExportOptions> = {}
): Promise<string> {
    const { includeLinks } = { ...defaultOptions, ...options }
    const clone = element.cloneNode(true) as HTMLElement

    // Handle links
    if (!includeLinks) {
        clone.querySelectorAll('a').forEach((a) => {
            const span = document.createElement('span')
            span.textContent = a.textContent
            a.parentNode?.replaceChild(span, a)
        })
    }

    // Add necessary styles
    const styles = document.createElement('style')
    styles.textContent = `
    body { margin: 0; padding: 0; }
    * { box-sizing: border-box; }
    @media print {
      @page { margin: 0; }
      body { margin: 1cm; }
    }
  `
    clone.insertBefore(styles, clone.firstChild)

    return clone.outerHTML
}

export async function exportToPlainText(
    element: HTMLElement
): Promise<string> {
    const clone = element.cloneNode(true) as HTMLElement

    // Remove all links but keep their text
    clone.querySelectorAll('a').forEach((a) => {
        const span = document.createElement('span')
        span.textContent = a.textContent
        a.parentNode?.replaceChild(span, a)
    })

    // Convert HTML to plain text while preserving structure
    const text = clone.innerText
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line)
        .join('\n\n')

    return text
}

export async function downloadFile(
    data: Blob | string,
    fileName: string,
    type: string
): Promise<void> {
    try {
        console.log('Starting file download process...')
        // Show save dialog to get the file path
        const filePath = await save({
            defaultPath: fileName,
            filters: [{
                name: type.split('/')[1].toUpperCase(),
                extensions: [fileName.split('.').pop() || '']
            }]
        })
        console.log('Save dialog path:', filePath)

        if (!filePath) {
            console.log('User cancelled the save dialog')
            return
        }

        // Convert data to Uint8Array
        let uint8Array: Uint8Array
        if (data instanceof Blob) {
            uint8Array = new Uint8Array(await data.arrayBuffer())
        } else {
            uint8Array = new TextEncoder().encode(data)
        }
        console.log('Data converted to Uint8Array, length:', uint8Array.length)

        // Write the file using Tauri's plugin-fs API
        console.log('Writing file to:', filePath)
        await writeFile(filePath, uint8Array)
        console.log('File written successfully')
    } catch (error) {
        console.error('Failed to save file:', error)
        throw error
    }
} 