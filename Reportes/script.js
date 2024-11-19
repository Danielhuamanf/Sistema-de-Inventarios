document.addEventListener("DOMContentLoaded", function () {
    const modal = document.querySelector("#modal-report");
    const modalPrint = document.querySelector("#modal-print");
    const modalForm = document.querySelector("#modal-form");
    const modalTitle = document.querySelector("#modal-title");
    const closeModalButtons = document.querySelectorAll(".close-btn");
    const printableReport = document.querySelector("#printable-report");

    const tableBody = document.querySelector(".report-table tbody");
    const totalAmountSpan = document.querySelector(".total-amount");
    const generateReportButton = document.querySelector("#generate-report-btn");
    const addReportButton = document.querySelector("#add-report-btn");
    const deleteAllButton = document.querySelector("#delete-all-btn"); // Nuevo botón para eliminar todos

    let isEditing = false;
    let editingIndex = null;

    // Cargar datos desde LocalStorage
    let reportData = JSON.parse(localStorage.getItem("reportData")) || [
        { date: "2024-06-01", order: "E001", client: "Oficina Central", provider: "Proveedor 1", status: "Recibido", total: 250 },
        { date: "2024-06-02", order: "S001", client: "Departamento Legal", provider: "Proveedor 2", status: "Prestado", total: 120 },
        { date: "2024-06-03", order: "E002", client: "Finanzas", provider: "Proveedor 3", status: "Recibido", total: 320 },
    ];

    // Guardar datos en LocalStorage
    function saveToLocalStorage() {
        localStorage.setItem("reportData", JSON.stringify(reportData));
    }

    // Mostrar la ventana modal
    function showModal(editing = false, index = null) {
        modal.style.display = "flex";
        isEditing = editing;
        editingIndex = index;

        if (editing && index !== null) {
            modalTitle.textContent = "Editar Reporte";
            const currentData = reportData[index];
            document.querySelector("#modal-date").value = currentData.date;
            document.querySelector("#modal-order").value = currentData.order;
            document.querySelector("#modal-client").value = currentData.client;
            document.querySelector("#modal-provider").value = currentData.provider;
            document.querySelector("#modal-status").value = currentData.status;
            document.querySelector("#modal-total").value = currentData.total;
        } else {
            modalTitle.textContent = "Agregar Reporte";
            modalForm.reset();
        }
    }

    // Ocultar la ventana modal
    function closeModal() {
        modal.style.display = "none";
    }

    // Actualizar la tabla con los datos actuales
    function renderTable(data) {
        tableBody.innerHTML = ""; // Limpiar tabla
        let total = 0;

        data.forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.date}</td>
                <td>${item.order}</td>
                <td>${item.client}</td>
                <td>${item.provider}</td>
                <td>${item.status}</td>
                <td>S/ ${item.total.toFixed(2)}</td>
                <td>
                    <button class="edit-btn" data-index="${index}">Editar</button>
                    <button class="delete-btn" data-index="${index}">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
            total += item.total;
        });

        // Actualizar el total generado
        totalAmountSpan.textContent = `S/ ${total.toFixed(2)}`;
    }

    // Guardar el reporte nuevo o editado
    modalForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const date = document.querySelector("#modal-date").value;
        const order = document.querySelector("#modal-order").value;
        const client = document.querySelector("#modal-client").value;
        const provider = document.querySelector("#modal-provider").value;
        const status = document.querySelector("#modal-status").value;
        const total = parseFloat(document.querySelector("#modal-total").value);

        if (isEditing && editingIndex !== null) {
            reportData[editingIndex] = { date, order, client, provider, status, total };
        } else {
            reportData.push({ date, order, client, provider, status, total });
        }

        saveToLocalStorage(); // Guardar cambios en LocalStorage
        closeModal();
        renderTable(reportData);
    });

    // Eliminar un reporte individual
    function deleteReport(index) {
        if (confirm("¿Estás seguro de que deseas eliminar este reporte?")) {
            reportData.splice(index, 1);
            saveToLocalStorage();
            renderTable(reportData);
        }
    }

    // Eliminar todos los reportes
    function deleteAllReports() {
        if (confirm("¿Estás seguro de que deseas eliminar todos los reportes?")) {
            reportData = [];
            saveToLocalStorage();
            renderTable(reportData);
        }
    }

    // Filtrar reportes por fechas
    function filterReport() {
        const startDate = document.querySelector("#date-start").value;
        const endDate = document.querySelector("#date-end").value;

        let filteredData = reportData;

        if (startDate) filteredData = filteredData.filter(item => item.date >= startDate);
        if (endDate) filteredData = filteredData.filter(item => item.date <= endDate);

        renderTable(filteredData);
    }

    // Mostrar el reporte para imprimir
    function generatePrintableReport() {
        const startDate = document.querySelector("#date-start").value;
        const endDate = document.querySelector("#date-end").value;

        let filteredData = reportData;

        if (startDate) filteredData = filteredData.filter(item => item.date >= startDate);
        if (endDate) filteredData = filteredData.filter(item => item.date <= endDate);

        printableReport.innerHTML = `
            <h3>Reporte Generado</h3>
            <p>Desde: ${startDate || "No especificado"} Hasta: ${endDate || "No especificado"}</p>
            <table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Nº Orden</th>
                        <th>Cliente</th>
                        <th>Proveedor</th>
                        <th>Estado</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${filteredData
                        .map(
                            item => `
                        <tr>
                            <td>${item.date}</td>
                            <td>${item.order}</td>
                            <td>${item.client}</td>
                            <td>${item.provider}</td>
                            <td>${item.status}</td>
                            <td>S/ ${item.total.toFixed(2)}</td>
                        </tr>
                    `
                        )
                        .join("")}
                </tbody>
            </table>
        `;
        modalPrint.style.display = "flex";
    }

    // Ocultar el modal de impresión
    function closePrintModal() {
        modalPrint.style.display = "none";
    }

    // Eventos
    addReportButton.addEventListener("click", () => showModal(false));
    generateReportButton.addEventListener("click", generatePrintableReport);
    deleteAllButton.addEventListener("click", deleteAllReports);

    tableBody.addEventListener("click", function (event) {
        if (event.target.classList.contains("edit-btn")) {
            const index = event.target.getAttribute("data-index");
            showModal(true, index);
        } else if (event.target.classList.contains("delete-btn")) {
            const index = event.target.getAttribute("data-index");
            deleteReport(index);
        }
    });

    closeModalButtons.forEach(button => {
        button.addEventListener("click", closeModal);
        button.addEventListener("click", closePrintModal);
    });

    // Renderizar tabla inicial
    renderTable(reportData);
});
