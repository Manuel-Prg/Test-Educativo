const questions = [
    { category: "Estilos de Aprendizaje", text: "Prefiero aprender a través de gráficos, diagramas y mapas visuales." },
    { category: "Estilos de Aprendizaje", text: "Encuentro más fácil recordar información cuando la escucho en lugar de leerla." },
    { category: "Estilos de Aprendizaje", text: "Me resulta útil tomar notas para recordar mejor lo que he aprendido." },
    { category: "Estilos de Aprendizaje", text: "Me siento más cómodo aprendiendo mediante la práctica y la experimentación directa." },
    { category: "Temperamento", text: "Me considero una persona extrovertida que disfruta estar rodeada de gente." },
    { category: "Temperamento", text: "Tiendo a tomar decisiones rápidamente, basándome en mis instintos." },
    { category: "Temperamento", text: "Prefiero planificar las cosas con antelación y seguir un plan." },
    { category: "Temperamento", text: "Me resulta fácil mantener la calma en situaciones de estrés." },
    { category: "Nivel de Conciencia", text: "Reflexiono frecuentemente sobre mis pensamientos y emociones durante el día." },
    { category: "Nivel de Conciencia", text: "Soy consciente de cómo mis emociones afectan mi comportamiento." },
    { category: "Nivel de Conciencia", text: "Vivo el momento presente, en lugar de preocuparme por el futuro o el pasado." },
    { category: "Nivel de Conciencia", text: "Me resulta fácil desconectar de las distracciones externas para concentrarme en mis estudios." },
    { category: "Estilos de Pensamiento", text: "Prefiero abordar problemas de manera lógica y analítica." },
    { category: "Estilos de Pensamiento", text: "Me considero más creativo e intuitivo que metódico." },
    { category: "Estilos de Pensamiento", text: "Disfruto trabajando en proyectos que implican pensar fuera de lo convencional." },
    { category: "Estilos de Pensamiento", text: "Organizo mi trabajo de manera estructurada y secuencial." },
    { category: "Resiliencia Académica", text: "Me motivo a mejorar después de un fracaso o una mala calificación en un examen." },
    { category: "Resiliencia Académica", text: "Busco apoyo cuando me enfrento a un desafío académico." },
    { category: "Resiliencia Académica", text: "Me recupero rápidamente después de enfrentar un obstáculo en mi aprendizaje." },
    { category: "Resiliencia Académica", text: "Creo que tengo la capacidad de superar cualquier dificultad académica que se me presente." }
];

