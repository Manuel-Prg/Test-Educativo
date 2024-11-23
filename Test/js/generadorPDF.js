// Make sure to include the jsPDF library in your HTML file
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

document.addEventListener('DOMContentLoaded', function() {
    const downloadButton = document.getElementById('descargarPDF');
    downloadButton.addEventListener('click', generatePDF);
});

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(20);
    doc.text('Resultados del Test Psicológico', 105, 15, null, null, 'center');

    // Add user name
    const userName = document.getElementById('userName').textContent;
    doc.setFontSize(16);
    doc.text(userName, 105, 25, null, null, 'center');

    // Add charts with better proportions
    const chartIds = [
        'estilosAprendizajeChart',
        'temperamentoChart',
        'nivelConcienciaChart',
        'estilosPensamientoChart',
        'resilienciaAcademicaChart'
    ];

    let yOffset = 40;
    chartIds.forEach((chartId, index) => {
        const canvas = document.getElementById(chartId);
        const imgData = canvas.toDataURL('image/png');
        
        // Si necesitamos una nueva página
        if (index > 0 && index % 2 === 0) {
            doc.addPage();
            yOffset = 20;
        }

        // Ajustado el tamaño para mantener una proporción más cuadrada
        // Cambiado de 180x100 a 160x80 para mejor proporción
        doc.addImage(imgData, 'PNG', 25, yOffset, 160, 80);
        yOffset += 90; // Reducido el espaciado vertical
    });

    // Save the PDF
    doc.save('resultados_test_psicologico.pdf');
}