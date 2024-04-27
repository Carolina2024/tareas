// ARRAY CON 3 TAREAS
let tareas = [
  {
    id: 1,
    nombre: 'Hacer mercado',
    completado: false // comenzar por false
  },
  {
    id: 2,
    nombre: 'Estudiar para la prueba',
    completado: false
  },
  {
    id: 3,
    nombre: 'Sacar a pasear a Tobby',
    completado: false
  }
];


// AGREGAR TAREA
function agregarTarea() { // funcion para agregar tarea
  const tareaInput = document.getElementById("ingresoTarea"); // se selecciona el id
  const tareaDetalle = tareaInput.value; // se obtiene el valor del input
  if (tareaDetalle !== "") { // si el valor es distinto de vacio
    const nuevaTarea = { // se crea un nuevo objeto y se agrega al array
      id: tareas.length + 1, // id de la nueva tarea con la longitud actual mas 1
      nombre: tareaDetalle, // descripcion de la nueva  tarea con el valor del input
      completado: false, // al inicio la nueva tarea no esta completada
    };
    tareas.push(nuevaTarea); // se agrega la nueva tarea al array con metodo push, se agrea al final
    tareaInput.value = ""; // se limpia el input
    actualizarTareas(); // se llama a esta funcion para actualizar con la nueva tarea
  }
}


// EVENTO CLICK DEL BOTON Y ESTADO DE LA TAREA
document.querySelector("#btnAgregar").addEventListener("click", agregarTarea); // selecciona el id del boton y al hacer click se llama a la funcion
function tareaEstado(tareaId) { // funcion para cambiar el estado de completado al marcar, con el parametro tareaId
  const tarea = tareas.find(tarea => tarea.id === tareaId); // busca la tarea por su id
  tarea.completado = !tarea.completado; // y cambia el estado de completado de la tarea true false
  actualizarTareas(); // para actualizar despues de cambiar el estado de la tarea
}


//ACTUALIZAR TAREAS
function actualizarTareas() { // funcion con lista actualizada de tareas
  const listadeTareas = document.getElementById("tareaLista"); // selecciona el id
  const totalTareas = document.getElementById("contar") // selecciona el id
  const completadaTareas = document.getElementById("realizadas"); // selecciona el id
  totalTareas.textContent = tareas.length; // actualiza el contenido de contar  con la longitud del array
  completadaTareas.textContent = tareas.filter(tarea => tarea.completado).length; // actualiza el contenido de tareas completadas con el filter
  const table = document.createElement("table"); // se crea tabla
  const tbody = document.createElement("tbody"); // se crea tbody para las filas de la tabla
  const crearFila = document.createElement("tr"); // crea fila
  crearFila.innerHTML = `
  <th>ID</th>
  <th>Tarea</th>
  <th></th>
  <th></th>
  `;
  tbody.appendChild(crearFila); // agrega la fila de encabezado al cuerpo de la tabla

    tareas.forEach(tarea => { //recorre el array
      const row = document.createElement("tr"); //crea tr fila de la tabla
      row.innerHTML = `
      <td>${tarea.id}</td>
      <td class="d ${tarea.completado ? 'compl' : ''}">${tarea.nombre}</td>
      <td><input type="checkbox" ${tarea.completado ? 'checked' : ''} onchange="tareaEstado(${tarea.id})"</td>
      <td><button class="borrar" style="border:none;background-color: rgb(229, 223, 223);" onclick="borrarTarea(${tarea.id})"><i class="fa-solid fa-trash-can" style="color:red;"></i></button></td>
      `;
      tbody.appendChild(row); //agrega la fila al cuerpo de la tabla
    });

  table.appendChild(tbody); // agrega el cuerpo de la tabla a la tabla
  listadeTareas.innerHTML = ""; // limpia
  listadeTareas.appendChild(table); // agrega la tabla a la lista de tareas, con lista actualizada
}

//BORRAR TAREAS
function borrarTarea(id) { // funcion para eliminar tareas del array, con un parametro
  const index = tareas.findIndex(a => a.id == id);
  tareas.splice(index, 1);
  actualizarTareas(); // para actualizar despues de eliminar
}

actualizarTareas(); // para actualizar las tareas


