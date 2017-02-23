var arrayTodasFotos = new Array;
var arrayCategorias = new Array;

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
        document.getElementById('status').innerHTML = 'Por favor se logue nesse aplicativo.';
        FB.login();

    } else {
        document.getElementById('status').innerHTML = 'Por favor se logue no Facebook.';
        FB.login();
    }
}

// Ao se logar, fas a busca no facebook com a api
var contador = 0;

function queryFacebookAPI(api_url) {
    console.log('Bem vindo a api face! Lendo informações.... ');

    FB.api(api_url,
        function(response) {
            if (response && !response.error) {

                arrayTodasFotos = response.data;
                montaImagensTela(arrayTodasFotos, document.getElementById('fotosFace').innerHTML);

                // Se ainda não leu todas as paginas
                if (response.data.length == 0) {
                    console.log('Next: ' + response.paging.next);
                    queryFacebookAPI(response.paging.next);
                } else {
                    // se leu todas as paginas
                    criarDropdownSelecaoFotos();
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
        fotosFace += templateImages(arrayObjetos[i], ++contador);
    }

    document.getElementById('fotosFace').innerHTML = divIncremental + fotosFace;
}

function templateImages(linha, contador) {
    return '<div class="col-xs-6 col-md-3">' +
        '  <a href=' + linha.link + ' target=_blank class=thumbnail>' +
        '    <img src=\"' + linha.full_picture + '\" ' +
        '         style="height: 200px; width: 100%; display: block;" >' +
        '  </a>' +
        '</div>';
    /*+'  <span>' + contador + ' : ' + linha.message + '</span>'*/
}

function criarDropdownSelecaoFotos() {
    //
    arrayFotosSelecionadas = arrayTodasFotos.filter(function(d) {
        var message = '' + d.message;
        return message.indexOf('urso') != -1;
    });

    montaImagensTela(arrayFotosSelecionadas, '');
}