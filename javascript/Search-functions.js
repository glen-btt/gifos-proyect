////////////////////////////////////////////////////
// START SEARCH BUTTON! normal or disable style and shows related terms section
var button = document.getElementById("search-button");

function keyCode(event) {
  var x = event.keyCode;
  if (x === 13) {
    
    //event.searchFunction();
    //button.click();
    alert ("You pressed enter!");
  }
}

//if(event.keyCode === 13) {
  //alert("apretaste eneter")
  
//}


searchText.addEventListener("keyup", e => {
    var searchInput = e.target.value; //global variable that contains the text search
    //console.log(searchInput)

    
    if(searchInput == "")
    { 
      button.disabled =true; //button available
      const searchIcon = document.getElementById('searchIcon');
      searchIcon.src = "/assets/lupa_light.svg";
      document.getElementById('related-terms-section').style.display="none";
    } else {
      button.disabled =false; //button not available
      const searchIcon = document.getElementById('searchIcon');
      searchIcon.src = "/assets/lupa.svg";
      document.getElementById('related-terms-section').style.display="block";
    }


  //function to show or not the related terms section
  function relatedTermsFunction(searchInput){ 
  
    //TENOR FUNCTION TO SEARCH RELATED TERMS !!!

    // url Async requesting function
    function httpGetAsync(theUrl, callback)
    {
        // create the request object
        var xmlHttp = new XMLHttpRequest();
    
        // set the state change callback to capture when the response comes in
        xmlHttp.onreadystatechange = function()
        {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            {
                callback(xmlHttp.responseText);
            }
        }
      
        // open as a GET call, pass in the url and set async = True
        xmlHttp.open("GET", theUrl, true);
      
        // call send with no params as they were passed in on the url string
        xmlHttp.send(null);
      
        return;
    }

    // callback for search suggestion event
    function tenorCallback_searchSuggestion(responsetext)
    {
        var response_objects = JSON.parse(responsetext);
    
        predicted_words = response_objects["results"];
            

        //print the words in HTML
        document.getElementById("related-term-1").innerHTML = predicted_words[0];
        document.getElementById("related-term-2").innerHTML = predicted_words[1];
        document.getElementById("related-term-3").innerHTML = predicted_words[2];

    }

    // set the apikey and limit
    var apikey = "key=8DHPDNFIFMH9";
    var lmt = 5;

    // using default locale of en_US
    var autoc_url = "https://api.tenor.com/v1/search_suggestions?" + apikey + "&q=" + searchInput
        + "&limit=" + lmt;

        
      //changed the search Input variable i got in the first part of the function

    // send search suggestion request
    httpGetAsync(autoc_url,tenorCallback_searchSuggestion);

  //});

  } //closes the whole related terms function
  relatedTermsFunction(searchInput); //executes the function
  // END RELATED TERMS SEARCH
  ////////////////////////////////////////////////////

});
// END SEARCH BUTTON! style normal or disable style and shows related terms section
////////////////////////////////////////////////////



////////////////////////////////////////////////////
// START SEARCH BUTTON FUNCTION! 
/* When the user clicks on the button, search what he wrote*/
var url="https://api.tenor.com/v1/search";
var query = "?q=";
var myTrendTerm = document.getElementById("word");
var apikey = "key=8DHPDNFIFMH9";


//this is a function if you want to enter instead of clicking the button

/*searchText.addEventListener("keyup", function(event){
  if (event.keyCode === 13) {
   event.searchFunction();
   document.getElementById("search-button").click();
  }
}); //NOT WORKING!


/* When the user clicks on the button, search what he wrote*/
function searchFunction(){
  var apiUrl="https://api.tenor.com/v1/search"; 
  var searchText= document.getElementById("searchText").value; //gets the text in the input bar
  
  document.getElementById("searched-text-html").textContent = searchText;//this adds the searched text to html
  searchTermSaved(searchText);

  searchText = searchText.replace(/\s+/g, '-').toLowerCase(); //spaces replaced with hyphens
  
  var url = apiUrl + query + searchText + "&api_" + apikey;//creates the link url
  

  fetch(url,{
    method: "POST",
    })


  .then(function(response){
    return response.json();
  })

  .then(function(myJson){
    var searchResults = myJson;

    
    //this cleans the related terms suggestion
    document.getElementById('related-terms-section').style.display="none";

    //this cleans the dom in case there were previous elements from anoher search
    const myNode = document.getElementById("images-from-fetch");
    myNode.innerHTML = "";

    var i=0; //so the for each function iterates the numbers in the array
    var x=0;
    

    searchResults.results.forEach(function(){

      //creates the image
      let img1 = document.createElement('img');
      let link = searchResults.results[i++].media[0].gif.url; //links the gif from tenor to image in html
      img1.src = link; 
      img1.alt = link;
      img1.className = "gif-trend-img";
      
      let div1 = document.createElement('div');
      div1.className = "gif-trend-bar"; 
      div1.appendChild(img1);
      

      //creates the text and links it
      let link2 = searchResults.results[x++].itemurl;
      let link3 = link2.split("https://tenor.com/view/");
      let result = link3[link3.length -1];
      var result2 = result.split("-");

      let p1 = document.createElement('p');//text in gradient bar
      p1.textContent = "#"+ result2[0] +" " +"#" + result2[1] +" " +"#" + result2[3];
      
      let div3 = document.createElement('div');
      div3.className = "grid-item-mini-color-bar2"; //gradient bar section
    
      div3.appendChild(p1);
      div1.appendChild(div3);
      

      document.getElementById("images-from-fetch").appendChild(div1);
       
    });

  
    //this deletes the other sections
      document.getElementById("trends").style.display="none";
      document.getElementById("recommended-gifs").style.display="none";
      document.getElementById("search-result").style.display="block";
    })
    
  .catch(function(error){
  console.log("There was an error searching your term");
  })
};

