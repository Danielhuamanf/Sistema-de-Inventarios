document.addEventListener("DOMContentLoaded", function () {
    // Elementos principales
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
    const deleteAllButton = document.querySelector("#delete-all-btn");

    const startDateInput = document.querySelector("#date-start");
    const endDateInput = document.querySelector("#date-end");
    const providerSelect = document.querySelector("#provider");
    const clientSelect = document.querySelector("#client");

    let isEditing = false;
    let editingIndex = null;

    // Cargar datos desde LocalStorage o inicializar con valores predeterminados
    let reportData = JSON.parse(localStorage.getItem("reportData")) || [
        { date: "2024-06-01", order: "E001", client: "Oficina Central", provider: "Proveedor 1", status: "Recibido", total: 250 },
        { date: "2024-06-02", order: "S001", client: "Departamento Legal", provider: "Proveedor 2", status: "Prestado", total: 120 },
        { date: "2024-06-03", order: "E002", client: "Finanzas", provider: "Proveedor 3", status: "Recibido", total: 320 },
    ];

    // Guardar datos en LocalStorage
    function saveToLocalStorage() {
        localStorage.setItem("reportData", JSON.stringify(reportData));
    }

    // Mostrar ventana modal
    function showModal(editing = false, index = null) {
        modal.style.display = "flex";
        isEditing = editing;
        editingIndex = index;

        if (editing && index !== null) {
            modalTitle.textContent = "Editar Reporte";
            const currentData = reportData[index];
            modalForm["modal-date"].value = currentData.date;
            modalForm["modal-order"].value = currentData.order;
            modalForm["modal-client"].value = currentData.client;
            modalForm["modal-provider"].value = currentData.provider;
            modalForm["modal-status"].value = currentData.status;
            modalForm["modal-total"].value = currentData.total;
        } else {
            modalTitle.textContent = "Agregar Reporte";
            modalForm.reset();
        }
    }

    // Ocultar ventana modal
    function closeModal() {
        modal.style.display = "none";
    }

    // Renderizar tabla
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

            setTimeout(() => {
                row.classList.add("show");
            }, 10);

            total += item.total;
        });

        totalAmountSpan.textContent = `S/ ${total.toFixed(2)}`;
    }

    // Filtrar reportes
    function filterReports() {
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;
        const provider = providerSelect.value;
        const client = clientSelect.value;

        let filteredData = reportData;

        if (startDate) filteredData = filteredData.filter(item => item.date >= startDate);
        if (endDate) filteredData = filteredData.filter(item => item.date <= endDate);
        if (provider) filteredData = filteredData.filter(item => item.provider === provider);
        if (client) filteredData = filteredData.filter(item => item.client === client);

        renderTable(filteredData);
    }

    // Guardar reporte
    modalForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const date = modalForm["modal-date"].value;
        const order = modalForm["modal-order"].value;
        const client = modalForm["modal-client"].value;
        const provider = modalForm["modal-provider"].value;
        const status = modalForm["modal-status"].value;
        const total = parseFloat(modalForm["modal-total"].value);

        // Validar campos obligatorios
        if (!date || !order || !client || !provider || !status || isNaN(total)) {
            alert("Por favor, completa todos los campos antes de guardar.");
            return;
        }

        if (isEditing && editingIndex !== null) {
            reportData[editingIndex] = { date, order, client, provider, status, total };
        } else {
            reportData.push({ date, order, client, provider, status, total });
        }

        saveToLocalStorage();
        closeModal();
        renderTable(reportData);
    });

    // Eliminar un reporte
    tableBody.addEventListener("click", function (event) {
        const target = event.target;

        if (target.classList.contains("edit-btn")) {
            const index = target.dataset.index;
            showModal(true, index);
        } else if (target.classList.contains("delete-btn")) {
            const index = target.dataset.index;
            if (confirm("¿Estás seguro de que deseas eliminar este reporte?")) {
                reportData.splice(index, 1);
                saveToLocalStorage();
                renderTable(reportData);
            }
        }
    });

    // Eliminar todos los reportes
    deleteAllButton.addEventListener("click", function () {
        if (confirm("¿Estás seguro de que deseas eliminar todos los reportes?")) {
            reportData = [];
            saveToLocalStorage();
            renderTable(reportData);
        }
    });

    // Generar reporte imprimible
    generateReportButton.addEventListener("click", function () {
        const startDate = startDateInput.value;
        const endDate = endDateInput.value;

        const filteredData = reportData.filter(item =>
            (!startDate || item.date >= startDate) &&
            (!endDate || item.date <= endDate)
        );

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
                        .map(item => `
                            <tr>
                                <td>${item.date}</td>
                                <td>${item.order}</td>
                                <td>${item.client}</td>
                                <td>${item.provider}</td>
                                <td>${item.status}</td>
                                <td>S/ ${item.total.toFixed(2)}</td>
                            </tr>
                        `).join('')}
                </tbody>
            </table>
        `;

        modalPrint.style.display = "flex";
    });

    // Eventos de cierre de modal
    closeModalButtons.forEach(button => {
        button.addEventListener("click", () => {
            modal.style.display = "none";
            modalPrint.style.display = "none";
        });
    });

    // Inicializar tabla
    renderTable(reportData);

    // Filtrar reportes cuando cambien los valores
    [startDateInput, endDateInput, providerSelect, clientSelect].forEach(input => {
        input.addEventListener("change", filterReports);
    });

    // Abrir modal para agregar reporte
    addReportButton.addEventListener("click", () => showModal(false));
});
