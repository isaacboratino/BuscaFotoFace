var arrayTodasFotos = new Array;
var arrayCategorias = new Array;

var containerFotos = 'fotosFace';

// Faz load do SDK do facebook de forma sincona
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/pt_BR/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


window.fbAsyncInit = function() {
    FB.init({
        appId: '435187766689207',
        cookie: true,
        xfbml: true,
        version: 'v2.8'
    });

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });

};

function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);

    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Ao se logar no faceboock execute esta function
        queryFacebookAPI("/140969332682491/feed?fields=id,name,picture,full_picture,message,object_id,parent_id,type,link,timeline_visibility&limit=100");

    } else if (response.status === 'not_authorized') {
        document.getElementById(containerFotos).innerHTML = 'Por favor se logue nesse aplicativo.';
        FB.login();

    } else {
        document.getElementById(containerFotos).innerHTML = 'Por favor se logue no Facebook.';
        FB.login();
    }
}

// Ao se logar, fas a busca no facebook com a api

function queryFacebookAPI(api_url) {
    console.log('Bem vindo a api face! Lendo informações.... ');

    FB.api(api_url,
        function(response) {
            if (response && !response.error) {

                arrayTodasFotos = response.data;
                montaImagensTela(arrayTodasFotos, document.getElementById(containerFotos).innerHTML);

                // Se ainda não leu todas as paginas
                if (response.data.length == 0) {
                    console.log('Next: ' + response.paging.next);
                    queryFacebookAPI(response.paging.next);
                } else {
                    // se leu todas as paginas
                    criarCategoriasFotos();
                }

            }
        }
    );
}

// Checa se foi feito o login
function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

function montaImagensTela(arrayObjetos, divIncremental) {
    var fotosFace = '';

    for (i = 0; i < arrayObjetos.length; i++) {
        fotosFace += templateImages(arrayObjetos[i]);
    }

    document.getElementById(containerFotos).innerHTML = divIncremental + fotosFace;
}

function templateImages(linha) {
    return '<div class="col-xs-6 col-md-3">' +
        '  <a href=' + linha.link + ' target=_blank class=thumbnail>' +
        '    <img src=\"' + linha.full_picture + '\" ' +
        '         style="height: 200px; width: 100%; display: block;" >' +
        '  </a>' +
        '</div>';
}

function criarCategoriasFotos() {

    for (i = 0; i < arrayTodasFotos.length; i++) {

        if (arrayTodasFotos[i].message != 'undefined' && arrayTodasFotos[i].message != '') {

            var message = '' + arrayTodasFotos[i].message;
            var arrayTextoSeparado = message.toString().split('#sabordelembranca');

            // se encontrou pelo menos uma categoria
            if (arrayTextoSeparado.length > 1) {

                arrayTextoSeparado = arrayTextoSeparado[1].replace(/ /g, '').toString().split('#');

                for (j = 0; j < arrayTextoSeparado.length; j++) {

                    var encontrouCategoriaSimilar = false;

                    for (k = 0; k < arrayCategorias.length; k++) {

                        if (arrayTextoSeparado[j] == arrayCategorias[k]) {
                            encontrouCategoriaSimilar = true;
                            break;
                        }
                    }

                    if (!encontrouCategoriaSimilar) {
                        arrayCategorias.push(arrayTextoSeparado[j]);
                    }

                }

            }
        }
    }
}

function buscarFotosPorCategoria() {
    //
    arrayFotosSelecionadas = arrayTodasFotos.filter(function(obj) {
        var message = '' + obj.message;
        return message.indexOf('urso') != -1;
    });

    montaImagensTela(arrayFotosSelecionadas, '');
}