// Datos de ejemplo de productos y empleados por área
const areas = {
    "administrative": {
        name: "Área Administrativa y de Gestión",
        empleados: ["Gerente de logística", "Coordinador de operaciones", "Analista logístico", "Especialista en cadena de suministro", "Asistente administrativo"],
        objetos: ["Laptop", "Teléfono corporativo", "SAP, Oracle", "Material de oficina", "Conexión a internet", "Zoom, Teams, Slack"]
    },
    "operational": {
        name: "Área Operativa",
        empleados: ["Supervisor de almacén", "Encargado de inventarios", "Operador logístico", "Jefe de transporte"],
        objetos: ["Tablet o laptop", "Teléfono corporativo", "Escáner de códigos de barras", "EPP", "Transpaletas", "Montacargas"]
    },
    "transport": {
        name: "Área de Transporte",
        empleados: ["Chofer de transporte", "Repartidor de última milla", "Coordinador de rutas"],
        objetos: ["GPS", "Teléfono móvil corporativo", "Kit de emergencia para vehículos", "Dispositivo de firma electrónica", "EPP"]
    },
    "technological": {
        name: "Área Tecnológica",
        empleados: ["Desarrollador de sistemas", "Analista de datos", "Soporte técnico"],
        objetos: ["Laptop de alto rendimiento", "IDE", "Monitores adicionales", "Acceso a plataformas de gestión de datos"]
    },
    "customer-service": {
        name: "Área de Atención al Cliente",
        empleados: ["Ejecutivo de servicio al cliente", "Coordinador de cuentas clave", "Soporte postventa"],
        objetos: ["Computadora de escritorio", "Teléfono fijo", "CRM", "Auriculares", "Sistema de rastreo de envíos"]
    },
    "sales-marketing": {
        name: "Área de Ventas y Marketing",
        empleados: ["Ejecutivo de ventas", "Especialista en marketing digital"],
        objetos: ["Laptop", "Google Ads", "Adobe Illustrator", "Material promocional"]
    }
};

const productos = [
    { nombre: "Laptop", area: "administrative", tipo: "non-consumable", estado: "assigned", trabajador: "Gerente de logística", consumible: false },
    { nombre: "Escáner de códigos de barras", area: "operational", tipo: "non-consumable", estado: "unassigned", trabajador: "", consumible: false },
    { nombre: "GPS", area: "transport", tipo: "non-consumable", estado: "assigned", trabajador: "Chofer de transporte", consumible: false },
    { nombre: "Monitores adicionales", area: "technological", tipo: "non-consumable", estado: "assigned", trabajador: "Desarrollador de sistemas", consumible: false },
    { nombre: "Auriculares", area: "customer-service", tipo: "consumable", estado: "unassigned", trabajador: "", consumible: true },
    { nombre: "Folletos promocionales", area: "sales-marketing", tipo: "consumable", estado: "assigned", trabajador: "Ejecutivo de ventas", consumible: true },
    { nombre: "Papel bond", area: "administrative", tipo: "consumable", estado: "unassigned", trabajador: "", consumible: true },
    { nombre: "Cartuchos de tóner", area: "administrative", tipo: "consumable", estado: "assigned", trabajador: "Coordinador de operaciones", consumible: true }
];

// Función para generar un valor aleatorio
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Función para actualizar la tabla según los filtros seleccionados
const updateTable = () => {
    const assignedFilter = document.getElementById('assignedFilter').value;
    const areaFilter = document.getElementById('areaFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;
    
    // Limpiar el contenido de la tabla antes de agregar los nuevos productos filtrados
    const tableBody = document.getElementById('inventoryTableBody');
    tableBody.innerHTML = "";

    // Filtrar los productos según los valores de los filtros
    const filteredProducts = productos.filter(product => {
        const isAssigned = assignedFilter === "all" || product.estado === assignedFilter;
        const isAreaMatch = areaFilter === "all" || product.area === areaFilter;
        const isTypeMatch = typeFilter === "all" || product.tipo === typeFilter;
        
        return isAssigned && isAreaMatch && isTypeMatch;
    });

    // Llenar la tabla con los productos filtrados
    filteredProducts.forEach(product => {
        const row = document.createElement('tr');
        
        const description = document.createElement('td');
        description.textContent = product.nombre;
        row.appendChild(description);
        
        const stock = document.createElement('td');
        stock.textContent = getRandomInt(0, 100); // Stock aleatorio entre 0 y 100
        row.appendChild(stock);
        
        const price = document.createElement('td');
        price.textContent = `$${getRandomInt(100, 1000)}`; // Precio aleatorio entre 100 y 1000
        row.appendChild(price);
        
        const additionalInfo = document.createElement('td');
        additionalInfo.textContent = product.tipo === "consumable" ? "Reemplazo frecuente" : "Duradero";
        row.appendChild(additionalInfo);
        
        const status = document.createElement('td');
        status.textContent = product.estado === "assigned" ? "Asignado" : "No asignado";
        row.appendChild(status);
        
        const assignedWorker = document.createElement('td');
        assignedWorker.textContent = product.trabajador || "No asignado";
        row.appendChild(assignedWorker);
        
        const areaCell = document.createElement('td');
        areaCell.textContent = areas[product.area].name;
        row.appendChild(areaCell);
        
        const authorizedBy = document.createElement('td');
        authorizedBy.textContent = "Director General"; // Valor fijo por ejemplo
        row.appendChild(authorizedBy);
        
        const functionality = document.createElement('td');
        functionality.textContent = "Reparación"; // Valor fijo por ejemplo
        row.appendChild(functionality);
        
        const actions = document.createElement('td');
        actions.innerHTML = `<button class="action-btn">Editar</button><button class="action-btn">Eliminar</button>`;
        row.appendChild(actions);
        
        tableBody.appendChild(row);
    });
};

// Escuchar cambios en los filtros
document.addEventListener("DOMContentLoaded", () => {
    // Inicializar la tabla con todos los productos
    updateTable();

    // Añadir event listeners para actualizar la tabla cuando los filtros cambian
    document.getElementById('assignedFilter').addEventListener('change', updateTable);
    document.getElementById('areaFilter').addEventListener('change', updateTable);
    document.getElementById('typeFilter').addEventListener('change', updateTable);
});
