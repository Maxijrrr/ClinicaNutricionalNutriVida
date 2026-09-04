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