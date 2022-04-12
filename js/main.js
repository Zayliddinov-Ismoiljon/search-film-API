const elForm= document.querySelector(".form");
const elInput = document.querySelector(".form__input");
const elList= document.querySelector(".list");
const elPrevBtn= document.querySelector(".prev");
const elNextBtn= document.querySelector(".next");
const elPaginationList= document.querySelector(".pagination");
const elFilmTemplate= document.querySelector(".film-template").content;
const elPagenationTemplate= document.querySelector(".pagenation-template").content;


const API__Key = "5fdda024";
// let search= "iron";

let activePage=1;


function renderFilm(arr, element){
    element.innerHTML="";
    elInput.value="";
    const elFragment= document.createDocumentFragment();
    arr.forEach(item=>{
        const clonedTemplate= elFilmTemplate.cloneNode(true);
        clonedTemplate.querySelector(".list__img").src = item.Poster;
        clonedTemplate.querySelector(".list__title").textContent= item.Title;
        clonedTemplate.querySelector(".list__year").textContent=item.Year;
        clonedTemplate.querySelector(".list__type").textContent= item.Type;
       
       elFragment.appendChild(clonedTemplate)
    })

    element.appendChild(elFragment)
}

async function getMovie(){
    const res = await fetch(`http://www.omdbapi.com/?apikey=${API__Key}&s=${search}&page=${activePage}`)
    const data = await res.json();
    if(data.Response && data.Search.length>0){
        renderFilm(data.Search, elList);
    }

    const totalPage= Math.ceil(data.totalResults/10);

    elPaginationList.innerHTML= "";

    for(let i=1; i<=totalPage; i++){
        const clonedItem= elPagenationTemplate.cloneNode(true);
        clonedItem.querySelector(".page-link").textContent=i;
        clonedItem.querySelector(".page-link").dataset.pageId=i;
        elPaginationList.appendChild(clonedItem)
    }

    if(activePage==1){
        elPrevBtn.classList.add("disabled");
    }else{
        elPrevBtn.classList.remove("disabled");
    }

    if(activePage==totalPage){
        elNextBtn.classList.add("disabled");
    }else{
        elNextBtn.classList.remove("disabled");
    }
    
}

elForm.addEventListener("submit", evt=>{  //keypress, keyup, keydown, iput, change
    search= elInput.value;
    evt.preventDefault();
    
    getMovie()

    elPrevBtn.addEventListener("click", evt=>{
        activePage--;
        getMovie()
    })
    
    elNextBtn.addEventListener("click", evt=>{
        activePage++;
        getMovie()
    })

})

elPaginationList.addEventListener("click", evt=>{
    if(evt.target.matches(".page-link")){
        activePage= evt.target.dataset.pageId;
        getMovie();
    }
})

getMovie()






