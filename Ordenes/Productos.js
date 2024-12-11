// Función para cargar solo los nombres de los productos en el select
function cargarProductosNombres() {
    // Obtener los productos desde localStorage
    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    // Filtrar solo los nombres (description)
    let nombresProductos = productos.map(producto => producto.description);
    
    let selectProductos = document.getElementById("producto");

    // Limpiar opciones anteriores
    selectProductos.innerHTML = '<option value="">Seleccione un producto</option>';

    // Agregar solo los nombres al select
    nombresProductos.forEach((nombre) => {
        let option = document.createElement("option");
        option.value = nombre; // Usamos solo el nombre como valor
        option.textContent = nombre; // Mostramos el nombre en el desplegable
        selectProductos.appendChild(option);
    });
}

// Función para agregar el producto seleccionado en la tabla
function agregarProductoATabla() {
    let selectProductos = document.getElementById("producto");
    let nombreSeleccionado = selectProductos.value; // Obtenemos el nombre seleccionado

    if (nombreSeleccionado === "") {
        alert("Por favor, selecciona un producto.");
        return;
    }

    // Obtener los productos desde localStorage
    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    // Buscar el producto por nombre (description)
    let productoSeleccionado = productos.find(producto => producto.description === nombreSeleccionado);

    if (!productoSeleccionado) {
        alert("Producto no encontrado.");
        return;
    }

    // Agregar el producto seleccionado a la tabla (solo nombre)
    let tabla = document.getElementById("tablaProductos");
    let fila = tabla.insertRow();

    let celdaNombre = fila.insertCell(0);
    celdaNombre.textContent = productoSeleccionado.description; // Mostrar el nombre del producto
}

// Cargar los productos cuando se cargue la página
window.onload = function () {
    cargarProductosNombres(); // Cargar solo los nombres desde localStorage
    
    // Aquí podrías también hacer llamadas para agregar productos iniciales si es necesario
};

