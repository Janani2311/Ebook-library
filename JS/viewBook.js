
const urlParams = new URLSearchParams(window.location.search)
const book_id = urlParams.get("id")
const API_URL = `https://www.googleapis.com/books/v1/volumes/${book_id}`;

//Function to display the book image, description and the preview button

function showDetails(e){
    let description = document.getElementById("description");
    description.innerHTML='';
  
    description.innerHTML = `
        <div class="book-image"><img src="${e.volumeInfo.imageLinks.large}" alt="${e.volumeInfo.title}"></div>
        <div class="book-description">
        <h1>${e.volumeInfo.title}</h1>
        <p>${e.volumeInfo.description}</p>
        <button type="button" class="btn btn-info" onClick="initialize('${book_id}')">Preview</button>
        </div>`   
}

//Functionalities to preview the book in a canvas when preview button is clicked
google.books.load({"language":"en"});

function alertNotFound() {
    alert("could not embed the book!");
}

function alertInitialized() {
    alert("book successfully loaded and initialized!");
  }

function initialize(id) {

    var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
    viewer.load(id, alertNotFound, alertInitialized);
  }

/*--------------------------------------------------------------------------------------------------------*/


//fetch details of the selected books
async function fetchData(){
    try {
        let res = await fetch(API_URL)
        let data = await res.json()
        if(res.status===200)
            showDetails(data);
        else
            alert(`${res.status} - ${res.statusText}`)
    } catch (error) {
        console.error(error)
    }
}

fetchData();
