// Funcion para guardar la cita en el localStorage
function guardarCita(cita) 
{
    const citasGuardadas = JSON.parse(localStorage.getItem('citas') || '[]');
    citasGuardadas.push(cita);
    localStorage.setItem('citas', JSON.stringify(citasGuardadas));
    mostrarMensajeExito();
    mostrarCitas(); // llamamos a mostrar citas despues de guardar
}

// Funcion para obtener todas las citas guardadas 
function obtenerCitas() 
{
    return JSON.parse(localStorage.getItem('citas') || '[]');
}

// Funcion para mostrar un mensaje de exito
function mostrarMensajeExito() 
{
    document.getElementById('mensaje-exito').innerHTML = '<p>Cita guardada exitosamente!</p>';
}

// Funcion para validar el formulario
function validarFormulario() 
{
    const nombre = document.getElementById('nombre');
    const apellidos = document.getElementById('apellidos');
    const fecha = document.getElementById('fecha');
    const hora = document.getElementById('hora');

    let isValid = true;

    if (!nombre.value.trim())
    {
        showError(nombre, 'Este campo es obligatorio.');
        isValid = false;
    } else {
        hideError(nombre);
    }

    if (!apellidos.value.trim())
    {
        showError(apellidos, 'Este campo es obligatorio.');
        isValid = false;
    } else {
        hideError(apellidos);
    }

    if (!fecha.value)
    {
        showError(fecha, 'Por favor, elija una fecha valida.');
        isValid = false;
    } else {
        hideError(fecha)
    }

    if (!hora.value) 
    {
        showError(hora, 'Por favor, elige una hora válida');
        isValid = false;
    } else {
        hideError(hora)
    }

    return isValid;
}

function showError(input, message)
{
    const formControl = input.parentElement;
    const error = formControl.querySelector('.error');
    error.textContent = message;
}

function hideError(input)
{
    const formControl = input.parentElement;
    const error = formControl.querySelector('.error');
    error.textContent = '';
}

// Event listener para el formulario de agendar citas
document.getElementById('formulario-agendar').addEventListener('submit', function(e){
    e.preventDefault();

    const cita = {
        nombre: this.nombre.value,
        apellidos: this.apellidos.value,
        fecha: this.fecha.value,
        hora: this.hora.value
    };

    guardarCita(cita);
    this.reset(); // resetea el formulario
    mostrarMensajeExito();
});

// Funcion para mostrar las citas existentes
function mostrarCitas() 
{
    const citas = obtenerCitas();
    let contenido = '';

    if (citas.length > 0)
    {
        const listaCitas = document.createElement('ul');
        citas.forEach((cita, index) => {
            const seccion = document.createElement('div');
            seccion.className = 'seccion-cita';
            seccion.innerHTML = `
                <h3>Cita ${index + 1}</h3>
                <p><strong>Nombre:</strong> ${cita.nombre} ${cita.apellidos}</p>
                <p><strong>Fecha:</strong> ${cita.fecha}</p>
                <p><strong>Hora:</strong> ${cita.hora}</p>
                <button class="alta-cita">Dar de alta</button>
            `;
            contenido += seccion.outerHTML;
        });
    } else {
        contenido = '<h1>Consultar Citas</h1><p>No hay citas registradas.</p>';
    }
    document.getElementById('agendar').style.display = ''; // Siempre muestra el contenedor
    document.getElementById('consultar').innerHTML = contenido;
}

// Funcion para dar de alta una cita individual
function darDeAlta(index) 
{
    const citas = obtenerCitas();
    citas.splice(index, 1);
    localStorage.setItem('citas', JSON.stringify(citas));
    mostrarCitas();
}

// Event listener para los botones de alta de cita
document.addEventListener('click', function(e){
    if (e.target.classList.contains('alta-cita'))
    {
        const citaIndex = Array.from(document.querySelectorAll('.seccion-cita')).indexOf(e.target.closest('.seccion-cita'));
        darDeAlta(citaIndex);
    }
});

// Event listener para el boton de consultar citas
document.addEventListener('DOMContentLoaded', function() {
    const consultarBoton = document.querySelector('#agendar button');
    consultarBoton.addEventListener('click', mostrarCitas);

    // Mostramos las citas automaticamente al cargar la pagina
    mostrarCitas();
});

// Funcion para resetear las citas automaticamente
function resetarCitas() 
{
    localStorage.removeItem('citas');
    mostrarCitas();
    alert("Las citas han sido reseteadas.");
}

// Event listener para el boton de reseteo
document.getElementById('resetearCitas').onclick = function() {
    resetarCitas();
}