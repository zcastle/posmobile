var tplMensajeRow = "<span class='badge badge-warning' id='{id}'>{text}</span>"
var tplAdicionalRow = "<span class='badge badge-success' id='{id}'>{text}</span>"

//<div class='col-auto bg-info text-white ln' title='No enviado'>{ln}</div>
var tplPedidoRow = "<li class='list-group-item list-group-item-action pt-2 pb-2' id='{id}'> \
    <div class='row'> \
        <div class='col-auto bg-info text-white ln' title='No enviado'><i class='fas fa-concierge-bell'></i></div> \
        <div class='sr-only productoId'>{productoId}</div> \
        <div class='col'> \
            <div class='row'> \
                <div class='col producto'>{producto}</div> \
            </div> \
            <div class='row'> \
                <div class='col' id='lstMensajes'> \
                </div> \
            </div> \
            <div class='row'> \
                <div class='col' id='lstAdicionales'> \
                </div> \
            </div> \
        </div> \
        <div class='col-2 text-right unitario'>{unitario}</div> \
        <div class='col-1 text-right cantidad'>{cantidad}</div> \
        <div class='col-2 text-right total'>{total}</div> \
    </div> \
</li>";

var getRow = function(id){
    var row = $("li#" + id);
    var mensajes = [];
    $(row).find("#lstMensajes > span").each(function(){
        mensajes.push({
            "id": $(this).attr("id"),
            "text": $(this).text()
        });
    });
    return {
        "id": id,
        "productoId": $(row).find("div.productoId").text(),
        "producto": $(row).find("div.producto").text(),
        "cantidad": $(row).find("div.cantidad").text(),
        "unitario": $(row).find("div.unitario").text(),
        "total": $(row).find("div.total").text(),
        "mensajes": mensajes
    }
}

var getRows = function(){
    var rows = [];
    $("#tblPedido > li").each(function(){
        rows.push(getRow($(this).attr("id")));
    });
    return rows;
}

var isEnviado = function(id){
    return $("li#"+id).find("div.row > div.bg-success").length == 1;
}

var setEnviado = function(id){
    $("li#"+id).find("div.row > div.bg-info").removeClass("bg-info").addClass("bg-success").attr("title", "Enviado");
}

var removeRow = function(id){
    $("li#"+id).remove();
    reNumber();
}

var reNumber = function(){
    var i = 1;
    $("#tblPedido > li").each(function(){
        $("li#"+$(this).attr("id")).find("div.ln").text(i++);
    });
}

var updateRow = function(id, row){
    var curRow = $("li#"+id);
    if(row.cantidad != undefined){
        $(curRow).find("div.cantidad").text(row.cantidad);
    }
    if(row.unitario != undefined){
        $(curRow).find("div.unitario").text(toNumber(row.unitario));
    }

    if(row.mensajes!=undefined){
        $(curRow).find("#lstMensajes").empty();
        if(row.mensajes.length > 0){
            for(i in row.mensajes){
                $(curRow).find("#lstMensajes").append(tplMensajeRow.replace("{id}", row.mensajes[i].id).replace("{text}", row.mensajes[i].text));
            }
        }
    }
    if(row.adicionales!=undefined){
        $(curRow).find("#lstAdicionales").empty();
        if(row.adicionales.length > 0){
            for(i in row.adicionales){
                $(curRow).find("#lstAdicionales").append(tplAdicionalRow.replace("{id}", row.adicionales[i].id).replace("{text}", row.adicionales[i].text));
            }
        }
    }
    $.put(URL_SERVICE + "/pedido/" + id + "?token=" + session.token, row, function(response){
        console.log(response);
        //$("#tblPedido").append(newPedidoRow(row));
    });
}

var existeProducto = function(productoId){
    var res = undefined;
    $("#tblPedido > li").each(function(){
        e = $(this).find("div.row > div.productoId:contains('"+productoId+"')");
        if(e.length > 0){
            res = $(this);
        }
    });
    return res;
}

var addRow = function(row){
    var e = existeProducto(row.productoId);
    console.log(e);
    if(e != undefined){
        console.log("LINEA ID: " + e.attr("id"));
        var curRow = getRow(e.attr("id"));
        row.cantidad = parseFloat(curRow.cantidad) + 1;
        updateRow(curRow.id, row);
    }else{
        //row.id = tempId++;
        //
        $.post(URL_SERVICE + "/pedido?token=" + session.token, {"nro": row.nro, "pax": row.pax, "productoId": row.productoId}, function(response){
            console.log(response);
            row.id = response.data.id;
            $("#tblPedido").append(newPedidoRow(row));
        });
    }
}

var clear = function(){
    $("#tblPedido").empty();
}

var newPedidoRow = function(row){
    var tplRow = $(tplPedidoRow
        .replace("{id}", row.id)
        .replace("{ln}", $("#tblPedido").children().length + 1)
        .replace("{productoId}", row.productoId)
        .replace("{producto}", row.producto)
        .replace("{unitario}", toNumber(row.unitario))
        .replace("{cantidad}", row.cantidad)
        .replace("{total}", toNumber(row.total)));
    

    tplRow.click(function(){
        $(this).addClass("active").siblings().removeClass("active");
        $("#btnEliminar").removeClass("disabled");
        $("#btnEditar").removeClass("disabled");
    }).dblclick(function(){
        $("#btnEditar").trigger("click");
    })

    if(row.enviado){
        tplRow.find("div.row > div.bg-info").removeClass("bg-info").addClass("bg-success").attr("title", "Enviado");
    }

    return tplRow;
}