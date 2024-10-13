// Obtener y mostrar foros
async function fetchForos() {
  const response = await fetch('http://localhost:5000/api/foros');
  const foros = await response.json();
  const forosContainer = document.getElementById('foros');
  forosContainer.innerHTML = '';

  foros.forEach(foro => {
      const foroDiv = document.createElement('div');
      foroDiv.classList.add('foro-publicacion');
      foroDiv.innerHTML = `
          <strong>${foro.nombre}</strong> (${foro.correo}) - ${foro.tematica}:
          <p>${foro.mensaje}</p>
          <img src="${foro.imagenURL}" alt="Imagen del foro" style="max-width: 100%; height: auto;">
          <em>${new Date(foro.fecha).toLocaleString()}</em>
      `;
      forosContainer.appendChild(foroDiv);
  });
}

// Crear nuevo foro
async function crearForo(event) {
  event.preventDefault();
  const form = event.target;
  const nombre = form.nombre.value;
  const correo = form.correo.value;
  const tematica = form.tematica.value;
  const mensaje = form.mensaje.value;
  const imagenURL = form.imagenURL.value;

  await fetch('http://localhost:5000/api/foros', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, correo, tematica, mensaje, imagenURL })
  });

  form.reset();
  fetchForos();
}

// Obtener y mostrar gastos
async function fetchGastos() {
  const response = await fetch('http://localhost:5000/api/gastos');
  const gastos = await response.json();
  const gastosContainer = document.getElementById('gastosLista');
  const totalGastosElement = document.getElementById('totalGastos');
  gastosContainer.innerHTML = '';

  let totalGastado = 0;

  gastos.forEach(gasto => {
      const gastoDiv = document.createElement('tr');
      gastoDiv.innerHTML = `
          <td>${gasto.nombreGasto}</td>
          <td>${new Date(gasto.fechaGasto).toLocaleDateString()}</td>
          <td>${gasto.cantidad}</td>
          <td>${gasto.totalGastado}</td>
          <td><button onclick="eliminarGasto('${gasto._id}')">Eliminar</button></td>
      `;
      gastosContainer.appendChild(gastoDiv);

      // Sumar al total gastado
      totalGastado += parseFloat(gasto.totalGastado);
  });

  totalGastosElement.innerText = `Total Gastado: $${totalGastado}`;
}

// Agregar gasto
async function agregarGasto(event) {
  event.preventDefault();
  const form = event.target;
  const nombreGasto = form.nombreGasto.value;
  const fechaGasto = form.fechaGasto.value;
  const cantidad = form.cantidad.value;
  const totalGastado = form.totalGastado.value;

  await fetch('http://localhost:5000/api/gastos', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombreGasto, fechaGasto, cantidad, totalGastado })
  });

  form.reset();
  fetchGastos();
}

// Función para eliminar gasto
async function eliminarGasto(id) {
  try {
      const response = await fetch(`http://localhost:5000/api/gastos/${id}`, {
          method: 'DELETE',
      });

      if (!response.ok) {
          throw new Error('Error al eliminar el gasto');
      }

      fetchGastos(); // Vuelve a cargar los gastos después de eliminar
  } catch (error) {
      console.error(error);
      alert('No se pudo eliminar el gasto.'); // Alerta de error
  }
}

// Obtener y mostrar comentarios
async function fetchComentarios() {
  const response = await fetch('http://localhost:5000/api/comentarios');
  const comentarios = await response.json();
  const comentariosContainer = document.getElementById('comentarios');
  comentariosContainer.innerHTML = '';

  comentarios.forEach(comentario => {
      const comentarioDiv = document.createElement('div');
      comentarioDiv.classList.add('comentario');
      comentarioDiv.innerHTML = `<strong>${comentario.usuario}</strong> (${comentario.correo}): ${comentario.mensaje} <em>${new Date(comentario.fecha).toLocaleString()}</em>`;
      comentariosContainer.appendChild(comentarioDiv);
  });
}

// Agregar comentario
async function agregarComentario(event) {
  event.preventDefault();
  const form = event.target;
  const usuario = form.usuario.value;
  const correo = form.correo.value;
  const mensaje = form.mensaje.value;

  await fetch('http://localhost:5000/api/comentarios', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ usuario, correo, mensaje })
  });

  form.reset();
  fetchComentarios();
}

// Cargar datos al iniciar
fetchForos();
fetchGastos();
fetchComentarios();
