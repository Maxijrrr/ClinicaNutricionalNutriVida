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

    // 4. Activar el botón correspondiente
    event.currentTarget.classList.add('activo');
}

// Horarios oficiales según el nutricionista
const horariosNutricionistas = {
    carolina: { inicio: "09:00", fin: "17:00" }, // 09:00 a 17:00
    rodrigo:  { inicio: "09:00", fin: "14:00" }, // 09:00 a 14:00
    daniela:  { inicio: "08:00", fin: "13:00" }, // 08:00 a 13:00
    felipe:   { inicio: "14:00", fin: "19:00" }  // 14:00 a 19:00
};

document.addEventListener('DOMContentLoaded', () => {
    const nutSelect = document.getElementById('nutricionista');
    const horaSelect = document.getElementById('hora');

    if (nutSelect && horaSelect) {
        nutSelect.addEventListener('change', () => {
            const nutElegido = nutSelect.value;
            
            // Limpiar opciones previas
            horaSelect.innerHTML = '';

            if (!nutElegido || !horariosNutricionistas[nutElegido]) {
                horaSelect.disabled = true;
                horaSelect.innerHTML = '<option value="" disabled selected>-- Primero selecciona un nutricionista --</option>';
                return;
            }

            // Cargar únicamente las horas de atención de ese nutricionista
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

    // Generador de intervalos de 30 minutos entre la hora de inicio y fin
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
});
const mensajeEstado = document.getElementById('mensajeEstado');

// En lugar de alert():
if (mensajeEstado) {
    mensajeEstado.textContent = "¡Cita registrada con éxito!";
    mensajeEstado.className = "mensaje-estado exito";

    // Ocultar el mensaje automáticamente después de 4 segundos
    setTimeout(() => {
        mensajeEstado.style.display = 'none';
    }, 4000);
}
