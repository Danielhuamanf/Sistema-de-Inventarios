document.addEventListener("DOMContentLoaded", () => {
  // Gráfica 1: Distribución de empleados por departamento
  const ctx1 = document.getElementById("chart-1").getContext("2d");
  const chart1 = new Chart(ctx1, {
      type: "bar",
      data: {
          labels: ["Recursos Humanos", "IT", "Ventas", "Marketing", "Operaciones"],
          datasets: [
              {
                  label: "Número de Empleados",
                  data: [10, 20, 15, 25, 30], // Datos de ejemplo
                  backgroundColor: [
                      "#003366",
                      "#0056b3",
                      "#6699cc",
                      "#336699",
                      "#1a4d8f",
                  ],
              },
          ],
      },
      options: {
          responsive: true,
          plugins: {
              legend: { display: true, position: "top" },
              title: { display: true, text: "Distribución de empleados por departamento" },
          },
      },
  });

  const ctx2 = document.getElementById("chart-2").getContext("2d");
const chart2 = new Chart(ctx2, {
    type: "pie",
    data: {
        labels: ["Funcionales", "En Reparación", "Reemplazo Necesario"],
        datasets: [
            {
                label: "Estado de Equipos",
                data: [75, 15, 10], // Datos de ejemplo
                backgroundColor: ["#1a4d8f", "#336699", "#6699cc"],
            },
        ],
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: true, position: "top" },
            title: { display: true, text: "Estado de Equipos Asignados" },
        },
    },
});


});


// Arreglos con los datos
const nombres = ["Carlos Gómez", "Lucía Pérez", "Andrés Soto"];
const departamentos = ["IT", "Ventas", "Marketing"];
const antiguedades = ["5 años", "2 años", "10 años"];
const estados = ["Activo", "Permiso", "En Proceso"];

// Seleccionar el tbody donde se agregarán las filas
const tbody = document.getElementById("empleados-tbody");

// Generar las filas dinámicamente
for (let i = 0; i < nombres.length; i++) {
    // Crear la fila
    const tr = document.createElement("tr");

    // Crear y llenar las celdas
    const tdNombre = document.createElement("td");
    tdNombre.textContent = nombres[i];

    const tdDepartamento = document.createElement("td");
    tdDepartamento.textContent = departamentos[i];

    const tdAntiguedad = document.createElement("td");
    tdAntiguedad.textContent = antiguedades[i];

    const tdEstado = document.createElement("td");
    tdEstado.textContent = estados[i];
    tdEstado.className = `status ${estados[i].toLowerCase()}`; // Agregar clase dinámica

    // Agregar las celdas a la fila
    tr.appendChild(tdNombre);
    tr.appendChild(tdDepartamento);
    tr.appendChild(tdAntiguedad);
    tr.appendChild(tdEstado);

    // Agregar la fila al tbody
    tbody.appendChild(tr);
}

// Función para generar la tabla completa en el modal
function generarTablaCompleta() {
  const modalTbody = document.querySelector("#modal-empleados-table tbody");
  modalTbody.innerHTML = ""; // Limpiar el contenido previo

  for (let i = 0; i < nombres.length; i++) {
      const tr = document.createElement("tr");

      const tdNombre = document.createElement("td");
      tdNombre.textContent = nombres[i];

      const tdDepartamento = document.createElement("td");
      tdDepartamento.textContent = departamentos[i];

      const tdAntiguedad = document.createElement("td");
      tdAntiguedad.textContent = antiguedades[i];

      const tdEstado = document.createElement("td");
      tdEstado.textContent = estados[i];
      tdEstado.className = `status ${estados[i].toLowerCase()}`; // Clase dinámica

      tr.appendChild(tdNombre);
      tr.appendChild(tdDepartamento);
      tr.appendChild(tdAntiguedad);
      tr.appendChild(tdEstado);

      modalTbody.appendChild(tr);
  }
}

// Mostrar el modal al hacer clic en "Ver Todos"
document.querySelector(".btn").addEventListener("click", () => {
  generarTablaCompleta();
  document.querySelector("#infoModal").style.display = "flex";
  document.body.classList.add("modal-open");
});

// Cerrar el modal
document.querySelector(".modal-close").addEventListener("click", () => {
  document.querySelector("#infoModal").style.display = "none";
  document.body.classList.remove("modal-open");
});

// Cerrar el modal al hacer clic fuera del contenido
window.addEventListener("click", (event) => {
  const modal = document.querySelector("#infoModal");
  if (event.target === modal) {
      modal.style.display = "none";
      document.body.classList.remove("modal-open");
  }
});

const overlay = document.getElementById('overlay');
const modal = document.getElementById('infoModal');
const closeBtn = document.querySelector('.close');

// Abrir modal
function openModal() {
    overlay.style.display = 'block';
    modal.style.display = 'block';
}

// Cerrar modal
function closeModal() {
    overlay.style.display = 'none';
    modal.style.display = 'none';
}

// Evento para cerrar el modal
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);




