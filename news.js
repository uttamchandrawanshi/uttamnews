const API_KEY = "df59278630184b16a618f7c4c4acee52";
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener("load", ()=> fetchnews("india"));

function reload() {
    window.location.reload();
}

async function fetchnews(query){
   const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
   const data = await res.json();
   bindData(data.articles);
};

function bindData(articles){
    const cardcontainer = document.getElementById('cards-container');
    const newscardtemplete = document.getElementById('template-news-card');

    cardcontainer.innerHTML = "";

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardclone = newscardtemplete.content.cloneNode(true);
        fillDataIncard(cardclone,article);
        cardcontainer.appendChild(cardclone);
        
    });
};
function fillDataIncard(cardclone , article){
    const newsImg = cardclone.querySelector('#news-img');
    const newsTitle = cardclone.querySelector('#news-title');
    const newsSourse = cardclone.querySelector('#news-sourse');
    const newsDesc = cardclone.querySelector('#news-disc');


    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    
    
    const date = new Date(article.publishedAt).toLocaleString("en-us", {
        timeZone: "Asia/jakarta",
    });
    newsSourse.innerHTML = `${article.source.name} . ${date}`;
     cardclone.firstElementChild.addEventListener("click" , ()=>{
        window.open(article.url, "_blank");
     });
}
let curselectitem = null;
function onnavitemclick(id){
    fetchnews(id);
    const navitem = document.getElementById(id);
    curselectitem?.classList.remove('active');
    curselectitem = navitem;
    curselectitem.classList.add('active');
}
const searchbotton = document.getElementById('search-botton');
const  searchtext =  document.getElementById('search-text');

searchbotton.addEventListener("click", ()=>{
    const query = searchtext.value;
    if(!query) return;
    fetchnews(query);
    curselectitem?.classList.remove('active');
    curselectitem = null;
})