function generateSurvey() {
    const form = document.getElementById('surveyForm');
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <p><strong>${index + 1}.</strong> ${q.text}</p>
            <div class="btn-group" role="group" aria-label="Opciones de respuesta">
                ${[1, 2, 3, 4, 5].map(value => `
                    <input type="radio" class="btn-check" name="q${index}" id="q${index}_${value}" value="${value}" required>
                    <label class="btn btn-outline-primary" for="q${index}_${value}">${value}</label>
                `).join('')}
            </div>
        `;
        form.appendChild(questionDiv);
    });
}

function submitSurvey() {
    const results = {
        "Estilos de Aprendizaje": [],
        "Temperamento": [],
        "Nivel de Conciencia": [],
        "Estilos de Pensamiento": [],
        "Resiliencia Académica": []
    };

    questions.forEach((q, index) => {
        const selectedAnswer = document.querySelector(`input[name="q${index}"]:checked`);
        if (selectedAnswer) {
            const value = parseInt(selectedAnswer.value);
            results[q.category].push(value);
        }
    });

    localStorage.setItem('surveyResults', JSON.stringify(results));
    window.location.href = '/Test Educativo/Test/resultado.html';
}

function createRadarChart(canvasId, label, scores) {
    const ctx = document.getElementById(canvasId).getContext('2d');

    // Etiquetas y datos que varían según el test
    const labels = label === 'Estilos de Aprendizaje' ? ['Kinestésico', 'Auditivo', 'Visual'] : 
                    label === 'Temperamento' ? ['Extrovertido', 'Planificador', ''] : ['Bajo', 'Moderado', 'Alto'];

    const bajo = scores.filter(score => score <= 2).length;
    const moderado = scores.filter(score => score >= 3 && score <= 4).length;
    const alto = scores.filter(score => score >= 5).length;

    const data = label === 'Temperamento' ? [bajo, moderado] : [bajo, moderado, alto];

    // Colores personalizados según el gráfico
    let backgroundColor, borderColor;

    if (label === 'Estilos de Aprendizaje') {
        backgroundColor = 'rgba(255, 99, 132, 0.2)';  // Rojo claro
        borderColor = 'rgba(255, 99, 132, 1)';        // Rojo fuerte
    } else if (label === 'Temperamento') {
        backgroundColor = 'rgba(54, 162, 235, 0.2)';  // Azul claro
        borderColor = 'rgba(54, 162, 235, 1)';        // Azul fuerte
    } else if (label === 'Nivel de Conciencia') {
        backgroundColor = 'rgba(75, 192, 192, 0.2)';  // Verde claro
        borderColor = 'rgba(75, 192, 192, 1)';        // Verde fuerte
    } else if (label === 'Estilos de Pensamiento') {
        backgroundColor = 'rgba(153, 102, 255, 0.2)'; // Morado claro
        borderColor = 'rgba(153, 102, 255, 1)';       // Morado fuerte
    } else if (label === 'Resiliencia Académica') {
        backgroundColor = 'rgba(255, 206, 86, 0.2)';  // Amarillo claro
        borderColor = 'rgba(255, 206, 86, 1)';        // Amarillo fuerte
    }

    // Crear el gráfico con colores personalizados
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                fill: true,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                pointBackgroundColor: borderColor
            }]
        },
        options: {
            scales: {
                r: {
                    min: 0,
                    max: 5,
                    ticks: {
                        stepSize: 1,
                        font: { size: 15 },
                        backdropColor: 'rgba(255, 255, 255, 0)' // Fondo de los valores en transparente
                    },
                    pointLabels: { font: { size: 15 } }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: label,
                    font: { size: 20 }
                }
            }
        }
    });
}


function displayResults() {
    const results = JSON.parse(localStorage.getItem('surveyResults'));
    if (!results) {
        console.error('No se encontraron resultados en localStorage');
        return;
    }

    const userName = localStorage.getItem('userName');
    if (userName) {
        document.getElementById('userName').textContent = `Resultados para ${userName}`;
    }

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<h2 class="mb-3">Tus resultados:</h2>';

    let totalPoints = 0;

    for (const [category, scores] of Object.entries(results)) {
        const sum = scores.reduce((a, b) => a + b, 0);
        totalPoints += sum;
        resultsDiv.innerHTML += `<p><strong>${category}:</strong> ${scores.join(', ')} = ${sum}</p>`;
    }
    
    
    const promedio = totalPoints / 5;
    resultsDiv.innerHTML += `<p><strong>Total:</strong> ${totalPoints} puntos</p>`;
    resultsDiv.innerHTML += `<p><strong>Promedio (Total/5):</strong> ${promedio.toFixed(2)} puntos</p>`;

    createRadarChart('estilosAprendizajeChart', 'Estilos de Aprendizaje', results['Estilos de Aprendizaje']);
    createRadarChart('temperamentoChart', 'Temperamento', results['Temperamento']);
    createRadarChart('nivelConcienciaChart', 'Nivel de Conciencia', results['Nivel de Conciencia']);
    createRadarChart('estilosPensamientoChart', 'Estilos de Pensamiento', results['Estilos de Pensamiento']);
    createRadarChart('resilienciaAcademicaChart', 'Resiliencia Académica', results['Resiliencia Académica']);

    // Guardar promedio en localStorage
    localStorage.setItem('promedioTotal', promedio.toFixed(2));
}

function displayInterpretations() {
    const promedio = parseFloat(localStorage.getItem('promedioTotal')); // Obtiene el promedio total
    const interpretacionesDiv = document.getElementById('interpretaciones');

    // Limpiar el div antes de agregar contenido
    interpretacionesDiv.innerHTML = '<h3 style="color: black;">Interpretaciones del test:</h3>';

    if (isNaN(promedio)) {
        interpretacionesDiv.innerHTML += `<p>No se encontró el promedio. Intenta de nuevo.</p>`;
        return;
    }

    // Determinar la categoría según el promedio
    let categoryLevel;
    if (promedio <= 5) {
        categoryLevel = 'Muy Bajo';
    } else if (promedio <= 10) {
        categoryLevel = 'Bajo';
    } else if (promedio <= 15) {
        categoryLevel = 'Medio';
    } else {
        categoryLevel = 'Alto';
    }

    // Mostrar cada test con su título y su interpretación correspondiente
    interpretacionesDiv.innerHTML += `<h4 style="color: black;">Estilos de Aprendizaje:</h4>`;
    interpretacionesDiv.innerHTML += obtenerInterpretacion('Estilos de Aprendizaje', categoryLevel);

    interpretacionesDiv.innerHTML += `<h4 style="color: black;">Temperamento:</h4>`;
    interpretacionesDiv.innerHTML += obtenerInterpretacion('Temperamento', categoryLevel);

    interpretacionesDiv.innerHTML += `<h4 style="color: black;">Nivel de Conciencia:</h4>`;
    interpretacionesDiv.innerHTML += obtenerInterpretacion('Nivel de Conciencia', categoryLevel);

    interpretacionesDiv.innerHTML += `<h4 style="color: black;">Estilos de Pensamiento:</h4>`;
    interpretacionesDiv.innerHTML += obtenerInterpretacion('Estilos de Pensamiento', categoryLevel);

    interpretacionesDiv.innerHTML += `<h4 style="color: black;">Resiliencia Académica:</h4>`;
    interpretacionesDiv.innerHTML += obtenerInterpretacion('Resiliencia Académica', categoryLevel);
}


function obtenerInterpretacion(category, categoryLevel) {
    const interpretaciones = {
        'Estilos de Aprendizaje': {
            'Muy Bajo': `
                <p style="color: black;">- Tienes un estilo de aprendizaje muy bajo, lo cual sugiere dificultades importantes en la forma en que procesas y aplicas la información.</p>
                <p style="color: black;">- Soluciones: Considera trabajar con un tutor o utilizar técnicas de estudio más visuales como mapas mentales.</p>`,
            'Bajo': `
                <p style="color: black;">- Tienes un estilo de aprendizaje bajo, lo que indica que puedes estar encontrando dificultades para procesar y retener la información de manera eficiente.</p>
                <p style="color: black;">- Soluciones: Prueba diferentes métodos de estudio como la lectura en voz alta o el uso de tarjetas de memoria.</p>`,
            'Medio': `
                <p style="color: black;">- Tienes un estilo de aprendizaje medio. Puedes aprender eficazmente pero con algunas mejoras podrías optimizar tus resultados.</p>
                <p style="color: black;">- Recomendaciones: Continúa utilizando métodos de aprendizaje que ya te funcionan.</p>`,
            'Alto': `
                <p style="color: black;">- Tienes un estilo de aprendizaje alto. Manejas muy bien la adquisición de conocimientos y la aplicación de conceptos.</p>`
        },
        'Temperamento': {
            'Muy Bajo': `
                <p style="color: black;">- Tu temperamento es muy bajo, lo que podría indicar una tendencia hacia la pasividad.</p>
                <p style="color: black;">- Soluciones: Desarrolla técnicas para identificar y expresar tus emociones.</p>`,
            'Bajo': `
                <p style="color: black;">- Tienes un temperamento bajo, lo que puede sugerir que tiendes a ser reservado o menos expresivo.</p>
                <p style="color: black;">- Soluciones: Trabaja en expresar tus emociones de manera más asertiva.</p>`,
            'Medio': `
                <p style="color: black;">- Tienes un temperamento medio. Manejas tus emociones de manera equilibrada.</p>
                <p style="color: black;">- Recomendaciones: Sigue trabajando en tu autocontrol emocional.</p>`,
            'Alto': `
                <p style="color: black;">- Tienes un temperamento alto. Eres una persona emocionalmente intensa.</p>`
        },
        'Nivel de Conciencia': {
            'Muy Bajo': `
                <p style="color: black;">- Tienes un nivel de conciencia muy bajo, lo que puede significar poca autoconciencia.</p>
                <p style="color: black;">- Soluciones: Practica técnicas de meditación para mejorar tu autoconciencia.</p>`,
            'Bajo': `
                <p style="color: black;">- Tu nivel de conciencia es bajo, lo que puede sugerir dificultades para ser plenamente consciente de tus emociones.</p>
                <p style="color: black;">- Soluciones: Realiza ejercicios de introspección para mejorar tu autoconocimiento.</p>`,
            'Medio': `
                <p style="color: black;">- Tienes un nivel de conciencia medio. Eres consciente de ti mismo pero podrías mejorar.</p>
                <p style="color: black;">- Recomendaciones: Practica la introspección y trata de ser más consciente de tus emociones.</p>`,
            'Alto': `
                <p style="color: black;">- Tienes un nivel de conciencia alto. Eres altamente perceptivo de tus emociones y entorno.</p>`
        },
        'Estilos de Pensamiento': {
            'Muy Bajo': `
                <p style="color: black;">- Tienes un estilo de pensamiento muy bajo, lo que puede indicar rigidez mental o dificultades para generar ideas o soluciones.</p>
                <p style="color: black;">- Soluciones: Practica técnicas de pensamiento creativo como la lluvia de ideas o el pensamiento lateral.</p>`,
            'Bajo': `
                <p style="color: black;">- Tienes un estilo de pensamiento bajo, lo que puede reflejar una tendencia a evitar el pensamiento crítico o creativo.</p>
                <p style="color: black;">- Soluciones: Incorpora más actividades que estimulen la creatividad y el pensamiento crítico.</p>`,
            'Medio': `
                <p style="color: black;">- Tienes un estilo de pensamiento medio. Eres capaz de generar ideas y resolver problemas con eficacia.</p>
                <p style="color: black;">- Recomendaciones: Continúa ejercitando tu capacidad de generar soluciones creativas y busca nuevas maneras de abordar los problemas cotidianos.</p>`,
            'Alto': `
                <p style="color: black;">- Tienes un estilo de pensamiento alto. Eres innovador y creativo en tu forma de abordar problemas, lo cual es una fortaleza en muchas áreas.</p>`
        },
        'Resiliencia Académica': {
            'Muy Bajo': `
                <p style="color: black;">- Tienes una resiliencia académica muy baja, lo que podría indicar dificultades para manejar la adversidad en el ámbito educativo.</p>
                <p style="color: black;">- Soluciones: Trabaja en desarrollar habilidades de afrontamiento, como la planificación y el manejo del tiempo.</p>`,
            'Bajo': `
                <p style="color: black;">- Tienes una resiliencia académica baja, lo que indica que te resulta difícil recuperarte de los fracasos.</p>
                <p style="color: black;">- Soluciones: Implementa estrategias para enfrentar el estrés académico, como organizar mejor tus tareas y practicar técnicas de relajación.</p>`,
            'Medio': `
                <p style="color: black;">- Tienes una resiliencia académica media. Eres capaz de recuperarte de las dificultades.</p>
                <p style="color: black;">- Recomendaciones: Aprovecha los recursos de apoyo académico, como talleres o tutorías, para fortalecer tu resiliencia.</p>`,
            'Alto': `
                <p style="color: black;">- Tienes una resiliencia académica alta. Eres excelente para sobreponerte a los desafíos y seguir adelante con fuerza.</p>`
        }
    };

    return interpretaciones[category][categoryLevel] || `<p style="color: black;">No se encontró la interpretación para esta categoría.</p>`;
}

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('surveyForm')) {
        generateSurvey();
    } else if (document.getElementById('results')) {
        displayResults();
    }
    const results = JSON.parse(localStorage.getItem('surveyResults'));
    if (!results) {
        console.error('No se encontraron resultados en localStorage');
        return;
    }

    const userName = localStorage.getItem('userName');
    if (userName) {
        document.getElementById('userName').textContent = `Resultados para ${userName}`;
    }

    displayResults(results);
    document.getElementById('verInterpretaciones').addEventListener('click', function() {
        displayInterpretations();
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar resultados al cargar la página
    displayResults();

    // Agregar evento al botón para mostrar interpretaciones
    const botonInterpretaciones = document.getElementById('verInterpretaciones');
    botonInterpretaciones.addEventListener('click', function() {
        displayInterpretations();  // Muestra las interpretaciones al hacer clic
    });
});