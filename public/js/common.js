var showLoading = function(text){
    var e = "<div class='modal fade' tabindex='-1' role='dialog' aria-hidden='true'> \
        <div class='modal-dialog modal-dialog-centered modal-sm' role='document'> \
        <div class='modal-content'> \
            <div class='modal-body'> \
                <div class='d-flex align-items-center'> \
                    <div class='spinner-border text-primary' role='status' aria-hidden='true'></div> \
                    <strong>&nbsp;" + text + "</strong> \
                </div> \
            </div> \
        </div> \
        </div> \
    </div>";

    return $(e).modal({
        keyboard: false,
        backdrop: false
    });
}

var showMessage = function(text){
    var e = "<div class='modal fade' tabindex='-1' role='dialog'> \
        <div class='modal-dialog modal-dialog-centered modal-sm' role='document'> \
        <div class='modal-content'> \
            <div class='modal-header'> \
                <h5 class='modal-title'>Mensaje de Sistema</h5> \
                <button type='button' class='close' data-dismiss='modal' aria-label='Close'> \
                <span aria-hidden='true'>&times;</span> \
                </button> \
            </div> \
            <div class='modal-body'> \
                <p>" + text + "</p> \
            </div> \
            <div class='modal-footer'> \
                <button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button> \
            </div> \
        </div> \
        </div> \
    </div>";

    $(e).modal({
        backdrop: false
    });
}

var showConfirm = function(text, cb){
    var e = "<div class='modal fade' tabindex='-1' role='dialog'> \
        <div class='modal-dialog modal-dialog-centered modal-sm' role='document'> \
        <div class='modal-content'> \
            <div class='modal-header'> \
                <h5 class='modal-title'>Confirmacion</h5> \
            </div> \
            <div class='modal-body'> \
                <p>" + text + "</p> \
            </div> \
            <div class='modal-footer'> \
                <button type='button' class='btn btn-secondary' data-dismiss='modal'>No</button> \
                <button type='button' class='btn btn-primary' data-dismiss='modal'>Si</button> \
            </div> \
        </div> \
        </div> \
    </div>";

    $(e).modal({
        backdrop: false
    }).on('shown.bs.modal', function () {
        $(this).find("button.btn-primary").click(function(){
            if(cb) cb();
        });
    });
}

$(document).ready(function(){
    $.each(["put", "delete"], function(i, method) {
        $[method] = function(url, data, callback, type) {
          if ($.isFunction(data)) {
            type = type || callback;
            callback = data;
            data = undefined;
          }
      
          return $.ajax({
            url: url,
            type: method,
            dataType: type,
            data: data,
            success: callback
          });
        };
      });
});