//CREATED FOR THE RELATED TERMS SEARCH, WHEN YOU CLICK BUTTON CHANGES THE INPUT ON THE SEARCH BAR
function setTextToInput1(){
 var suggestedTerm = document.getElementById("related-term-1").textContent;
 document.getElementById("searchText").value = suggestedTerm;
}

function setTextToInput2(){
  var suggestedTerm = document.getElementById("related-term-2").textContent;
  document.getElementById("searchText").value = suggestedTerm;
}

function setTextToInput3(){
  var suggestedTerm = document.getElementById("related-term-3").textContent;
  document.getElementById("searchText").value = suggestedTerm;
}

//SAVES THE SEARCHED TERM
function searchTermSaved(searchText){
  if(searchText==null){
    console.log("There are no saved Words");

 }else{
     var searchedTerm;

     if(localStorage.getItem("searchedTerm")==null){
        searchedTerm = [];
     }else{
        searchedTerm = JSON.parse(localStorage.getItem("searchedTerm"));
     }

     searchedTerm.push(searchText);
 
     console.log(searchText);
     
     localStorage.setItem("searchedTerm", JSON.stringify(searchedTerm));
     showSavedTerms(searchedTerm);

 }
}

//function that shows the searched words
function showSavedTerms(searchedTerm){
  if(localStorage.getItem("searchedTerm")==null){
      console.log("There are no words to show");

   }else{
       
    searchedTerm = JSON.parse(localStorage.getItem("searchedTerm"));
    document.getElementById("search-result2")

    //this cleans the dom in case there were previous elements from anoher search
    const newNode = document.getElementById("search-result2");
    newNode.innerHTML = "";

    searchedTerm.forEach(function(searchText){

          let p1 = document.createElement('p'); 
          p1.textContent =  searchText;
          document.getElementById("search-result2").appendChild(p1);
          
      })
  }

}























//COMENTARIOOOOOOOOOOOOOOOOOOS!!

  /*
  var pedazoHTML = '';
    var out = document.getElementById('test1');
    var i;

  for(i=0;i<searchResults.results.length;i++){
      var x =`<img src="${searchResults.results[i].media[i].tinygif.url}"/>`;
      console.log(x);
    }
//asigno las imagenes al contenedor
    //out.innerHTML = pedazoHTML;


for(i=0;i<20;i++){

            
  var imgg = document.createElement ('img');
  imgg.src = searchResults.results[i].media[i].tinygif.url;
  var out = document.getElementById('test');
  out.appendChild(imgg);
  
       //var img = document.createElement('img');
      //img.src = searchResults.results[0].media[0].tinygif.url;
      //var out = document.getElementById('gifs-img-block123');
      //out.appendChild(img);
  };

const imgg = document.createElement("img");
      imgg.src = results.media.tinygif.url;
      imgg.classList.add("results-thumb");
      container.appendChild(img);








/*function printInHtml(MyJson){
  for(var i=0;i<myJson.result.lenght;i++){
    createImg(result.results[i].media[i].tinygif.url);
  }
}*/

////////////////////////////////////////////////////
// START SEARCH BUTTON FUNCTION! 
/* When the user clicks on the button, search what he wrote*/

/// TRENDING SECTION//
//VARIABLES to get trending items!!!!!!!!!!!!

/* COPIA DE SEGURIDAD POR LAS D
.then(function(myJson){
  var searchResults = myJson;
  console.log(searchResults);

  var i;
  var out = document.getElementById('test');

  for(i=0;i<searchResults.results.length;i++){
    var imgg = document.createElement ('img');
    imgg.src = searchResults.results[i].media[i].tinygif.url;
    out.appendChild(imgg);
  }
  */