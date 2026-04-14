const listaCarrito = document.getElementById('lista-carrito');
const listaCarritoOffcanvas = document.getElementById('lista-carrito-offcanvas');
const contadorCarrito = document.getElementById('contador-carrito');

function actualizarContador() {
  if (!contadorCarrito) return;

  const productosReales = listaCarritoOffcanvas.querySelectorAll('li.agregado').length;
  contadorCarrito.textContent = productosReales;
}

function crearItem(nombreProducto) {
  const li = document.createElement('li');
  li.className = 'list-group-item agregado';
  li.textContent = nombreProducto;
  return li;
}

function crearItemVacio() {
  const li = document.createElement('li');
  li.className = 'list-group-item text-muted text-center';
  li.textContent = 'No hay productos';
  return li;
}

function limpiarMensajeVacio(lista) {
  if (
    lista.children.length === 1 &&
    lista.children[0].textContent.trim() === 'No hay productos'
  ) {
    lista.innerHTML = '';
  }
}

function agregarProducto(nombreProducto) {
  limpiarMensajeVacio(listaCarrito);
  limpiarMensajeVacio(listaCarritoOffcanvas);

  const li = crearItem(nombreProducto);
  const liOff = crearItem(nombreProducto);

  listaCarrito.appendChild(li);
  listaCarritoOffcanvas.appendChild(liOff);

  setTimeout(() => {
    li.classList.remove('agregado');
    liOff.classList.remove('agregado');
  }, 1000);

  actualizarContador();
}

function eliminarProducto() {
  const items = listaCarrito.querySelectorAll('li');
  const itemsOff = listaCarritoOffcanvas.querySelectorAll('li');

  if (items.length > 0 && items[items.length - 1].textContent.trim() !== 'No hay productos') {
    const ultimo = items[items.length - 1];
    ultimo.classList.add('eliminado');

    setTimeout(() => {
      ultimo.remove();

      if (listaCarrito.children.length === 0) {
        listaCarrito.appendChild(crearItemVacio());
      }
    }, 500);
  }

  if (itemsOff.length > 0 && itemsOff[itemsOff.length - 1].textContent.trim() !== 'No hay productos') {
    const ultimoOff = itemsOff[itemsOff.length - 1];
    ultimoOff.classList.add('eliminado');

    setTimeout(() => {
      ultimoOff.remove();

      if (listaCarritoOffcanvas.children.length === 0) {
        listaCarritoOffcanvas.appendChild(crearItemVacio());
      }

      actualizarContador();
    }, 500);
  }
}


