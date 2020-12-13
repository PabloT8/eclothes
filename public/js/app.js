import axios from "axios";
import Swal from "sweetalert2";

document.addEventListener("DOMContentLoaded", () => {
  // Verificar si estamos en la página del panel de administrador
  const panelProductos = document.querySelector("#panel-productos");

  if (panelProductos)
    panelProductos.addEventListener("click", eliminarProducto);
});

const eliminarProducto = (e) => {
  // Prevenir el comportamiento por defecto
  e.preventDefault();

  // Verificar que el botón seleccionado es el botón de eliminar
  if (e.target.dataset.eliminar) {
    Swal.fire({
      title: "¿Está seguro que desea eliminar el producto?",
      text: "¡Una vez eliminado, no se puede recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d330000",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        // El usuario hace click en eliminar
        // Redireccionar a la ruta correspondiente
        const axiosUrl = `${location.origin}/producto/${e.target.dataset.eliminar}`;

        // Petición AJAX de eliminación
        axios
          .delete(axiosUrl, { id: e.target.dataset.eliminar })
          .then((response) => {
            if (response.status == 200) {
              Swal.fire("¡Eliminado!", response.data, "success");

              // Eliminar el producto del DOM
              e.target.parentElement.parentElement.removeChild(
                e.target.parentElement
              );
            }
          })
          .catch(() => {
            Swal.fire({
              type: "error",
              title: "Error",
              text: "Ocurrió un error al momento de eliminar el producto",
            });
          });
      }
    });
  } else if (e.target.tagName === "A") {
    // Si no es el botón de eliminar producto, realizar la redirección
    window.location.href = e.target.href;
  }
};
/*import axios from "axios";
import Swal from "sweetalert2";

document.addEventListener("DOMContentLoaded", () => {
  // Verificar si estamos en la página del panel de administrador
  const panelProductos = document.querySelector("#panel-productos");

  if (panelProductos)
    panelProductos.addEventListener("click", eliminarProducto);
});

const eliminarProducto = (e) => {
  // Prevenir el comportamiento por defecto
  e.preventDefault();

  // Verificar que el botón seleccionado es el botón de eliminar
  if (e.target.dataset.eliminar) {
    Swal.fire({
      title: "¿Está seguro que desea eliminar el producto?",
      text: "¡Una vez eliminado, no se puede recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d330000",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        // El usuario hace click en eliminar
        // Redireccionar a la ruta correspondiente
        const axiosUrl = `${location.origin}/producto/${e.target.dataset.eliminar}`;

        // Petición AJAX de eliminación
        axios
          .delete(axiosUrl, { id: e.target.dataset.eliminar })
          .then((response) => {
            if (response.status == 200) {
              Swal.fire("¡Eliminado!", response.data, "success");

              // Eliminar el producto del DOM
              e.target.parentElement.parentElement.removeChild(
                e.target.parentElement
              );
            }
          })
          .catch(() => {
            Swal.fire({
              type: "error",
              title: "Error",
              text: "Ocurrió un error al momento de eliminar el producto",
            });
          });
      }
    });
  } else if (e.target.tagName === "A") {
    // Si no es el botón de eliminar producto, realizar la redirección
    window.location.href = e.target.href;
  }
};*/