document.addEventListener("DOMContentLoaded", () => {
    const notificationIcon = document.getElementById("notificationIcon");
    const notificationList = document.getElementById("notificationList");
    const notificationsContainer = document.querySelector(".notifications");
    const productos = [
        { description: "Producto 1", stock: 10, additionalInfo: "N/A" },
        { description: "Producto 2", stock: 0, additionalInfo: "En reparación" },
    ];

    function updateNotifications() {
        notificationList.innerHTML = ""; // Limpiar lista

        const criticalProducts = productos.filter(
            (p) => p.stock === 0 || p.additionalInfo.toLowerCase().includes("reparación")
        );

        if (criticalProducts.length === 0) {
            notificationList.innerHTML = "<p>No hay notificaciones.</p>";
        } else {
            criticalProducts.forEach((p) => {
                const div = document.createElement("div");
                div.textContent = `${p.description} (${p.stock === 0 ? "Sin stock" : "En reparación"})`;
                notificationList.appendChild(div);
            });
        }
    }

    notificationIcon.addEventListener("click", (event) => {
        event.stopPropagation(); // Evitar propagación
        console.log("Ícono de notificaciones clickeado");
        notificationsContainer.classList.toggle("active");
    });

    document.addEventListener("click", () => {
        notificationsContainer.classList.remove("active");
    });

    updateNotifications();
});
