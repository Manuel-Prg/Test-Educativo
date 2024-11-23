document.addEventListener("DOMContentLoaded", function() {
    const inputFields = document.querySelectorAll(".score-input");
    const numEstudiantes = document.getElementById("numEstudiantes");
    const totalResults = document.getElementById("totalResultados");
    const generalScore = document.getElementById("puntajeGeneral");

    const puntajeGeneral = parseInt(localStorage.getItem('puntajeGeneral'), 10) || 0;
    const puntajeGeneralResultado = document.getElementById('puntajeGeneralResultado');
    const categoriaGrupo = document.getElementById('categoriaGrupo');
    const categoryBoxes = document.querySelectorAll('.category-box');

    if (puntajeGeneralResultado) {
        puntajeGeneralResultado.textContent = puntajeGeneral;
    }

    if (categoriaGrupo) {
        let categoria = '';
        if (puntajeGeneral <= 5) {
            categoria = 'Muy bajo';
        } else if (puntajeGeneral <= 10) {
            categoria = 'Bajo';
        } else if (puntajeGeneral <= 15) {
            categoria = 'Medio';
        } else {
            categoria = 'Alto';
        }
        categoriaGrupo.textContent = categoria;
    }

    categoryBoxes.forEach(box => {
        box.classList.remove('active');
        if ((puntajeGeneral <= 5 && box.id === 'muyBajo') ||
            (puntajeGeneral > 5 && puntajeGeneral <= 10 && box.id === 'bajo') ||
            (puntajeGeneral > 10 && puntajeGeneral <= 15 && box.id === 'medio') ||
            (puntajeGeneral > 15 && box.id === 'alto')) {
            box.classList.add('active');
        }
    });

    // Retrieve values from localStorage if they exist
    if (localStorage.getItem('numEstudiantes')) {
        numEstudiantes.value = localStorage.getItem('numEstudiantes');
    }

    inputFields.forEach(field => {
        if (localStorage.getItem(field.id)) {
            field.value = localStorage.getItem(field.id);
        }
        field.addEventListener('input', updateScores);
    });

    numEstudiantes.addEventListener('input', function() {
        localStorage.setItem('numEstudiantes', numEstudiantes.value);
    });

    function updateScores() {
        let sum = 0;
        inputFields.forEach(field => {
            let value = parseInt(field.value, 10) || 0;
            sum += value;
            localStorage.setItem(field.id, field.value);
        });
        totalResults.value = sum;
        generalScore.value = Math.min(Math.floor(sum / 100), 20);

        localStorage.setItem('totalResultados', sum);
        localStorage.setItem('puntajeGeneral', generalScore.value);
    }

    // Run updateScores on load to ensure values are up to date
    updateScores();
});

document.addEventListener("DOMContentLoaded", function() {
    const numEstudiantes = parseInt(localStorage.getItem('numEstudiantes'), 10) || 1;  // Default to 1 if not set
    const estilosAprendizaje = parseInt(localStorage.getItem('estilosAprendizaje'), 10) || 0;
    const nivelConciencia = parseInt(localStorage.getItem('nivelConciencia'), 10) || 0;
    const temperamento = parseInt(localStorage.getItem('temperamento'), 10) || 0;
    const estilosPensamiento = parseInt(localStorage.getItem('estilosPensamiento'), 10) || 0;
    const resiliencia = parseInt(localStorage.getItem('resiliencia'), 10) || 0;

    // Calculate averages
    const promedioEstilosAprendizaje = Math.floor(estilosAprendizaje / numEstudiantes);
    const promedioNivelConciencia = Math.floor(nivelConciencia / numEstudiantes);
    const promedioTemperamento = Math.floor(temperamento / numEstudiantes);
    const promedioEstilosPensamiento = Math.floor(estilosPensamiento / numEstudiantes);
    const promedioResiliencia = Math.floor(resiliencia / numEstudiantes);

    // Calculate group average
    const promedioGrupo = Math.floor((promedioEstilosAprendizaje + promedioNivelConciencia + promedioTemperamento + promedioEstilosPensamiento + promedioResiliencia) / 5);

    // Update the page with calculated results
    document.getElementById("estilosAprendizajeResultado").textContent = `Estilos de aprendizaje: ${estilosAprendizaje} / (${numEstudiantes}) = ${promedioEstilosAprendizaje}`;
    document.getElementById("nivelConcienciaResultado").textContent = `Nivel de conciencia: ${nivelConciencia} / (${numEstudiantes}) = ${promedioNivelConciencia}`;
    document.getElementById("temperamentoResultado").textContent = `Temperamento: ${temperamento} / (${numEstudiantes}) = ${promedioTemperamento}`;
    document.getElementById("estilosPensamientoResultado").textContent = `Estilos de pensamiento: ${estilosPensamiento} / (${numEstudiantes}) = ${promedioEstilosPensamiento}`;
    document.getElementById("resilienciaResultado").textContent = `Resiliencia académica: ${resiliencia} / (${numEstudiantes}) = ${promedioResiliencia}`;
    document.getElementById("promedioGrupo").textContent = `Promedio del grupo: ${promedioGrupo}`;
});

