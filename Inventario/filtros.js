// Filtrar productos
document.querySelectorAll(".filters select").forEach((filter) => {
    filter.addEventListener("change", applyFilters);
});

function applyFilters() {
    const assignedFilter = document.getElementById("assignedFilter").value;
    const areaFilter = document.getElementById("areaFilter").value;
    const typeFilter = document.getElementById("typeFilter").value;

    let filteredData = inventoryData;

    // Filtro de asignación
    if (assignedFilter !== "all") {
        filteredData = filteredData.filter((item) =>
            assignedFilter === "assigned" ? item.status === "Asignado" : item.status === "No asignado"
        );
    }

    // Filtro de área
    if (areaFilter !== "all") {
        filteredData = filteredData.filter((item) => item.area.toLowerCase().includes(areaFilter));
    }

    // Renderizar tabla con datos filtrados
    renderTable(filteredData);
}

