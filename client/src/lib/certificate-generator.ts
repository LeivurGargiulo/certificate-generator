import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export interface CertificateData {
  studentName: string;
  courseName: string;
  commission: string;
  completionDate: string;
  discordHandle?: string;
  personalMessage?: string;
  pronouns?: string;
  certificateId: string;
}

export const generateCertificatePDF = async (
  element: HTMLElement,
  filename: string = "certificado.pdf"
): Promise<Blob> => {
  try {
    // Generate canvas from HTML element
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      width: 800,
      height: 600,
    });

    // Create PDF
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [800, 600],
    });

    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 0, 0, 800, 600);

    // Return blob instead of downloading directly
    return pdf.output("blob");
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate certificate PDF");
  }
};

export const downloadPDF = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const generateCertificateId = (): string => {
  const timestamp = Date.now();
  const year = new Date().getFullYear();
  return `CERT-${year}-${String(timestamp).slice(-6)}`;
};
