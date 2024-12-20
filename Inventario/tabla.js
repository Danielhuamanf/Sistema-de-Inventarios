// Cargar los productos desde localStorage o usar productos por defecto
let productos = JSON.parse(localStorage.getItem("productos")) || [
    { id: 1, description: "Producto 1", stock: 10, cost: 25.5, additionalInfo: "N/A", status: "Disponible", assignedWorker: "Juan", area: "operational", authorizedBy: "Pedro", tipo: "consumable" },
    { id: 2, description: "Producto 2", stock: 0, cost: 40.0, additionalInfo: "En reparación", status: "Reparación", assignedWorker: "Ana", area: "technological", authorizedBy: "Luis", tipo: "non-consumable" },
    // Más productos...
];

const rowsPerPage = 10;
let currentPage = 1;

// Función para renderizar la tabla con los productos
function renderTable(data) {
    const tableBody = document.getElementById("inventoryTableBody");
    tableBody.innerHTML = "";

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = data.slice(start, end);

    pageData.forEach((product) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${product.description}</td>
            <td>${product.stock}</td>
            <td>${product.cost.toFixed(2)}</td>
            <td>${product.additionalInfo || "N/A"}</td>
            <td>${product.status || "Sin estado"}</td>
            <td>${product.assignedWorker || "N/A"}</td>
            <td>${product.area}</td>
            <td>${product.authorizedBy || "N/A"}</td>
            <td>${product.tipo === "consumable" ? "Consumible" : "No Consumible"}</td>
            <td>
                <button class="action-btn edit" data-id="${product.id}"><ion-icon name="pencil-outline"></ion-icon></button>
                <button class="action-btn delete" data-id="${product.id}"><ion-icon name="trash-outline"></ion-icon></button>
            </td>
        `;
        tableBody.appendChild(tr);
    });

    updatePagination(data.length);
}

// Función para actualizar los controles de paginación
function updatePagination(totalRows) {
    const totalPages = Math.ceil(totalRows / rowsPerPage);
    document.getElementById("currentPage").textContent = currentPage;
    document.getElementById("totalPages").textContent = totalPages;

    document.getElementById("prevPage").disabled = currentPage === 1;
    document.getElementById("nextPage").disabled = currentPage === totalPages;
}

// Navegación de páginas
document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderTable(productos);
    }
});

document.getElementById("nextPage").addEventListener("click", () => {
    if (currentPage < Math.ceil(productos.length / rowsPerPage)) {
        currentPage++;
        renderTable(productos);
    }
});

// Eventos para Editar y Eliminar
document.addEventListener("click", (e) => {
    if (e.target.closest(".edit")) {
        const productId = e.target.closest(".edit").dataset.id;
        const product = productos.find((p) => p.id == productId);
        openModal("edit", product);
    } else if (e.target.closest(".delete")) {
        const productId = e.target.closest(".delete").dataset.id;
        deleteProduct(productId);
    }
});

// Eliminar producto
function deleteProduct(id) {
    productos = productos.filter((p) => p.id != id);
    saveToLocalStorage();  // Guardamos los productos actualizados en localStorage
    renderTable(productos);
}

// Modal: abrir en modo agregar o editar
function openModal(mode, product = null) {
    const modal = document.getElementById("productModal");
    const modalTitle = document.getElementById("modalTitle");
    const productForm = document.getElementById("productForm");

    if (mode === "edit") {
        modalTitle.textContent = "Editar Producto";
        document.getElementById("productId").value = product.id;
        document.getElementById("productName").value = product.description;
        document.getElementById("productArea").value = product.area;
        document.getElementById("productType").value = product.tipo;
        document.getElementById("productStock").value = product.stock;
        document.getElementById("productPrice").value = product.cost;
        document.getElementById("productWorker").value = product.assignedWorker;
        document.getElementById("productStatus").value = product.status || "";
        document.getElementById("authorizedBy").value = product.authorizedBy || "";
        document.getElementById("productAdditionalInfo").value = product.additionalInfo || "";
    } else if (mode === "add") {
        modalTitle.textContent = "Añadir Producto";
        document.getElementById("productForm").reset();
    }

    modal.style.display = "flex";
}

// Evento para abrir el modal al hacer clic en el botón "+ Nuevo"
document.getElementById("addProductBtn").addEventListener("click", () => {
    openModal("add");
});

// Cerrar modal si se hace clic fuera del contenido
window.addEventListener("click", (e) => {
    const modal = document.getElementById("productModal");
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// Función para guardar los productos en localStorage
function saveToLocalStorage() {
    localStorage.setItem("productos", JSON.stringify(productos));
}

// Llenar tabla al cargar
renderTable(productos);

// Evento para el submit del formulario
document.getElementById("productForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const productId = document.getElementById("productId").value;
    const productName = document.getElementById("productName").value;
    const productArea = document.getElementById("productArea").value;
    const productType = document.getElementById("productType").value;
    const productStock = document.getElementById("productStock").value;
    const productPrice = document.getElementById("productPrice").value;
    const productWorker = document.getElementById("productWorker").value;
    const productStatus = document.getElementById("productStatus").value;
    const authorizedBy = document.getElementById("authorizedBy").value;
    const productAdditionalInfo = document.getElementById("productAdditionalInfo").value;

    const product = {
        id: productId ? parseInt(productId) : productos.length + 1,
        description: productName,
        area: productArea,
        tipo: productType,
        stock: parseInt(productStock),
        cost: parseFloat(productPrice),
        assignedWorker: productWorker,
        status: productStatus,
        authorizedBy: authorizedBy,
        additionalInfo: productAdditionalInfo,
    };

    if (productId) {
        const productIndex = productos.findIndex((p) => p.id === parseInt(productId));
        if (productIndex > -1) {
            productos[productIndex] = product;  // Actualiza el producto
        }
    } else {
        productos.push(product);  // Añade un nuevo producto
    }

    saveToLocalStorage();  // Guardamos los cambios en localStorage
    document.getElementById("productModal").style.display = "none";
    renderTable(productos);
});
