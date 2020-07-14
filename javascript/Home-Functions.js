////////////////////////////////////////////////////
// START STYLE BUTTON! night and day theme change
// Check if the theme is already set in localStorage and call checkStylesheet()
function checkStyleSheet() {
	let currentTheme = localStorage.getItem("page_style_new");// Will retrieve and set the current value stored in the localstorage
	if(!currentTheme) {
		swapStyleSheet('style/day-style.css');
	} else {
		swapStyleSheet(currentTheme);
	}
}

// Set the stylesheet for theme and save in localStorage
function swapStyleSheet(stylesheet) {
	document.getElementById("page_style").setAttribute("href", stylesheet);// will set the css sheet style on the href
	localStorage.setItem("page_style_new", stylesheet);// will store the value of the current sheet in local storage
}

checkStyleSheet();


/* When the user clicks on the button, toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("actions").classList.toggle("show");
}

/* Close the dropdown if the user clicks outside of it*/
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("mini-menu");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
// END STYLE BUTTON! night and day theme change
////////////////////////////////////////////////////


////////////////////////////////////////////////////
// START TRENDS HOME SECTION! 1ST BLOCK

/*Variables to get trending items*/
var url="https://api.tenor.com/v1/search";
var query = "?q=";
var myTrendTerm = "friends"
var apikey = "&key=8DHPDNFIFMH9";


//calling the API info - FUNCTION for first section
function getTrends(){
    const found = fetch(url+query+myTrendTerm+apikey)
    .then(function(response){
      return response.json();
    })
    .then(function(myJson){
      var data = myJson;
      
      //linking content to HTML
      let div11 = document.getElementById("grid-item1")
      let img11 = document.createElement('img');
      img11.className = "gif-trend-img"; 
      img11.id="preview_gif";
      img11.alt="preview-gif";
      div11.appendChild(img11);
      document.getElementById("preview_gif").src = data.results[0].media[0].tinygif.url;
      document.getElementById("button-trend-1").action = data.results[0].url;
      document.getElementById("word1").textContent = "#" + data.results[0].title

      let div22 = document.getElementById("grid-item2")
      let img22 = document.createElement('img');
      img22.className = "gif-trend-img"; 
      img22.id="preview_gif1";
      img22.alt="preview-gif";
      div22.appendChild(img22);
      document.getElementById("preview_gif1").src = data.results[1].media[0].tinygif.url;
      document.getElementById("button-trend-2").action = data.results[1].url;
      document.getElementById("word2").textContent = "#" + data.results[1].title

      let div33 = document.getElementById("grid-item3")
      let img33 = document.createElement('img');
      img33.className = "gif-trend-img"; 
      img33.id="preview_gif2";
      img33.alt="preview-gif";
      div33.appendChild(img33);
      document.getElementById("preview_gif2").src = data.results[2].media[0].tinygif.url;
      document.getElementById("button-trend-3").action = data.results[2].url;
      document.getElementById("word3").textContent = "#" + data.results[2].title

      let div44 = document.getElementById("grid-item4")
      let img44 = document.createElement('img');
      img44.className = "gif-trend-img"; 
      img44.id="preview_gif3";
      img44.alt="preview-gif";
      div44.appendChild(img44);
      document.getElementById("preview_gif3").src = data.results[3].media[0].tinygif.url;
      document.getElementById("button-trend-4").action = data.results[3].url;
      document.getElementById("word4").textContent = "#" +data.results[3].title
      
    })
    .catch(function(error){
    console.log("No trends gifs to show here")
    })

    return found;
  }

//conecting to HTML

getTrends();
//END TRENDS HOME SECTION! 1ST BLOCK
////////////////////////////////////////////////////



////////////////////////////////////////////////////
// START TRENDS HOME SECTION! 2ND BLOCK

var url2="https://api.tenor.com/v1/trending?";
var apikey = "key=8DHPDNFIFMH9";

function getLargeTrends(){
  const found = fetch(url2+apikey)

  .then(function(response){
    return response.json();
  })

  .then(function(myJson){
    var data = myJson;
       

    //linking content to HTML
    var i=0; //so the for each function iterates the numbers in the array
    var x=0;

    data.results.forEach(function(){
      
      let link2 = data.results[x++].itemurl;
      let link3 = link2.split("https://tenor.com/view/");
      let result = link3[link3.length -1];
      var result2 = result.split("-")
          
      let div1 = document.createElement('div');
      div1.className = "gif-trend-bar";   

      let div2 = document.createElement('div');
      div2.className = "grid-item-mini-color-bar2"; //gradient bar

      let img2 = document.createElement('img');
      let link = data.results[i++].media[0].tinygif.url; //links the gif from tenor to image in html
      img2.src = link;
      img2.className = "gif-trend-img"; 
      
      let p1 = document.createElement('p');//text in gradient bar
      p1.textContent = "#"+ result2[0] +" " +"#" + result2[1] +" " +"#" + result2[3];
      div2.appendChild(p1);
            
      
      div1.appendChild(img2);
      div1.appendChild(div2);
      
      document.getElementById("trend-imgs2").appendChild(div1);
    });
  

  })

  .catch(function(error){
  console.log("No gifs to show here")
  })

  return found;
}

//conecting to HTML

getLargeTrends();


//created to go back from the term search
document.getElementById("reload-page").onclick = function() {
  window.location.reload();
}

