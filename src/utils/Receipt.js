import { jsPDF } from "jspdf";
import { formatCurrency, formatDate } from "./formatUtils";

export const generateDonationReceipt = async (donation, user) => {
  const doc = new jsPDF();

  // Set document properties
  doc.setProperties({
    title: `Donation Receipt - ${donation._id}`,
    subject: "CozyKindness Donation Receipt",
    author: "CozyKindness Foundation",
  });

  // Try to add logo + watermark
  try {
    const logoUrl = "/logo.png";
    const logoResponse = await fetch(logoUrl);
    const logoBlob = await logoResponse.blob();
    const logoDataUrl = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(logoBlob);
    });

    // Main logo at top
    doc.addImage(logoDataUrl, "PNG", 80, 10, 50, 15);

    // Watermark logo in background
    doc.setGState(new doc.GState({ opacity: 0.05 }));
    doc.addImage(logoDataUrl, "PNG", 30, 50, 150, 150);
    doc.setGState(new doc.GState({ opacity: 1 })); // Reset opacity
  } catch (error) {
    console.error("Error loading logo:", error);
    doc.setFontSize(22);
    doc.setTextColor(40, 53, 147);
    doc.setFont("helvetica", "bold");
    doc.text("COZY KINDNESS", 105, 20, { align: "center" });
  }

  // Receipt header
  doc.setFontSize(20);
  doc.setTextColor(40, 53, 147);
  doc.setFont("helvetica", "bold");
  doc.text("DONATION RECEIPT", 105, 40, { align: "center" });

  // Decorative divider
  doc.setDrawColor(255, 107, 107);
  doc.setLineWidth(1);
  doc.line(50, 45, 160, 45);

  // Receipt metadata
  doc.setFontSize(11);
  doc.setTextColor(100, 100, 100);
  doc.text(`Receipt #: ${donation._id}`, 20, 55);
  doc.text(`Issued: ${new Date().toLocaleDateString()}`, 20, 62);

  // Donor section header
  doc.setFontSize(14);
  doc.setTextColor(40, 53, 147);
  doc.setFont("helvetica", "bold");
  doc.text("DONOR INFORMATION", 20, 80);
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 82, 75, 82);

  // Donor details
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  doc.text("Name: " + user?.displayName || "Anonymous Donor", 25, 95);
  doc.text("Email: " + user?.email || "Email not provided", 25, 105);
  if (donation.phone) {
    doc.text("Phone: " + donation.phone , 25, 115);
  }

  // Donation details box
  doc.setFillColor(237, 247, 237);
  doc.roundedRect(20, 125, 170, 75, 3, 3, "F");

  // Section header
  doc.setFontSize(14);
  doc.setTextColor(40, 53, 147);
  doc.setFont("helvetica", "bold");
  doc.text("DONATION DETAILS", 25, 135);

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  doc.text("Campaign: " + (donation.campaignSlug?.replace(/-/g, " ") || "General Fund"), 25, 145);
  doc.text("Amount: " + formatCurrency(donation.amount) , 25, 155);
  doc.text("Date: " + formatDate(donation.date), 25, 165);
  doc.text("Payment Method: " + (donation.method || "Credit Card"), 25, 175);

  // Thank You Section
  doc.setFillColor(220, 253, 229 );
  doc.roundedRect(20, 205, 170, 25, 3, 3, "F");

  doc.setFontSize(16);
  doc.setTextColor(56, 161, 105);
  doc.setFont("helvetica", "bold");
  doc.text("Thank You!", 105, 215, { align: "center" });

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.setFont("helvetica", "normal");
  doc.text("Your generosity helps provide warmth to families in need", 105, 223, { align: "center" });

  // Footer
  doc.setFillColor(54, 176, 168 );
  doc.rect(0, 240, 220, 50, "F");

  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text("CozyKindness Foundation", 105, 250, { align: "center" });

  doc.setFontSize(8);
  doc.text("123 Shelter Street • Cold City • contact@cozykindness.org", 105, 258, { align: "center" });
  doc.text("Registered 501(c)(3) nonprofit organization • Tax ID: 12-3456789", 105, 266, { align: "center" });

  // Save PDF
  doc.save(`cozykindness-receipt-${donation._id.slice(0, 6)}.pdf`);
};
