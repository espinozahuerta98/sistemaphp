var tabla;

//Funcioón que se ejecuta al inicio
function init() {
    mostrarform(false);
    listar();

    $("#formulario").on("submit", function(e) {
        guardaryeditar(e);
    })
}

//Función  limpiar
function limpiar() {
    $("#idcategoria").val("");
    $("#nombre").val("");
    $("#descripcion").val("");

}

//Función mostrar formulario
function mostrarform(flag) {
    limpiar();
    if (flag) {
        $("#listadoregistros").hide();
        $("#formularioregistros").show();
        $("#btnGuardar").prop("disabled", false);
    } else {
        $("#listadoregistros").show();
        $("#formularioregistros").hide();
    }
}

//Función cancelarform
function cancelarform() {
    limpiar();
    mostrarform(false);
}

//Función listar
function listar() {
    tabla = $('#tbllistado').dataTable({
        "aProcessing": true, //Activamos el procesamiento del datatables
        "aServerSide": true, //Paginación y filtrado realizados por el servidor
        dom: 'Bfrtip', //Definimos los elementos del control de tabla
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdf'
        ],
        "ajax": {
            url: '../ajax/categoria.php?op=listar',
            type: "get",
            dataType: "json",
            error: function(e) {
                console.log(e.responseText);
            }
        },
        "bDestroy": true,
        "iDisplayLength": 5, //Paginación
        "order": [
                [0, "desc"]
            ] //Ordenar (columna, orden)


    }).DataTable();
}
//Función para guardar y editar

function guardaryeditar(e) {
    e.preventDefault(); //No se activará la acción predeterminada del evento
    $("#btnGuardar").prop("disabled", true);
    var formData = new FormData($("#formulario")[0]);

    $.ajax({
        url: "../ajax/categoria.php?op=guardaryeditar", //enviar todos los valores que obtengo en el formulario
        type: "POST",
        data: formData, //obtener todos los datos del formulario guardados en la variable formData
        contentType: false,
        processData: false,

        success: function(datos) {
            bootbox.alert(datos);
            mostrarform(false);
            tabla.ajax.reload(); //recargar tabla
        }
    });
    limpiar();
}

function mostrar(idcategoria) {
    $.post("../ajax/categoria.php?op=mostrar", { idcategoria: idcategoria }, function(data, status) {
        data = JSON.parse(data);
        mostrarform(true);

        $("#nombre").val(data.nombre);
        $("#descripcion").val(data.descripcion);
        $("#idcategoria").val(data.idcategoria);

    })
}

//Funcion para desactivar registros

function desactivar(idcategoria) {
    bootbox.confirm("¿Está seguro de desactivar la categoría?", function(result) {
        if (result) {
            $.post("../ajax/categoria.php?op=desactivar", { idcategoria: idcategoria }, function(e) {
                bootbox.alert(e);
                tabla.ajax.reload();
            })
        }
    })
}

//Funcion para activar registros

function activar(idcategoria) {
    bootbox.confirm("¿Está seguro de activar la categoría?", function(result) {
        if (result) {
            $.post("../ajax/categoria.php?op=activar", { idcategoria: idcategoria }, function(e) {
                bootbox.alert(e);
                tabla.ajax.reload();
            })
        }
    })
}
init();