var usuariosClick = function(){
    $(this).addClass("active").siblings().removeClass("active");
    $("#txtUsuarioId").val($(this).attr("id"));
    $("#txtUsuarioNombre").text($(this).text());
    $("#txtUsuarioClave").val("");
}

var btnClaveClick = function(){
    if($("#txtUsuarioId").val() == 0){
        console.log("Falta seleccionar el usuario");
        return;
    }
    $("#txtUsuarioClave").val($("#txtUsuarioClave").val() + $(this).text());
}

var btnBorrarClaveClick = function(){
    $("#txtUsuarioClave").val("");
}

var login = function(){
    var data = {
        "id": $("#txtUsuarioId").val(),
        "pass": $("#txtUsuarioClave").val()
    }

    if(data.id == 0){
        showMessage("Seleccione su usuario de la lista");
        return;
    } else if (data.pass == ""){
        showMessage("ingrese su clave");
        return
    }

    //var l = showLoading("Authenticando...");
    $.post(URL_SERVICE + "/usuarios", data, function(response){
        console.log(response);
        if(response.data.isLogin == "true"){
            MYSESSION.set({"usuarioId": data.id, "token": response.data.token});
            window.location.href = "/pedido";
        }else{
            showMessage(response.data.message);
            $("#txtUsuarioClave").val("");
        }
        //l.modal("hide");
    });
    //MYSESSION.set({"usuarioId": data.id, "token": ""});
    //window.location.href = "/pedido";
}

//var l = null;
$(document).ready(function(){
    console.log("acceso.js");

    $.ajaxSetup({
        "error":function(a,b) {
            console.log(a);
            console.log(b);
            //l.modal("hide");
            showMessage("Error en el servicio");
        }
    });

    //l = showLoading("Cargando Usuarios...");
    $.getJSON(URL_SERVICE + "/usuarios", function(response){
        var data = response.data;
        for(i in data){
            var e = "<li class='list-group-item' id='" + data[i].id + "'>";
            if(data[i].cargo == "MOZO"){
                e += "<i class='fas fa-user'></i> ";
            }else{
                e += "<i class='fas fa-user-edit'></i> ";
            }
            e += data[i].nombre + "</li>";
            $("ul#lstUsuarios").append(e);
        }
        $("ul#lstUsuarios > li").click(usuariosClick);
        //l.modal("hide");
    });

    /*for(var i = 1; i <= 5; i++){
        var e = "<li class='list-group-item' id='" + i + "'>";
        e += "<i class='fas fa-user'></i> ";
        e += "Mozo " + i + "</li>";
        $("ul#lstUsuarios").append(e);
    }
    $("ul#lstUsuarios > li").click(usuariosClick);*/

    $("div#btnClave > div.btn-outline-dark").click(btnClaveClick);
    $("div#btnClave > div.btn-outline-danger").click(btnBorrarClaveClick);
    $("button#btnAcceder").click(login);
    
});