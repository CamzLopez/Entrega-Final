$(function(){
$("#boton").on("click",validar_clave); //Al presionar el boton se dispara la funcion
function validar_clave(e) {
    e.preventDefault();
    var caract_invalido = " ";
    var cla1 = document.getElementById("inputPassword3").value;
    var cla2 = document.getElementById("inputPassword2").value;
    if (cla1 == '' || cla2 == '') {
    alert("Debes introducir tu clave en los dos campos.");
    return false; // se verifica que los campos no esten vacios
    }
    
    else if (cla1 != cla2) {
    alert ("Las claves introducidas no son iguales");
    
    return false; // se verifica que las claves sean iguales
    }
    else{
     return validarUsuario();   // si se cumplen las condiciones se pasa al ajax
        }       
    
    }
    function validarUsuario(){
            var endpoint_juegos = "http://localhost:3000/users";
            $.ajax({    // se realiza llamado a ajax 
                type: "GET",
                url: endpoint_juegos,
                data: { email :  $("#inputEmail3").val() },
                success:function(data){ 
                    if(data.length > 0){
                     alert("El email ya se encuentra registrado"); // si el email esta registrado no se envia el formualrio
                    }
                    
                    else{
                         // si el email no esta registrado, se obtiene los datos
                         var person = {
                            'apellido':$("#inputName2").val(),   
                            'email':$("#inputEmail3").val(),
                            'name': $("#name").val(),
                            'password':$("#inputPassword3").val(),
                            'sexo':$("input[name=gridRadios]").val(),
                            'newsletter':"true",
                            'carrito':[]
                        
                            };
                            crearUsuario(person); // se pasan los datos para crear el usaurio
                            function crearUsuario(usuario){ // toma los parametros   
                                var xhr = new XMLHttpRequest();
                                var url = "http://localhost:3000/users";
                                xhr.open("POST", url, true);
                                xhr.setRequestHeader("Content-type", "application/json");
                                xhr.onreadystatechange = function () {
                                    if (xhr.readyState === 4 && xhr.status === 200) {
                                    var json = JSON.parse(xhr.responseText);
                                    }
                            };
                            xhr.send(JSON.stringify(usuario)); // se crea el usuario en el db.json
                            return window.location="sesion.html";
                            }
                        }
                    }
                });  
    
            }
});         
