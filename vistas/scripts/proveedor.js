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
    $("#nombre").val("");
    $("#num_documento").val("");
    $("#direccion").val("");
    $("#telefono").val("");
    $("#email").val("");
    $("#idpersona").val("");
}

//Función mostrar formulario
function mostrarform(flag) {
    limpiar();
    if (flag) {
        $("#listadoregistros").hide();
        $("#formularioregistros").show();
        $("#btnGuardar").prop("disabled", false);
        $("#btnagregar").hide();
    } else {
        $("#listadoregistros").show();
        $("#formularioregistros").hide();
        $("#btnagregar").show();
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
            url: '../ajax/persona.php?op=listarp',
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
        url: "../ajax/persona.php?op=guardaryeditar", //enviar todos los valores que obtengo en el formulario
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

function mostrar(idpersona) {
    $.post("../ajax/persona.php?op=mostrar", { idpersona: idpersona }, function(data, status) {
        data = JSON.parse(data);
        mostrarform(true);

        $("#nombre").val(data.nombre);
        $("#tipo_documento").val(data.tipo_documento);
        $("#tipo_documento").selectpicker('refresh');
        $("#num_documento").val(data.num_documento);
        $("#direccion").val(data.direccion);
        $("#telefono").val(data.telefono);
        $("#email").val(data.email);
        $("#idpersona").val(data.idpersona);
    })
}

//Funcion para desactivar registros

function desactivar(idpersona) {
    bootbox.confirm("¿Está seguro de desactivar al proveedor?", function(result) {
        if (result) {
            $.post("../ajax/persona.php?op=desactivar", { idpersona: idpersona }, function(e) {
                bootbox.alert(e);
                tabla.ajax.reload();
            })
        }
    })
}

//Funcion para activar registros

function activar(idpersona) {
    bootbox.confirm("¿Está seguro de activar al proveedor?", function(result) {
        if (result) {
            $.post("../ajax/persona.php?op=activar", { idpersona: idpersona }, function(e) {
                bootbox.alert(e);
                tabla.ajax.reload();
            })
        }
    })
}
init();