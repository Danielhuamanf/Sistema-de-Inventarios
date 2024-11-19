document.addEventListener("DOMContentLoaded", () => {
    const productModal = document.getElementById("productModal");
    const closeModal = document.querySelector(".close");
    const modalTitle = document.getElementById("modalTitle");
    const productForm = document.getElementById("productForm");
  
    let editIndex = null;
  
    // Botón para abrir el modal de nuevo producto
    document.getElementById("addProductBtn").addEventListener("click", () => {
      modalTitle.textContent = "Añadir Producto";
      productForm.reset();
      editIndex = null; // Resetea la edición
      productModal.style.display = "block";
    });
  
    // Botones de edición
    document.querySelectorAll("action-btn edit").forEach((btn, index) => {
      btn.addEventListener("click", () => {
        modalTitle.textContent = "Editar Producto";
        const product = productos[index];
        document.getElementById("productName").value = product.nombre;
        document.getElementById("productArea").value = product.area;
        document.getElementById("productType").value = product.consumible ? "consumable" : "non-consumable";
        document.getElementById("productStock").value = product.stock || 0;
        document.getElementById("productPrice").value = product.price || 0;
  
        editIndex = index; // Marca el índice del producto que se edita
        productModal.style.display = "block";
      });
    });
  
    // Cerrar el modal
    closeModal.addEventListener("click", () => {
      productModal.style.display = "none";
    });
  
    // Guardar producto (añadir o editar)
    productForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newProduct = {
        nombre: document.getElementById("productName").value,
        area: document.getElementById("productArea").value,
        consumible: document.getElementById("productType").value === "consumable",
        stock: parseInt(document.getElementById("productStock").value, 10),
        price: parseFloat(document.getElementById("productPrice").value)
      };
  
      if (editIndex !== null) {
        // Editar producto existente
        productos[editIndex] = { ...productos[editIndex], ...newProduct };
        showNotification("Producto actualizado correctamente.", "success");
      } else {
        // Añadir nuevo producto
        productos.push({ ...newProduct, estado: "unassigned", trabajador: "" });
        showNotification("Producto añadido correctamente.", "success");
      }
  
      productModal.style.display = "none";
      updateTable(); // Actualiza la tabla
    });
  });

  const showNotification = (message, type) => {
    const notification = document.createElement("div");
    notification.className = `notifications ${type}`;
    notification.textContent = message;
  
    document.body.appendChild(notification);
  
    setTimeout(() => {
      notification.remove();
    }, 3000); // Desaparece en 3 segundos
  };
  
  // CSS para las notificaciones
  const style = document.createElement("style");
  style.innerHTML = `
    .notifications {
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 10px 20px;
      border-radius: 5px;
      color: #fff;
      font-size: 14px;
      opacity: 0.9;
      z-index: 9999;
    }
    .notifications.success { background-color: #4caf50; }
    .notifications.error { background-color: #f44336; }
  `;
  document.head.appendChild(style);
