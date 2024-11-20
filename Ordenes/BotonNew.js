const newBtn = document.getElementById('newBtn');
const modal = document.getElementById('modal');
const closeModal = document.querySelector('.close');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');
const ordersTableBody = document.getElementById('ordersTableBody');

let editMode = false;
let rowToEdit = null;

// Arreglo para almacenar las órdenes
let orders = [];

// Cargar los datos desde localStorage al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const storedData = localStorage.getItem("ordersData");
    if (storedData) {
        orders = JSON.parse(storedData); // Cargar datos en el arreglo
        renderTable(); // Dibujar la tabla con el arreglo
    }
});

function renderTable() {
    ordersTableBody.innerHTML = ""; // Limpiar la tabla
    orders.forEach((order, index) => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${order.fecha}</td>
            <td>${order.numOrden}</td>
            <td>${order.empleado}</td>
            <td>${order.producto}</td>
            <td>${order.categoria}</td>
            <td>${order.unidades}</td>
            <td>${order.estado}</td>
            <td class="action-cell">
                <div class="action-buttons">
                    <button class="action-btn edit-btn" title="Editar">
                        <span class="material-icons">edit</span>
                    </button>
                    <button class="action-btn delete-btn" title="Eliminar" data-index="${index}">
                        <span class="material-icons">delete</span>
                    </button>
                </div>
            </td>
        `;
        attachRowEventListeners(newRow); // Agregar eventos a la nueva fila
        ordersTableBody.appendChild(newRow);
    });
}

// Función para guardar el arreglo en localStorage
function saveToLocalStorage() {
    localStorage.setItem("ordersData", JSON.stringify(orders));
}

newBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    editMode = false; 
    clearModalFields();
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    clearModalFields();
});

cancelBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    clearModalFields();
});

saveBtn.addEventListener('click', () => {

    const fecha = document.getElementById('fecha').value;
    const numOrden = document.getElementById('numOrden').value;
    const empleado = document.getElementById('empleado').value;
    const producto = document.getElementById('producto').value;
    const categoria = document.getElementById('categoria').value;
    const unidades = document.getElementById('unidades').value;
    const estado = document.getElementById('estado').value;   

    // Validar que todos los campos estén llenos
    if (!fecha || !numOrden || !empleado || !producto || !estado || !unidades || !categoria) {
        alert('Por favor, completa todos los campos antes de guardar.');
        return;
    }

    const newOrder = { fecha, numOrden, empleado, producto, estado, unidades, categoria };

    if (editMode && rowToEdit) {
        // Editar una fila existente
        const index = Array.from(ordersTableBody.children).indexOf(rowToEdit);
        orders[index] = newOrder; // Modificar el arreglo
        renderTable(); // Volver a renderizar la tabla
    } else {
        // Crear una nueva fila
        orders.push(newOrder); // Agregar al arreglo
        renderTable(); // Volver a renderizar la tabla
    }

    saveToLocalStorage(); // Guardar en localStorage
    modal.style.display = 'none'; // Cerrar el modal
    clearModalFields(); // Limpiar los campos
});

function clearModalFields() {
    document.getElementById('fecha').value = '';
    document.getElementById('numOrden').value = '';
    document.getElementById('empleado').value = '';
    document.getElementById('producto').value = '';
    document.getElementById('categoria').value = '';
    document.getElementById('unidades').value = '';
    document.getElementById('estado').value = '';
}

function attachRowEventListeners(row) {
    const editBtn = row.querySelector('.edit-btn');
    const deleteBtn = row.querySelector('.delete-btn');

    editBtn.addEventListener('click', () => {
        editMode = true;
        rowToEdit = row;

        const cells = row.querySelectorAll('td');
        document.getElementById('fecha').value = cells[0].textContent;
        document.getElementById('numOrden').value = cells[1].textContent;
        document.getElementById('empleado').value = cells[2].textContent;
        document.getElementById('producto').value = cells[3].textContent;
        document.getElementById('categoria').value = cells[5].textContent;
        document.getElementById('unidades').value = cells[6].textContent;
        document.getElementById('estado').value = cells[4].textContent;

        modal.style.display = 'block';
    });

    // Evento para eliminar
    deleteBtn.addEventListener('click', (e) => {
        const index = e.target.dataset.index; 
        if (confirm('¿Estás seguro de que deseas eliminar esta orden?')) {
            orders.splice(index, 1); 
            saveToLocalStorage(); 
            renderTable(); 
        }
    });
}

// Inicializar eventos para las filas existentes
ordersTableBody.querySelectorAll('tr').forEach(row => attachRowEventListeners(row));
