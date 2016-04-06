/*global window */
/*global alert */
/*jslint browser: true, for:true */

//JavaScript Document

/**Curso: HMTL5 - Pildoras Informáticas - API IndexedDB III
 * Origin: Capitulo53.html ==> Almacenamiento en DB
 */

// "use strict";

// PENDIENTE CORREGIR  -  REVISAR DOCUMENTACION indexedDB //

//1. Definición de Objetos y Variables
var botonGrabar;
var zonaDatos;
var db;



//1.1 Extracción de elementos desde HTML
botonGrabar = document.getElementById("grabar");
zonaDatos = document.getElementById("zona-datos");


function mostrarDatos(e) {
    'use strict';

    var cursor;

    cursor = e.target.result;

    if (cursor) {
        zonaDatos.innerHTML += "<div>" + cursor.value.clave + " - " + cursor.value.texto + " - " + cursor.value.fecha + "</div>";
        cursor.continue();
    }
}

function mostrarRegistro() {
    'use strict';

    var transaccion;
    var almacen;
    var cursor;

    zonaDatos.innerHTML = "";

    transaccion = db.transaction(["gente"], "readonly");
    almacen = transaccion.objectStore("gente");
    cursor = almacen.openCursor();
    cursor.addEventListener("success", mostrarDatos, false);
}


function agregarObjeto() {
    'use strict';

    var itemClave;
    var itemTexto;
    var itemFecha;
    var transaccion;
    var almacen;
    var agregar;

//OJO DEFINIMOS itemClave e itemValor como variables locales. Si las
// definimos como variables generales, no funciona
    itemClave = document.getElementById("clave").value;
    itemTexto = document.getElementById("texto").value;
    itemFecha = document.getElementById("fecha").value;

//    Definimos el tipo de transacción que vamos a realizarr
    transaccion = db.transaction(["gente"], "readwrite");

//    Almaceno el valor de la transacción en la variable almacen
    almacen = transaccion.objectStore("gente");

//    Almaceno en la variable agregar el valor de almacen
    agregar = almacen.add({clave: itemClave, titulo: itemTexto, fecha: itemFecha});

    agregar.addEventListener("success", mostrarRegistro, false);



    document.getElementById("clave").value = "";
    document.getElementById("texto").value = "";
    document.getElementById("fecha").value = "";

}


function iniciar() {
    'use strict';

    botonGrabar.addEventListener("click", agregarObjeto, false);

    var solicitud;


    solicitud = window.indexedDB.open("miBase");

    solicitud.onupgradeneeded = function () {
        db = solicitud.result;
        db.createObjectStore("gente", {keyPath: "clave"});
    };

    solicitud.onsuccess = function () {
        db = solicitud.result;
    };

}


//3. Asignación de Eventos
document.addEventListener("DOMContentLoaded", iniciar, false);
