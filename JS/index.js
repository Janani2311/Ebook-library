console.log("index.js");

const API_key = "AIzaSyDzq728O_UgbcmU0Y5_VmDlEdNb0PpYv_U";
let API_URL = `https://www.googleapis.com/books/v1/volumes?q=javascript&maxResults=40&key=${API_key}`;


//Function to fetch books based on value in search input field

let myForm = document.getElementById("content-search");
let searchBook = document.getElementById("search-value");
myForm.addEventListener('submit',async(e)=>{
    e.preventDefault();
    API_URL = `https://www.googleapis.com/books/v1/volumes?q=${searchBook.value}&maxResults=40&key=${API_key}`;
    if(searchBook.value != '')
        fetchData();
    else
        alert("Enter a valid book name/category");
    
})

//Function to fetch books based on category list in a Category dropdown

const container = document.querySelector("#selected-category");
const listItems = container.querySelectorAll("a.dropdown-item");
listItems.forEach(function(item) {
    item.onclick = async function(e) {
        searchBook.value = this.innerText;
        API_URL = `https://www.googleapis.com/books/v1/volumes?q=${this.innerText}&maxResults=40&key=${API_key}`;
        fetchData();
        
    }
  });

//Function to fetch books based on features list in a feature dropdown

const container_feature = document.querySelector("#selected-feature");
const books_age = container_feature.querySelectorAll("a.dropdown-item");
books_age.forEach(function(item) {
    item.onclick = async function(e) {
        if(this.innerText == "old books")
        oldBooks();
        else
        newBooks();
        
    }
  });

async function oldBooks(){
    let data = await fetchData();
    let oldBooks_Data = data.items.filter((e)=> {
        return parseInt(e.volumeInfo.publishedDate.substring(0,4)) < 2015
    })

    console.log(oldBooks_Data)
    listData(oldBooks_Data);

}

async function newBooks(){
    let data = await fetchData();
    let newBooks_Data = data.items.filter((e)=> {
        return parseInt(e.volumeInfo.publishedDate.substring(0,4)) > 2015
    })

    console.log(newBooks_Data)
    listData(newBooks_Data);

}

//function to list data as cards

function listData(data){
    let wrapper =document.getElementById("wrapper");
    wrapper.innerHTML='';
    data.forEach((e) => {

        let card = document.createElement('div');
        card.setAttribute("class","card");
        card.innerHTML = 
        `
            <img src="${e.volumeInfo.imageLinks != undefined ? e.volumeInfo.imageLinks.thumbnail: './../assets/book.jpeg'}" class="card-img-top" alt="${e.title}">
            <div class="card-body flex-column d-flex">
            <p>${e.volumeInfo.title}</p>
            <p style="text-align: right;"> - ${e.volumeInfo.authors != undefined ?  e.volumeInfo.authors[0]: ""}</p>
            <p>E-book availability : ${e.saleInfo.isEbook ? "Yes" : "NO"}</p>
            ${e.saleInfo.listPrice ? `<p>Price:  ${e.saleInfo.listPrice.amount} ${e.saleInfo.listPrice.currencyCode} </p>` : `<p>${e.saleInfo.saleability}</p>` }
            <button type="button" class="btn btn-info mt-auto" onClick="goToDetails('${e.id}')">Details</button>
            </div>
        `
        wrapper.append(card);
    });
}

//Navigate to Viewbook.html page when user clicks on Details button, carrying id ad param.

function goToDetails(id)   
{
    console.log(id)   
    window.location.href=`./../HTML/viewBook.html?id=${id}`
}

// Used fetch() method to fetch data using API url
async function fetchData(){
    try {
        let res = await fetch(API_URL)
        let data = await res.json()
        if(res.status===200){
            listData(data.items);
            console.log(data);
            return data;
        }
        else
            alert(`${res.status} - ${res.statusText}`)
    } catch (error) {
        console.error(error)
    }
}
fetchData();

