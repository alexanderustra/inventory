let productos = [];

let modal = document.getElementById("modal");
let producto = {}
function mostrarModal() {
    modal.style.display = "flex";
  }
  
  function ocultarModal() {
    modal.style.display = "none";
  }

  function crearBotones(div, producto) {
    let borrar = document.createElement("button");
    let editar = document.createElement("button");
  
    let borrarSpan = document.createElement("span");
    borrarSpan.classList.add("material-symbols-outlined");
    borrarSpan.textContent = "delete";
    borrar.appendChild(borrarSpan);
    div.appendChild(borrar);
  
    let editarSpan = document.createElement("span");
    editarSpan.classList.add("material-symbols-outlined");
    editarSpan.textContent = "edit";
    editar.appendChild(editarSpan);
    div.appendChild(editar);
  
    borrar.classList.add("borrar-btn");
    borrar.addEventListener("click", () => {
      if (confirm("¿Eliminar el producto?")) {
        eliminarProducto(producto.id);
        div.remove();
      }
    });
  
    editar.addEventListener("click", () => {
      if (editar.textContent === "edit") {
        habilitarEdicion(div);
        editar.classList.add("material-symbols-outlined")
        editar.textContent = "save";
      } else {
        deshabilitarEdicion(div, producto);
        editar.classList.add("material-symbols-outlined");
        editar.textContent = "edit";
      }
    });
  }

  let objetoEncontrado = null;
  
  function habilitarEdicion(div) {
    div.querySelectorAll(".dato").forEach((parrafo) => {
      parrafo.contentEditable = true;
      parrafo.style.border = "solid 1px black";

      estadoBuscador = document.querySelectorAll('[data-prop]');

      estadoBuscador.forEach((elemento) => {
      if (elemento.dataset.prop === 'estado') {
        objetoEncontrado = elemento;
      }
      if (objetoEncontrado) {
        const nuevoSelect = document.createElement("select");
        nuevoSelect.name = "estado-select";
        nuevoSelect.id = "estado-select";
      
        const optionActivo = document.createElement("option");
        optionActivo.value = "true";
        optionActivo.textContent = "Activo";
      
        const optionDesactivado = document.createElement("option");
        optionDesactivado.value = "false";
        optionDesactivado.textContent = "Desactivado";
      
        nuevoSelect.appendChild(optionActivo);
        nuevoSelect.appendChild(optionDesactivado);
  
        objetoEncontrado.innerHTML = '';
        objetoEncontrado.appendChild(nuevoSelect);
      }
      });
    });
  }
  
  function deshabilitarEdicion(div, producto) {
    div.querySelectorAll(".dato").forEach((parrafo) => {
      parrafo.contentEditable = false;
      parrafo.style.border = "none";
      producto[parrafo.dataset.prop] = parrafo.textContent;
    });

    objetoEncontrado.innerHTML = document.getElementById('estado-select').value;
  }

  function crearProducto(nombre, categoria, unidades, costo, precio, estado) {
    let producto = {
      nombre: nombre,
      categoria: categoria,
      id: "Id: " + Math.floor(Math.random() * 1000000),
      unidades: unidades,
      costo: costo + " usd",
      precio: precio + " usd",
      estado: estado,
    };
  
    productos.push(producto);
  
    let div = document.createElement("div");
    div.className = "unidad-div";
    div.classList.add('elemento-creado')
  
    let parrafos = [];
  
    for (let prop in producto) {
      let parrafo = document.createElement("p");
      parrafo.textContent = producto[prop];
      parrafo.classList.add("dato");
      parrafo.dataset.prop = prop;
  
      parrafo.addEventListener("click", () => {
        if (div.querySelector("button").textContent === "edit") {
          parrafo.contentEditable = true;
          parrafo.style.backgroundColor = "#f4f4f4";
        }
      });
  
      div.appendChild(parrafo);
      parrafos.push(parrafo);
    }
  
    crearBotones(div, producto);
  
    document.getElementById("main").appendChild(div);
}

function eliminarProducto(id) {
    productos = productos.filter((producto) => producto.id !== id);
}

document.getElementById("agregar-objeto").addEventListener("click", mostrarModal);

document.getElementById("guardar-btn").addEventListener("click", () => {
  let nombre = document.getElementById("nombre-inp").value;
  let categoria = document.getElementById("categoria-select").value;
  let unidades = document.getElementById("unidades-inp").value;
  let costo = document.getElementById("costo-inp").value;
  let precio = document.getElementById("precio-inp").value;
  let estadoSelect = document.getElementById("estado-select").value;
  estado = estadoSelect === 'true' ? 'activo' : 'inactivo';

  crearProducto(nombre, categoria, unidades, costo, precio, estado);
  ocultarModal();
});

document.getElementById('buscador').addEventListener('keyup', () => {
  let buscadorInput = document.getElementById('buscador').value.toLowerCase();

  let arregloElementos = document.querySelectorAll('.elemento-creado');
  
  arregloElementos.forEach(elemento => {
    let elementoHijo = elemento.querySelector('.dato');
    if (elementoHijo.textContent.toLowerCase().includes(buscadorInput)) {
      elementoHijo.parentElement.classList.remove('oculto')
    }
    else {
      elementoHijo.parentElement.classList.add('oculto')
    }
  });
});

let filtroCategoria =  document.getElementById('filtro-categoria');
filtroCategoria.addEventListener('change',()=>{
  let categoriaElemento = document.querySelectorAll('[data-prop="categoria"]');
  for( i = 0 ; i < categoriaElemento.length ; i++) {
    if(categoriaElemento[i].textContent.includes(filtroCategoria.value) || filtroCategoria.value === 'todo') {
      categoriaElemento[i].parentElement.classList.remove('oculto')
    }else {
      categoriaElemento[i].parentElement.classList.add('oculto')
    }
  }
})

