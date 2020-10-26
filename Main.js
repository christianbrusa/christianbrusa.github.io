//modelo a utilizar : funciones

/*sigla para organizar: FEO
F unciones
E ventos
O bjetos

y por otro lado: Estructuras de datos. 
(como guardar la información).

Estructuras de datos --> puede ser: 
funcion, array, obejetos. 

La estructura que nos permitiria almacenar 
los items es un ARRAY.

¿Porque un ARRAY?
Porque mediante un metodo PUSH podemos agregar un item. 
porque puedo buscar en ella, puedo combinar, puedo eliminar items. 
(Splice).

*/

//Estructura de datos
let datos = [
    { titulo: 'fideos', precio: 100, cantidad: 1 },
    { titulo: 'carne', precio: 200, cantidad: 2 },
    { titulo: 'pollo', precio: 300, cantidad: 3 },
    { titulo: 'pescado', precio: 400, cantidad: 4 }
]

//vista es para que no se modifique la información de datos[];
let vista = []; //se puede cambiar por un map
let datosPrevios = [];


const btnAgregar = document.querySelector('#btnAgregar');
/*esta seria otra forma -- la de arriba es mejor porque podes
seleccionar cosas de css.
document.getElementById('btnAgregar')*/
const inputBusqueda = document.querySelector('#inputBusqueda');
const btnDeshacer = document.querySelector('#btnDeshacer');
const inpAgregar = document.querySelector('#inpAgregar');
const galeria = document.querySelector('#galeria');
const limpiar = document.querySelector('#Limpiarlista');


//--Funciones--

/*Precisamos que los productos que se agreguen se reflejen ademas de la consola en la interfaz. 
para ello, creamos la función Render.
-> Lo que va a hacer es recibir una lista de items y procesarla.*/

const template = ({ titulo, cantidad, precio}) =>
    `<div class="item">
                <div class="titulo">
                  ${titulo}  
                </div>

                <div class="controles">
                    <span>Stock : ${cantidad}</span>
                    <br>
                    <br>
                    <span>Precio : $${precio}</span>
                </div>

                <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" id="eliminar">
                    Eliminar
                  </button>

            </div>`;

function render(lista = [{ titulo: '', cantidad: 0, precio: 0 }]) {
    galeria.innerHTML = '';
    lista.forEach(item => {
        galeria.innerHTML += template(item);
    })
}

//paso 1 para hacer un GET a MockAPI
async function loadAPI(completado) {
    const endpoint = 'https://5f7e3d160198da001689368d.mockapi.io/Clientes';

    const res = await fetch(endpoint);
    const json = await res.json();

    datos = json;

    completado(datos);
}

//--Eventos--
//paso 2 para hacer un GET a MockAPI
document.addEventListener('DOMContentLoaded', () => {
    loadAPI(function () {
        render(datos);
    });
});

//al hacer click en el boton (Agregar item).

btnAgregar.addEventListener('click', () => {

    /*array.reduce lo que hace es: reducir un array a 
    un valor*/
    //esto es una forma para ir sumando los distintos productos.
    //tambien se puede usar: array.lenght + 1. 

    //const id = datos.reduce((prev, valActual) => {

    /*almacenar el estado anterior al cambio.   
    importante estar antes del push
    si o si hay que usar el slice ya que sino iguala datos previos
    con datos y no es lo que queremos. lo explica en clase 2
    minuto: 1 hora 35min
    
    con el Slice, se crea un nuevo array. Nuevo espacio de memoria*/

    datosPrevios = datos.slice(0);
    /*el settimeout aqui funciona para generar un delay y 
    ayudar a que el boton deshacer funcione correctamente*/
    setTimeout(function () {
        //agregar un nuevo item/objeto
        datos.push({
            //.value: tomar lo que se tomo en el textfield.
            titulo: inpAgregar.value,
            cantidad: 0,
            precio: 0
        });
        alert("item agregado");
    }, 500);

});


//al ingresar datos en el (campo de busqueda).

inputBusqueda.addEventListener('input', e => {
    let vista = datos.filter((val) => {
        if (val.titulo.includes(e.target.value)) {
            /*si retorna true es porque el (val) se encuentra 
            dentro de algun titulo del array vista*/
            return true;
        }
        else {
            return false;
        }
    })
    //este render se hace por cada vez que el usuario cambia el contenido del campo de busqueda.
    render(vista);
})

//al hacer click en deshacer

btnDeshacer.addEventListener('click', () => {
    //recuperar la información
    datos = datosPrevios;
    alert("volviste atras");
})
//al hacer click en (limpiar lista).
/*hecho por mi al 100*/
limpiar.addEventListener('click', () => {
    alert("se limpió la lista");
    datos = [];
    render(datos);
})

//al hacer click en (guardar lista).

/*yo creo que aqui debemos guardar datos en una nueva variable
y ya que al limpiarlista se borre el array, los datos sigan en esta nueva variable*/

//al hacer click en (cargar lista).

/*aqui debemos reflejar la nueva variable de guardar*/

//al hacer click en un item con (la clase borrar).

//--Objetos--

