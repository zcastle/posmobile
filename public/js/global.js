// CONSTANTES
var URL_SERVICE = "http://192.168.0.19:8080/mobile/v1";

var MYSESSION = {
    set: function(value){
        localStorage.setItem("POS", JSON.stringify(value));
    },
    get: function(){
        return JSON.parse(localStorage.getItem("POS"));
    }
};

// UTILIDADES