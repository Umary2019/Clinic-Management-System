import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportPatientReportPDF = (patient, records = []) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Patient Clinical Report', 14, 16);

  doc.setFontSize(11);
  doc.text(`Name: ${patient.name}`, 14, 28);
  doc.text(`Phone: ${patient.phone}`, 14, 34);
  doc.text(`Age/Gender: ${patient.age} / ${patient.gender}`, 14, 40);
  doc.text(`Address: ${patient.address}`, 14, 46);

  autoTable(doc, {
    startY: 54,
    head: [['Date', 'Doctor', 'Diagnosis', 'Notes']],
    body: records.map((record) => [
      new Date(record.createdAt).toLocaleDateString(),
      record.doctorId?.name || 'N/A',
      record.diagnosis,
      record.notes || '-',
    ]),
    styles: { fontSize: 9 },
    headStyles: { fillColor: [15, 118, 110] },
  });

  doc.save(`${patient.name.replace(/\s+/g, '_').toLowerCase()}_report.pdf`);
};
