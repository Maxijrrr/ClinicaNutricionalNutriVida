// --- GESTIÓN DE PESTAÑAS (SERVICIOS) ---
function cambiarCategoria(categoria) {
    // 1. Ocultar todos los paneles
    const paneles = document.querySelectorAll('.panel-categoria');
    paneles.forEach(panel => panel.classList.remove('activo'));

    // 2. Desactivar todos los botones
    const botones = document.querySelectorAll('.tab-btn');
    botones.forEach(btn => btn.classList.remove('activo'));

    // 3. Mostrar el panel seleccionado
    const panelSeleccionado = document.getElementById(`panel-${categoria}`);
    if (panelSeleccionado) {
        panelSeleccionado.classList.add('activo');
    }

    // 4. Activar el botón presionado
    if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('activo');
    }
}

// Horarios oficiales según la jornada de cada especialista
const horariosNutricionistas = {
    carolina: { inicio: "09:00", fin: "17:00" },
    rodrigo:  { inicio: "09:00", fin: "14:00" },
    daniela:  { inicio: "08:00", fin: "13:00" },
    felipe:   { inicio: "14:00", fin: "19:00" }
};

document.addEventListener('DOMContentLoaded', () => {
    const nutSelect = document.getElementById('nutricionista');
    const horaSelect = document.getElementById('hora');
    const formCita = document.getElementById('formCita');
    const mensajeEstado = document.getElementById('mensajeEstado');
    const fechaInput = document.getElementById('fecha');

    // --- FILTRADO DINÁMICO DE HORAS ---
    if (fechaInput) {
        fechaInput.min = new Date().toISOString().split('T')[0];
    }

    if (nutSelect && horaSelect) {
        nutSelect.addEventListener('change', () => {
            const nutElegido = nutSelect.value;
            horaSelect.innerHTML = '';

            if (!nutElegido || !horariosNutricionistas[nutElegido]) {
                horaSelect.disabled = true;
                horaSelect.innerHTML = '<option value="" disabled selected>-- Primero selecciona un nutricionista --</option>';
                return;
            }

            const { inicio, fin } = horariosNutricionistas[nutElegido];
            const bloques = generarBloquesHorarios(inicio, fin);

            horaSelect.disabled = false;
            horaSelect.innerHTML = '<option value="" disabled selected>-- Selecciona una hora --</option>';

            bloques.forEach(hora => {
                const option = document.createElement('option');
                option.value = hora;
                option.textContent = `${hora} hrs`;
                horaSelect.appendChild(option);
            });
        });
    }

    // Generador de intervalos de 30 minutos
    function generarBloquesHorarios(inicio, fin) {
        const bloques = [];
        let [hora, min] = inicio.split(':').map(Number);
        const [finHora, finMin] = fin.split(':').map(Number);

        while (hora < finHora || (hora === finHora && min < finMin)) {
            const hStr = hora.toString().padStart(2, '0');
            const mStr = min.toString().padStart(2, '0');
            bloques.push(`${hStr}:${mStr}`);

            min += 30;
            if (min >= 60) {
                min = 0;
                hora += 1;
            }
        }
        return bloques;
    }

    // --- MANEJO DEL ENVÍO DEL FORMULARIO ---
    if (formCita && mensajeEstado) {
        formCita.addEventListener('submit', (e) => {
            e.preventDefault();

            // VALIDACIÓN: No permitir horas pasadas si la cita es para hoy
            const hoy = new Date().toISOString().split('T')[0];
            const ahora = new Date();
            const horaActual = `${String(ahora.getHours()).padStart(2, '0')}:${String(ahora.getMinutes()).padStart(2, '0')}`;

            if (fechaInput && horaSelect && fechaInput.value === hoy && horaSelect.value <= horaActual) {
                mensajeEstado.textContent = "No puedes agendar una hora que ya pasó. Por favor, selecciona un horario válido.";
                mensajeEstado.className = "mensaje-estado error";
                mensajeEstado.style.display = 'block';

                setTimeout(() => {
                    mensajeEstado.style.display = 'none';
                }, 4000);
                return;
            }

            // Mostrar mensaje de confirmación
            mensajeEstado.textContent = "¡Solicitud registrada con éxito! Secretaría confirmará tu hora a la brevedad.";
            mensajeEstado.className = "mensaje-estado exito";
            mensajeEstado.style.display = 'block';

            // Limpiar formulario y resetear selector de horas
            formCita.reset();
            horaSelect.disabled = true;
            horaSelect.innerHTML = '<option value="" disabled selected>-- Primero selecciona un nutricionista --</option>';

            // Ocultar mensaje tras 4 segundos
            setTimeout(() => {
                mensajeEstado.style.display = 'none';
            }, 4000);
        });
    }

    // INICIALIZACIÓN DEL MAPA INTERACTIVO (Leaflet)
    const contenedorMapa = document.getElementById('mapa');
    if (contenedorMapa) {
        // Coordenadas exactas: Av. Alemania 0281, Temuco
        const latClinica = -38.7353;
        const lonClinica = -72.6057;

        // Crear mapa centrado con nivel de zoom 16
        const mapa = L.map('mapa').setView([latClinica, lonClinica], 16);

        // Capa de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapa);

        // Marcador con popup informativo
        L.marker([latClinica, lonClinica]).addTo(mapa)
            .bindPopup('<strong>Clínica Nutricional NutriVida</strong><br>Av. Alemania 0450, Of. 302, Temuco<br>Región de La Araucanía')
            .openPopup();
    }
});
