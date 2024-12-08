declare module 'html2pdf.js' {
    interface Html2PdfOptions {
        margin?: number;
        filename?: string;
        image?: { type: string; quality: number };
        html2canvas?: {
            scale?: number;
            useCORS?: boolean;
            logging?: boolean;
            allowTaint?: boolean;
            backgroundColor?: string;
        };
        jsPDF?: {
            unit?: string;
            format?: string;
            orientation?: string;
            compress?: boolean;
        };
        pagebreak?: {
            mode?: string[];
            before?: string[];
            after?: string[];
            avoid?: string[];
        };
    }

    interface Html2Pdf {
        set(options: Html2PdfOptions): Html2Pdf;
        from(element: HTMLElement): Html2Pdf;
        output(type: string): Promise<Blob>;
    }

    function html2pdf(): Html2Pdf;
    export default html2pdf;
} 