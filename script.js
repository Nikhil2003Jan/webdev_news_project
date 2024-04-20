const API_KEY="5ec5f17e45a5466497f81672fcb5d019"
const url="https://newsapi.org/v2/everything?q="
window.addEventListener('load',()=>fetchNews("India"));
async function fetchNews(query)
{
    const res= await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const  data= await res.json();
    bindData(data.articles);
}
function bindData(articles){
    const cardcontainer = document.getElementById('main-card');
    const newscardtemplate =document.getElementById('template');
    cardcontainer.innerHTML="";

    articles.forEach(article=>{
    
        if(!article.urlToImage)
        {
            return;
        }
        const cardclone= newscardtemplate.content.cloneNode(true);
        fillDataInCard(cardclone,article);
        cardcontainer.appendChild(cardclone);
    });
}

function fillDataInCard(cardclone,article)
{
    const newsimg = cardclone.querySelector('#newsimg');
    const newstitle = cardclone.querySelector('#newstitle');
    const newssource = cardclone.querySelector('#news-source');
    const newsdesc = cardclone.querySelector('#news-desc');

    newsimg.src= article.urlToImage;
    newstitle.innerHTML=article.title;
    newsdesc.innerHTML=article.description;
    
    const date= new Date(article.publishedAt).toLocaleString("en-Us",{timeZone:"Asia/Jakarta",
    });
    newssource.innerHTML=`${article.source.name} . ${date}`;
    cardclone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    })
}
function reload(){
    window.location.reload();
}

let currselected=null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    currselected?.classList.remove('active');
    currselected=navItem;
    currselected.classList.add('active');
}

const searchbutton=document.getElementById('search-button');
const searchtext =document.getElementById('input-text');
searchbutton.addEventListener('click',()=>{
    const query = searchtext.value;
    if(!query) return;
    fetchNews(query);
    currselected?.classList.remove('active');
    currselected=null;
});