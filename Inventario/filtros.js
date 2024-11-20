const assignedFilter = document.getElementById("assignedFilter");
const areaFilter = document.getElementById("areaFilter");
const typeFilter = document.getElementById("typeFilter");

function applyFilters() {
    let filteredProducts = [...productos];

    // Filtro por asignación
    if (assignedFilter.value !== "all") {
        filteredProducts = filteredProducts.filter((p) =>
            assignedFilter.value === "assigned" ? p.assignedWorker : !p.assignedWorker
        );
    }

    // Filtro por área
    if (areaFilter.value !== "all") {
        filteredProducts = filteredProducts.filter((p) => p.area === areaFilter.value);
    }

    // Filtro por tipo
    document.getElementById("typeFilter").addEventListener("change", (e) => {
        const filterValue = e.target.value;
        const filteredData = filterValue === "all"
            ? productos
            : productos.filter((p) => p.tipo === filterValue);
        renderTable(filteredData);
    });

    renderTable(filteredProducts);
}

// Eventos de filtros
assignedFilter.addEventListener("change", applyFilters);
areaFilter.addEventListener("change", applyFilters);
typeFilter.addEventListener("change", applyFilters);