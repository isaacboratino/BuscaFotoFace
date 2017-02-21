<!DOCTYPE html>
<html>
<head>
  <title>Busca Fotos Facebook</title>
  <meta charset="UTF-8">

<style>
  #fotosFace > a {
    float:left;
    background-color: #97B;
  }

  #fotosFace > span {
    float:right;
    clear:both;
	  /*width: 90%;*/
    background-color: #EFE;
  }

  #fotosFace > div {
    float:left;
    width: 50%;
  }
</style>

</head>
<body>
  <script>

    // Faz load do SDK do facebook de forma sincona
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));


  window.fbAsyncInit = function() {
    FB.init({
      appId      : '435187766689207',
      cookie     : true,  
      xfbml      : true,  
      version    : 'v2.8'
    });

    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });

  };

  function statusChangeCallback(response) 
  {
    console.log('statusChangeCallback');
    console.log(response);

    // for FB.getLoginStatus().
    if (response.status === 'connected')     
    {
      // Ao se logar no faceboock execute esta function
      queryFacebookAPI("/140969332682491/feed?fields=id,name,picture,full_picture,description,message,object_id,parent_id,type,link,timeline_visibility&limit=100");

    } 
    else if (response.status === 'not_authorized') 
    {
      document.getElementById('status').innerHTML = 'Por favor se logue nesse aplicativo.';
      FB.login();

    } 
    else 
    {
      document.getElementById('status').innerHTML = 'Por favor se logue no Facebook.';
      FB.login();
    }
  }

  // Ao se logar, fas a busca no facebook com a api
  var contador = 0;
  function queryFacebookAPI(api_url) 
  {
    console.log('Bem vindo a api face! Lendo informações.... ');

    FB.api(api_url,
        function (response) {
          if (response && !response.error) 
          {

            var fotosFace = '';

            for ( i = 0; i < response.data.length; i++)
            {
                fotosFace += templateImages(response.data[i], ++contador);
            }            

            document.getElementById('fotosFace').innerHTML += fotosFace;

            console.log('Next: ' + response.paging.next);
            queryFacebookAPI(response.paging.next);            
        }
      }
    );
  }

  // Checa se foi feito o login
  function checkLoginState() 
  {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  function templateImages(linha, contador) 
  {
      return '<div><a href='+linha.link+' target=_blank>'
      +'<img src=\"'+linha.full_picture+'\" width=100 height=100>'
      +'</a>'
      +'<span>'+contador+' : '+linha.description+' '+linha.message+'</span><div>';
  }

  </script>

  <fb:login-button scope="public_profile,email" onlogin="checkLoginState();">
  </fb:login-button>

  <div id="fotosFace">
  </div>

</body>
</html>