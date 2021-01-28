function procura()
{
    var link = 'https://api.unsplash.com/photos/?client_id=60R9shKlaRd74MMgoYq1Qy6cOzgz9R8tyKifF7zXhlw&language=en-US&per_page=24&order_by=latest&page='
    var linkPaged = link + page;
    $.ajax({
        url : linkPaged,
        type : "get",
        async : true,
        success : function(data, status, response) 
        {
            adicionarFotos(data);
        }
    })
}

function adicionarFotos(dataResposta)
{
    $('#contentorFotos').empty();

    console.log(dataResposta);

    for(var i = 0; i<dataResposta.length; i++)
    {
        var foto = dataResposta[i];
        criarFoto(foto);
    }
}

function criarFoto(foto)
{
    // criar imagem
    var download = document.createElement("i");
    download.className = "fa fa-download"

    // criar botao
    var buttonD = document.createElement("a");
    buttonD.className = "btn btn-secondary";
    buttonD.appendChild(download);

    // criar h5
    var h5 =document.createElement("h5");
    h5.className = "card-title"
    h5.innerText = foto.user.name;

    // criar h6
    var h6 =document.createElement("h6");
    h6.className = "card-title"
    h6.innerText = foto.description;

    // criar div filha
    var div = document.createElement("div");
    div.className = "card-body";
    div.appendChild(h5);
    div.appendChild(h6);
    div.appendChild(buttonD);

    // criar img
    var img = document.createElement("img");
    img.className = "card-img-top";
    var imgSrc = foto.urls.raw + "&fit=crop&w=500&h=500";
    img.setAttribute("src", imgSrc);
    // criar div pai
    var divPrincipal = document.createElement("div");
    divPrincipal.className = "card col-lg-3 col-md-4 col-sm-5";
    // adicionar filhos à div pai
    divPrincipal.appendChild(img);
    divPrincipal.appendChild(div);
    // adicionar div pai à pagina/DOM
    var container = document.getElementById("contentorFotos");
    container.appendChild(divPrincipal);
}

function programarCarregamentoPagina() {
    $(window).on("load", procura);
}

function anterior() {
    if(page == 1)
    {
        page = 1;
    }
    else
    {
        page = page - 1;
    }
    procura();
}

function seguinte() {
    page = page + 1;
    procura();
}

function programarBotoesPaginacao() {
    var botaoAnterior = document.getElementById("anterior");
    var botaoSeguinte = document.getElementById("seguinte");

    botaoAnterior.addEventListener("click", anterior);
    botaoSeguinte.addEventListener("click", seguinte);
}

function programarBotaoSearch() {
    var botaoSearch = document.getElementById("search-button");

    botaoSearch.addEventListener("click", procuraSearch);
}

function programarBotaoDownload() {
    buttonD.addEventListener("click", newTab);
}

function procuraSearch(event)
{
    event.preventDefault()
    var search = $("#search-input").val()
    console.log(search)
    var url = 'https://api.unsplash.com/search/photos?query='+search+'&client_id=60R9shKlaRd74MMgoYq1Qy6cOzgz9R8tyKifF7zXhlw'
    $.ajax({
        url : url,
        type : "GET",
        async : true,
        success : function(data)
        {
            adicionarFotos(data);
        }
    })
}

function newTab()
{
    var window = window.open(foto.urls.regular);
}

programarCarregamentoPagina();
programarBotoesPaginacao();
programarBotaoSearch();

var page = 1;