document.addEventListener("DOMContentLoaded", function() {
    const puntajeGeneral = parseInt(localStorage.getItem('puntajeGeneral'), 10) || 0;  
    const interpretacionesContainer = document.getElementById('interpretacionesContainer');

    // Diccionario con las interpretaciones para cada categoría
    const interpretaciones = {
        estilosAprendizaje: {
            muyBajo: 'Muy Bajo (1-5): Los alumnos del grupo tienen estilos de aprendizaje muy limitados. Es posible que tengan dificultades para adaptarse a diferentes métodos de enseñanza.\nRecomendaciones:\n- Asistir a tutorías grupales o individuales para reforzar la comprensión.',
            bajo: 'Bajo (6-10): Los alumnos del grupo tienen estilos de aprendizaje bajos. Es probable que prefieran un tipo específico de aprendizaje como visual o auditivo.\nRecomendaciones:\n- Identificar los estilos de aprendizaje predominantes y ofrecer recursos acordes.',
            medio: 'Medio (11-15): El grupo tiene un estilo de aprendizaje promedio, lo que significa que se adaptan relativamente bien a diferentes estrategias de enseñanza.\nRecomendaciones:\n- Continuar utilizando diversas estrategias pedagógicas para mantener el interés de los alumnos.',
            alto: 'Alto (16-20): Los alumnos muestran un estilo de aprendizaje altamente desarrollado. Son capaces de adaptarse a diversos métodos y materiales de enseñanza.\nRecomendaciones:\n- Proporcionarles tareas más desafiantes y con mayor autonomía.'
        },
        nivelConciencia: {
            muyBajo: 'Muy Bajo (1-5): Los alumnos tienen un nivel de conciencia muy bajo lo que indica una baja capacidad de autoconocimiento.\nRecomendaciones: \n- Realizar ejercicios de autoevaluación y reflexión grupal para mejorar la comprensión personal.',
            bajo: 'Bajo (6-10): Los alumnos muestran un nivel de conciencia bajo lo que sugiere que aún necesitan desarrollar habilidades de introspección.\nRecomendaciones:\n- Introducir actividades de discusión grupal donde puedan compartir reflexiones.',
            medio: 'Medio (11-15): El grupo tiene un nivel de conciencia moderado con un buen nivel de autoconocimiento pero con áreas que pueden mejorarse.\nRecomendaciones:\n- Fomentar la reflexión continua en diversas actividades para mantener el crecimiento personal.',
            alto: 'Alto (16-20): Los alumnos poseen un nivel de conciencia elevado con una excelente capacidad para la introspección.\nRecomendaciones:\n- Incentivarles a ayudar a otros alumnos a desarrollar estas habilidades.'
        },
        temperamento: {
            muyBajo: 'Muy Bajo (1-5): Los alumnos tienen un temperamento muy bajo, lo que indica baja capacidad para gestionar emociones.\nRecomendaciones:\n- Implementar talleres de manejo del estrés.',
            bajo: 'Bajo (6-10): Los estudiantes del grupo tienen un temperamento bajo, lo que sugiere dificultades para manejar cambios o situaciones de alta presión.\nRecomendaciones:\n- Fomentar actividades que les ayuden a desarrollar resiliencia.',
            medio: 'Medio (11-15): Los alumnos tienen un temperamento equilibrado y pueden gestionar adecuadamente situaciones de estrés.\nRecomendaciones:\n- Ofrecer más oportunidades para enfrentar situaciones desafiantes.',
            alto: 'Alto (16-20): Los alumnos tienen un temperamento alto, lo que refleja una gran capacidad para gestionar emociones.\nRecomendaciones:\n- Asignarles roles en los que puedan ayudar a otros a gestionar sus emociones.'
        },
        estilosPensamiento: {
            muyBajo: 'Muy Bajo (1-5): El grupo presenta un estilo de pensamiento muy limitado, lo que indica una tendencia a ser poco flexible.\nRecomendaciones:\n- Realizar actividades que fomenten la creatividad.',
            bajo: 'Bajo (6-10): Los alumnos tienen un estilo de pensamiento bajo, lo que sugiere que tienden a pensar de manera rígida.\nRecomendaciones:\n- Fomentar la práctica de actividades que les obliguen a salir de su zona de confort intelectual.',
            medio: 'Medio (11-15): Los alumnos tienen un estilo de pensamiento moderado, con cierta capacidad para el pensamiento crítico.\nRecomendaciones:\n- Realizar ejercicios de resolución de problemas en equipo.',
            alto: 'Alto (16-20): Los alumnos presentan un estilo de pensamiento avanzado con una gran capacidad para el análisis y la creatividad.\nRecomendaciones:\n- Proponer retos intelectuales que les exijan pensar de manera innovadora.'
        },
        resiliencia: {
            muyBajo: 'Muy Bajo (1-5): Los estudiantes muestran una resiliencia académica muy baja.\nRecomendaciones:\n- Realizar talleres de desarrollo de habilidades de afrontamiento.',
            bajo: 'Bajo (6-10): El grupo tiene una resiliencia académica baja.\nRecomendaciones:\n- Integrar programas de mentoría y apoyo académico.',
            medio: 'Medio (11-15): Los estudiantes tienen una resiliencia académica moderada.\nRecomendaciones:\n- Fomentar la autoconfianza mediante la realización de proyectos exitosos en equipo.',
            alto: 'Alto (16-20): Los alumnos tienen una resiliencia académica alta.\nRecomendaciones:\n- Asignarles tareas desafiantes para que sigan desarrollando su capacidad de afrontamiento.'
        }
    };

    // Función para determinar la categoría del grupo según el puntaje general
    const puntajeToCategoria = (puntaje) => {
        if (puntaje <= 5) return 'muyBajo';
        if (puntaje <= 10) return 'bajo';
        if (puntaje <= 15) return 'medio';
        return 'alto';
    };

    // Determinar la categoría del grupo basada en el puntaje general
    const categoriaGrupo = puntajeToCategoria(puntajeGeneral);

    // Generar las interpretaciones para cada área basada en la categoría del grupo
    let resultadoInterpretaciones = `
        <p><strong>Estilos de aprendizaje:</strong> ${interpretaciones.estilosAprendizaje[categoriaGrupo]}</p>
        <p><strong>Nivel de conciencia:</strong> ${interpretaciones.nivelConciencia[categoriaGrupo]}</p>
        <p><strong>Temperamento:</strong> ${interpretaciones.temperamento[categoriaGrupo]}</p>
        <p><strong>Estilos de pensamiento:</strong> ${interpretaciones.estilosPensamiento[categoriaGrupo]}</p>
        <p><strong>Resiliencia académica:</strong> ${interpretaciones.resiliencia[categoriaGrupo]}</p>
    `;

    // Inserta las interpretaciones en el contenedor de interpretaciones
    interpretacionesContainer.innerHTML = resultadoInterpretaciones;
});
