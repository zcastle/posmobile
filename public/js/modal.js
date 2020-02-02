var showEdit = function(row, cb){
    console.log(row);
    var form = "<div class='form-row'> \
            <div class='col'> \
                <div class='input-group mb-3'> \
                    <div class='input-group-prepend'> \
                        <span class='input-group-text'>Cantidad</span> \
                    </div> \
                    <input type='number' class='form-control' aria-label='Cantidad' id='txtEditarCantidad' value='" + row.cantidad + "'> \
                </div> \
            </div> \
            <div class='col'> \
                <div class='input-group mb-3'> \
                    <div class='input-group-prepend'> \
                        <span class='input-group-text'>Unitario</span> \
                    </div> \
                    <input type='number' class='form-control' aria-label='Unitario' id='txtEditarUnitario' value='" + row.unitario + "'> \
                </div> \
            </div> \
        </div>";

    var mensajes = "<p><div class='row'> \
        <div class='col'> \
            <p class='text-center'>Disponibles</p> \
            <ul id='lstMensajesDisponibles' class='list-group'> \
                <li class='list-group-item list-group-item-action' id='1'>Mensaje Uno</li> \
                <li class='list-group-item list-group-item-action' id='2'>Mensaje dos</li> \
                <li class='list-group-item list-group-item-action' id='3'>Mensaje tres</li> \
                <li class='list-group-item list-group-item-action' id='4'>Mensaje cuatro</li> \
            </ul> \
        </div> \
        <div class='col-auto'> \
            <p class='text-center'>&nbsp;</p> \
            <button type='button' class='btn btn-outline-dark' id='btnMensajeAdd'>></button> \
            <div class='w-100'></div> \
            <button type='button' class='btn btn-outline-dark' id='btnMensajeRemove'><</button> \
        </div> \
        <div class='col'> \
            <p class='text-center'>Seleccionados</p> \
            <ul id='lstMensajesSeleccionados' class='list-group'></ul> \
        </div> \
    </div></p>";

    var adicionales = "<p><div class='row'> \
        <div class='col'> \
            <p class='text-center'>Disponibles</p> \
            <ul id='lstAdicionalesDisponibles' class='list-group'> \
                <li class='list-group-item list-group-item-action' id='5'>Adicional Uno</li> \
                <li class='list-group-item list-group-item-action' id='6'>Adicional dos</li> \
                <li class='list-group-item list-group-item-action' id='7'>Adicional tres</li> \
                <li class='list-group-item list-group-item-action' id='8'>Adicional cuatro</li> \
            </ul> \
        </div> \
        <div class='col text-center'> \
        <p class='text-center'>Seleccionados</p> \
            <ul id='lstAdicionalesSeleccionados' class='list-group'></ul> \
        </div> \
    </div></p>";

    var nav = "<nav> \
        <div class='nav nav-tabs nav-fill' id='nav-tab' role='tablist'> \
            <a class='nav-item nav-link active' id='nav-message-tab' data-toggle='tab' href='#nav-message' role='tab' aria-controls='nav-message' aria-selected='true'>Mensajes</a> \
            <a class='nav-item nav-link' id='nav-adicionales-tab' data-toggle='tab' href='#nav-adicionales' role='tab' aria-controls='nav-adicionales' aria-selected='false'>Adicionales</a> \
        </div> \
        <div class='tab-content' id='nav-tabContent'> \
            <div class='tab-pane fade show active' id='nav-message' role='tabpanel' aria-labelledby='nav-message-tab'>" + mensajes + "</div> \
            <div class='tab-pane fade' id='nav-adicionales' role='tabpanel' aria-labelledby='nav-adicionales-tab'>" + adicionales + "</div> \
        </div> \
    </nav>";

    var e = "<div class='modal fade' tabindex='-1' role='dialog'> \
        <div class='modal-dialog modal-dialog-centered modal-lg' role='document'> \
        <div class='modal-content'> \
            <div class='modal-header'> \
                <h5 class='modal-title'>" + row.producto + "</h5> \
            </div> \
            <div class='modal-body'>" + form + nav + "</div> \
            <div class='modal-footer'> \
                <button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button> \
                <button type='button' class='btn btn-primary' data-dismiss='modal'>Guardar</button> \
            </div> \
        </div> \
        </div> \
    </div>";

    $(e).modal({
        backdrop: false
    })/*.on('show.bs.modal', function(){
        console.log("show.bs.modal");
        var mensajesSeleccionados = $(this).find("#lstMensajesSeleccionados");
        //
        if(row.mensajes.length > 0){
            for(i in row.mensajes){
                mensajesSeleccionados.append("<li class='list-group-item list-group-item-action' id='" + row.mensajes[i].id + "'>" + row.mensajes[i].text + "</li>");
            }
        }
    })*/.on('shown.bs.modal', function() {
        console.log("shown.bs.modal");
        var mensajesDisponibles = $(this).find("#lstMensajesDisponibles");
        var mensajesSeleccionados = $(this).find("#lstMensajesSeleccionados");
        //
        if(row.mensajes.length > 0){
            for(i in row.mensajes){
                mensajesSeleccionados.append("<li class='list-group-item list-group-item-action' id='" + row.mensajes[i].id + "'>" + row.mensajes[i].text + "</li>");
            }
        }
        //GUARDAR
        $(this).find("button.btn-primary").click(function(e){
            var mensajes = []
            var adicionales = []
            mensajesSeleccionados.find("li").each(function(){
                mensajes.push({
                    "id": $(this).attr("id"),
                    "text": $(this).text()
                });
            });
            var row = {
                "cantidad": $("input#txtEditarCantidad").val(),
                "unitario": $("input#txtEditarUnitario").val(),
                "mensajes": mensajes,
                "adicionales": adicionales
            }

            if(row.cantidad <= 0){
                showMessage("La cantidad debe ser mayor a 0");
                e.preventDefault();
                e.stopImmediatePropagation();
            }else if(row.unitario <= 0){
                showMessage("El valor unitario debe ser mayor a 0");
                e.preventDefault();
                e.stopImmediatePropagation();
            }else{
                if(cb) cb(row);
            }
        });
        $(this).find(".list-group > li").click(function(){
            if($(this).hasClass("active")){
                $(this).removeClass("active");
            }else{
                $(this).addClass("active");
            }
        });
        $(this).find("#btnMensajeAdd").click(function(){
            var e = mensajesDisponibles.find("li.active");
            if(e.length > 0){
                e.removeClass("active")
                mensajesSeleccionados.append(e);
            }
        });
        $(this).find("#btnMensajeRemove").click(function(){
            var e = mensajesSeleccionados.find("li.active");
            if(e.length > 0){
                e.removeClass("active")
                mensajesDisponibles.append(e);
            }
        });
    }).on('hidden.bs.modal', function() {
        $(this).modal('dispose');
        $(this).remove();
    });
}

var showAtenciones = function(row, cb){
    var e = "<div class='modal fade' tabindex='-1' role='dialog'> \
        <div class='modal-dialog modal-dialog-centered modal-lg' role='document'> \
        <div class='modal-content'> \
            <div class='modal-header'> \
                <h5 class='modal-title'>Atenciones</h5> \
            </div> \
            <div class='modal-body'> \
                <div class='container'> \
                    <div class='row'> \
                        <div class='col-sm'> \
                            One of three columns \
                        </div> \
                        <div class='col-sm'> \
                            One of three columns \
                        </div> \
                        <div class='col-sm'> \
                            One of three columns \
                        </div> \
                    </div> \
                </div> \
            </div> \
            <div class='modal-footer'> \
                <button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button> \
                <button type='button' class='btn btn-primary' data-dismiss='modal'>Guardar</button> \
            </div> \
        </div> \
        </div> \
    </div>";

    return $(e).modal({
        backdrop: false
    });
}