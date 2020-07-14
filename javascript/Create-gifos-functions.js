
var videoImage = document.getElementById("user_video");//img HTML
var videoImage2 = document.getElementById("user_video2"); //video HTML for the preview
var recorder; // globally accessible



//this function was created for the video tag
function previewCamera(){
    document.getElementById("recommended-gifs").style.display="none"
    document.getElementById("saved-gifs").style.display="none"
    
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
        height: { max: 480 }
        }
    })
    .then(function(streaming){
        videoImage2.srcObject = streaming;
        videoImage2.play();
    })
    .catch(function(error) {
        alert('No se ha logrado capturar tu imagen.');
        console.error(error);
    })
}



//this function was created for the img tag
function startRecording(){
    setTimeout(previewCamera, 2000); //stops the preview from the camera
    
    document.getElementById("recommended-gifs").style.display="none"
    document.getElementById("saved-gifs").style.display="none"

    document.getElementById("user_video2").style.display="none";
    document.getElementById("waiting-text").textContent = "1, 2, 3 ya empieza a grabar tu gif ..." //Text that is shown when you wait for your recording to start
   
    document.getElementById('btn-start-recording').style.display = "none"; //deletes the button start then you record
    document.getElementById('btn-start-recording').style.display = "none"; //deletes the button start then you record
    
//    function streamAndRecord(){
        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
            height: { max: 480 }
            }
        })
    
        .then(function(stream){
            videoImage.srcObject = stream;
            
            //start recording and save
            recorder = RecordRTC(stream, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
            
            onGifRecordingStarted: function() {
                        console.log('Gif recording started.');
                    },
                
            onGifPreview: function(gifURL) {
                    videoImage.src = gifURL;
                    document.getElementById("waiting-text").textContent= "";//Hides the waiting text
                    }
            });
                    
            recorder.startRecording();
                    
            // release camera on stopRecording
            recorder.camera = stream;
                        
            document.getElementById('btn-stop-recording').disabled = false;
                        
            document.getElementById('btn-stop-recording').style.display="block";
            document.getElementById("text-above-in-gradient").textContent="Capturando tu guifo";
            
                    //stop recording actions and changes
                    document.getElementById('btn-stop-recording').onclick = function() {
    
                        document.getElementById('btn-stop-recording').style.display="none";
                        recorder.stopRecording(stopRecordingCallback);
                    
                        //changes in DOM when user clicks stop recording button
                        document.getElementById("btn-repeat-capture").style.display="block";
                        document.getElementById("btn-upload-guifo").style.display="block";
                        document.getElementById("text-above-in-gradient").textContent="Vista Previa";
                    };
         
        })
        .catch(function(error){
            alert('No se ha logrado capturar tu imagen.');
            console.error(error);
        })

//    }
};

var gifUpload; //global access

// To stop recording and save it into a new file
function stopRecordingCallback() {
    videoImage.src = URL.createObjectURL(recorder.getBlob());
    recorder.camera.stop();
    
    
    var NEWGIF = new FormData();
    NEWGIF.append("file", recorder.getBlob(), "test.gif");
    console.log(NEWGIF.get("file")) //shows the name of the file to upload

    
    //function that download the gif
    let blob = recorder.getBlob();
    document.getElementById('download-button').onclick = function() {
        invokeSaveAsDialog(blob);
    };

    //from RECORD RTC
    recorder.destroy();
    recorder = null;

    //upload the file
    document.getElementById('btn-upload-guifo').onclick = function() {
    
        
        var apiUrl="https://upload.giphy.com/v1/gifs?api_key="; //local type
        var apiKey2 = "0YSLi63vGNqyZ3OCXW878nF0knlgkjP7"

        var url = apiUrl + apiKey2;//creates the link url
        
            fetch(url,{
            method: "POST",
            body: NEWGIF,
            redirect: "follow",
            })

            .then(function(response){
              return response.json();
            })
        
            .then(function(results){
                console.log(results);
                var gifUpload = results.data.id;
                console.log(gifUpload);

                
                GetGif(gifUpload); //name of the function that contains the gif
                
                

                //show progress uploading section and hide create section
                document.getElementById("creation-section").style.display="none";
                document.getElementById("uploading-section").style.display="none";
                document.getElementById("last-step").style.display="block";

            })

            //.catch(function(error){
            //console.log("There was an error UPLOADING your gif, try again");//error message
            //})

        //show progress uploading section and hide create section
        document.getElementById("creation-section").style.display="none";
        document.getElementById("uploading-section").style.display="block";

    };
   
}

var gifFile; //global

// get the gif from giphy and show the gif
function GetGif(gifUpload){
    document.getElementById("saved-gifs").style.display="block"
    var gifurl = "https://api.giphy.com/v1/gifs/" + gifUpload + "?api_key=0YSLi63vGNqyZ3OCXW878nF0knlgkjP7";
    
    fetch (gifurl)
    .then(function(response){
        return response.json();
      })
  
    .then(function(results2){
        console.log(results2);
        var gifFile = results2.data.images.downsized_medium.url;//defines the origin from uploaded gif
        //console.log(gifFile);

        //This links to function checking if there are gifs already saved
        checkGifs(gifFile);
             
        document.getElementById('preview').src = gifFile;
        document.getElementById("hidden-url").value = gifFile;
      
    })

    .catch(function(error){
        console.log("There was an error GETTING yout gif, try again");
    })
};

//function that copies the gif url. It is related to the button "Copiar enlace Guifo"
function copyLink() {
    var copyText = document.getElementById("hidden-url");
    copyText.select();
    copyText.setSelectionRange(0, 99999) //Created for mobile devices
    document.execCommand("copy");
    alert("Bien hecho! Copiaste el link: " + "         " + copyText.value);
};

//function that checks if there are any gif already created and saves it
function checkGifs(gifFile){
        
    if(gifFile==null){
       console.log("There are no gifs to show");

    }else{
        var gifsCreated;

        if(localStorage.getItem("gifsCreated")==null){
            gifsCreated = [];
        }else{
            gifsCreated = JSON.parse(localStorage.getItem("gifsCreated"));
        }

        gifsCreated.push(gifFile);
    
        console.log(gifsCreated);
        
        localStorage.setItem("gifsCreated", JSON.stringify(gifsCreated));
        showGif(gifsCreated);

    }
   
}

//function that creates the img in DOM
function showGif(gifsCreated){
    if(localStorage.getItem("gifsCreated")==null){
        console.log("There are no gifs to show");
 
     }else{
         
        gifsCreated = JSON.parse(localStorage.getItem("gifsCreated"));
        
        gifsCreated.forEach(function(gifFile){

            let img1 = document.createElement('img'); 
            img1.src =  gifFile;
            document.getElementById("saved-gifs").appendChild(img1);
            
        })
    }

}

//function that gets the saved gifs




// show the gif
/*function showGif(gifInfo){
    var savedGif = localStorage.getItem("userGuifos");
    console.log(savedGif);

    document.getElementById("preview_gif").setAttribute("src", savedGif);// will set the value on the HTML atributte, so the gif is showed
    //localStorage.setItem("page_style_new", userGuifos);// will store the value of the current sheet in local storage
};
*/

// Ejemplo de localstorage https://medium.com/better-programming/how-to-use-local-storage-with-javascript-9598834c8b72
//localStorage solos nos permite guardar un string. Así que primero debemos convertir nuestro objeto a string con JSON.stringify() como en el siguiente ejemplo: