// funcion para verificar sesion en LocalStorage
var usuario =JSON.parse(localStorage.getItem("usuario"));
if (JSON.stringify(usuario).length>=1){
document.getElementById("sesion").textContent=usuario.firstname;
}

$(function(){
    
    var endpoint_juegos = "http://localhost:3000/juegos";
    
    $.ajax({ // peticion al servidor de los datos de "juegos"
        type: "GET",
        url: endpoint_juegos,
        success: procesar_juegos
    });
});
$(function(){
    
    var endpoint_categorias = "http://localhost:3000/categorias";
    
    $.ajax({ //peticion al servidor de las categorias
        type: "GET",
        url: endpoint_categorias,
        success: procesarCategorias
    });
});

function procesarCategorias(datos) { // carga las categorias
    datos.forEach(cargarCategorias);

}
function cargarCategorias(categorias) { //carga el espacio con las categorias en un comboBox   
    var comboBox = document.getElementById("categoria");
    comboBox.options[categorias.id]=new Option(categorias.nombre)  // define las opciones en el id y el nombre  
  
    }
    function filtrar(e){ //esta funcion se ejecuta en el onchange del html
$(function(){
    
    var comboBox = document.getElementById("categoria"); 
    var endpoint_juegos = "http://localhost:3000/juegos";
    document.getElementById("juegos").innerHTML=''; //Limpia el artículo
    
    $.ajax({ // llamado a ajax con las categorias
        type: "GET",
        data:{categoriaId:comboBox.selectedIndex},
        url: endpoint_juegos,
        success: procesar_juegos
    });
});
    }

function procesar_juegos(datos) {
    datos.forEach(crear_articulo, this);

}

function crear_articulo(juego) { //se crea el contenido con la informacion
    var $article = $("<article>");
    $article.addClass("card");
    var $imagen = $("<img>").appendTo($article);
    var $nombre = $("<h2>").appendTo($article);
    var $juegos = $("section#juegos");
    var $comprar = $("<button>").text("comprar $"+juego.precio).appendTo($article);
    $comprar.attr("data-id",juego.id);
    $imagen.attr("src", juego.coverimg);
    $nombre.text(juego.nombre);
    $juegos.append($article);

}
