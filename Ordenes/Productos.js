function agregarProducto(nombreProducto) {
    // Obtenemos los productos actuales del LocalStorage (si existen)
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    
    // Comprobar si el producto ya existe (opcional)
    if (productos.some(producto => producto.nombre === nombreProducto)) {
        console.log("Este producto ya existe.");
        return;
    }
  
    const nuevoProducto = {
        nombre: nombreProducto,
    };
    
    productos.push(nuevoProducto);
    
    localStorage.setItem("productos", JSON.stringify(productos));
}

// Función para cargar los productos del LocalStorage en el desplegable
function cargarProductos() {
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    
    let selectProductos = document.getElementById("producto");
    
    selectProductos.innerHTML = '<option value="">Seleccione un producto</option>';
    
    productos.forEach((producto) => {
        let option = document.createElement("option");
        option.value = producto.nombre; 
        option.textContent = producto.nombre; 
        selectProductos.appendChild(option);
    });
}

function agregarProductoATabla() {
    let selectProductos = document.getElementById("producto");
    let indiceSeleccionado = selectProductos.value; 

    if (indiceSeleccionado === "") {
        alert("Por favor, selecciona un producto.");
        return;
    }

    // Obtenemos los productos del LocalStorage
    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    let productoSeleccionado = productos[indiceSeleccionado];

    let tabla = document.getElementById("tablaProductos");

    let fila = tabla.insertRow();

    let celdaNombre = fila.insertCell(0);
    celdaNombre.textContent = productoSeleccionado.nombre;

}

window.onload = function () {
    cargarProductos(); // Cargar productos desde LocalStorage al cargar la página
    
    agregarProducto("Producto 1");
    agregarProducto("Producto 2");
    agregarProducto("Producto 3");
};

