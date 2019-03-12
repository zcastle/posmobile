var tempId = 1;

var tplProductoRow = "<li class='list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-primary pt-1 pb-1'> \
        <div class='sr-only productoId'>{productoId}</div> \
        <div class='sr-only productoNombre'>{productoNombre}</div> \
        <div class='sr-only productoUnitario'>{productoUnitario}</div> \
        {producto} \
        <h4><span class='badge badge-info'>S/. {unitario}</span></h4> \
</li>";

var tplCategoriaRow = "<li class='list-group-item d-flex justify-content-between align-items-center list-group-item-action list-group-item-success'> \
        {categoria} \
    <span class='badge badge-info'>{cantidad}</span> \
</li>";

var toNumber = function(val){
    return $.number(val, 2, '.', ',');
}

var newProductoRow = function(row){
    return $(tplProductoRow
        .replace("{productoId}", row.id)
        .replace("{productoNombre}", row.producto)
        .replace("{productoUnitario}", row.unitario)
        .replace("{producto}", row.producto)
        .replace("{unitario}", toNumber(row.unitario))).dblclick(function(){
            $(this).addClass("active").siblings().removeClass("active");
            addRow({
                "nro": $("#lblNro").text(),
                "pax": $("#btnPax").text(),
                "productoId": $(this).find("div.productoId").text(),
                "producto": $(this).find("div.productoNombre").text(),
                "cantidad": 1,
                "unitario": $(this).find("div.productoUnitario").text(),
                "total": 1 * parseFloat($(this).find("div.productoUnitario").text()),
                "enviado": false/*,
                "mensajes": undefined,
                "adicionales": undefined*/
            })
        }).hammer().on('swipeleft', function () {
            $(this).trigger("dblclick");
        });
}

var newCategoriaRow = function(row){
    return tplCategoriaRow
        .replace("{categoria}", row.categoria)
        .replace("{cantidad}", row.cantidad);
}

var l = null;
var session;
$(document).ready(function(){
    console.log("pedido.js");

    session = MYSESSION.get();
    console.log(session);
    $.ajaxSetup({
        "error":function(a,b) {
            console.log(a);
            console.log(b);
            //l.modal("hide");
            showMessage("Error en el servicio");
        }
    });

    /*PullToRefresh.init({
        mainElement: '#tblPedido',
        onRefresh: function(){
            console.log("Refresh");
        }
    });*/

    //l = showLoading("Cargando...");
    $.getJSON(URL_SERVICE + "/pedido?token=" + session.token, function(response){
        console.log(response);
        //l.modal("hide");
        clear();
        var data = response.data;
        if(data.length > 0){
            var cab = data[0];
            $("#btnPax").text(cab.pax);
            $("#lblNro").text(cab.nro);
            var row;
            for(i in data){
                row = {
                    "id": data[i].id,
                    "productoId": data[i].product_id,
                    "producto": data[i].product_name,
                    "cantidad": data[i].product_cant,
                    "unitario": data[i].product_price,
                    "total": data[i].product_cant * data[i].product_price,
                    "enviado": data[i].product_send == "S"
                }
                $("#tblPedido").append(newPedidoRow(row));
            }
        }
    });

    $.getJSON(URL_SERVICE + "/productos/portada?token=" + session.token, function(response){
        //console.log(response.data);
        var data = response.data;
        for (i in data){
            $("#lstProductos").append(newProductoRow({
                "id": data[i].id,
                "producto": data[i].name,
                "unitario": data[i].price
            }));
        }
    });

    /*for(var i = 1; i <= 20; i++){
        var row = {
            "id": i,
            "producto": "Producto " + i,
            "cantidad": i,
            "unitario": i,
            "total": i,
            "enviado": false
        }
        $("#tblPedido").append(newPedidoRow(row));
    }*/

    //$("#lstProductos").removeClass("invisible");
    /*for(var i = 1; i <= 20; i++){
        var row = {
            "id": i,
            "producto": "Producto " + i,
            "unitario": i
        }
        $("#lstProductos").append(newProductoRow(row));
    }*/

    //$("#lstCategorias").removeClass("invisible");
    for(var i = 1; i <= 10; i++){
        var row = {
            "categoria": "Categoria " + i,
            "cantidad": i
        }
        $("#lstCategorias").append(newCategoriaRow(row));
    }

    //$("#tblPedido > li").click(function(){
        //console.log(getRow($(this).attr("id")));
        //console.log(getRows());
        //removeRow($(this).attr("id"));
        //updateRow($(this).attr("id"), {"cantidad": 50});
    //});

    $("#btnEliminar").click(function(){
        var id = $("#tblPedido > li.active").attr("id");

        var remove = function(){
            removeRow(id);
            $("#btnEliminar").addClass("disabled");
            $("#btnEditar").addClass("disabled");
        }

        if(isEnviado(id)){
            showConfirm("El producto ha sido enviado, desea continuar?", function(){
                remove();
            });
        }else{
            remove();
            //setEnviado(id);
        }
    });

    $("#btnEditar").click(function(){
        var id = $("#tblPedido > li.active").attr("id");

        showEdit(getRow(id), function(row){
            row.pax = $("#btnPax").text();
            updateRow(id, row);
        });
        
    });

    $("#btnMostrarCategorias").click(function(){
        $("#btnMostrarCategorias").addClass("d-lg-none");
        $("#btnMostrarProductos").removeClass("d-lg-none");
        //
        $("#lstProductos").addClass("d-lg-none");
        $("#lstCategorias").removeClass("d-lg-none");
    });

    $("#btnMostrarProductos").click(function(){
        $("#btnMostrarProductos").addClass("d-lg-none");
        $("#btnMostrarCategorias").removeClass("d-lg-none");
        //
        $("#lstCategorias").addClass("d-lg-none");
        $("#lstProductos").removeClass("d-lg-none");
    });

    $("#lstCategorias > li").click(function(){
        $("#btnMostrarProductos").trigger("click");
    });

    /*$("#lstProductos > li").hammer().on('swipeleft', function () {
        $(this).trigger("dblclick");
    });*/

    /*$("#lstProductos > li").dblclick(function(){
        $(this).addClass("active").siblings().removeClass("active");
        addRow({
            "nro": $("#lblNro").text(),
            "pax": $("#btnPax").text(),
            "productoId": $(this).find("div.productoId").text(),
            "producto": $(this).find("div.productoNombre").text(),
            "cantidad": 1,
            "unitario": $(this).find("div.productoUnitario").text(),
            "total": 1 * parseFloat($(this).find("div.productoUnitario").text()),
            "enviado": false
        })
    });*/

    $("#btnSelectPax > a").click(function(){
        //console.log($(this).html());
        if($(this).html()=="Mas..."){

        }else{
            $("#btnPax").html($(this).html())
        }
    });

    $("#btnAtenciones").click(function(){
        console.log("btnAtenciones");
        showAtenciones(null, null);
    });

});