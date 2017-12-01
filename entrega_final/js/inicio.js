$(function(){
    $("#boton").on("click",validarUsuario); //Se dispara al presionar el boton

    function validarUsuario(e){
        e.preventDefault();
        var endpoint_juegos = "http://localhost:3000/users";
        $.ajax({    // se realiza llamado a ajax 
            type: "GET",
            url: endpoint_juegos,
            data: { email :  $("#inputEmail3").val() }, //se filtra por datos de email
            success:function(data){
                var person=data[0]; 
                var contraseña=$("#InputPassword1").val();
                if(contraseña==person.password){
                    localStorage.setItem("usuario",JSON.stringify(person));
                    window.location="index.html";
                }
                else{
                    alert("La contraseña ingresada no es correcta");
                }
            }
        });
    };
});