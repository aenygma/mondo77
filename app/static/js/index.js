
// Globals
class Player {
  // Properties
  selRegion = -1;

  // Constructor
  constructor(domId) {
    // assign default values
    domId = (typeof domId === "undefined") ? "#waveform": domId;

    this.ws = new WaveSurfer.create({
      container: domId,
      scrollParent: true,
      loopSelection: false,
      interact: true,
      audioRate: true,
      cursorColor: 'navy',
      plugins: [
        //WaveSurfer.cursor.create(),
        WaveSurfer.regions.create({
          regions: [{
            id: 0,
            start: 1.55,
            end: 2.55,
            loop: true
          }]
        })
      ]
    });

    // to maintain reference/scope for callbacks
    var self = this;
    // attach listeners
    this.ws.on('seek', self.selectionHandler.bind(self));
    return this.ws;
  }

  // Listeners
  selectionHandler(position){
    /*
     * The behavior for this is bit tricky so I'm adopting
     *  dbl-click => start of loop
     *  single-clikc => end of loop
     */

    //  // if position is same as previously recorded,
    //  // then its a START position
    //  if (self.selRegion == postion){
    //    var start = position;
    //  }
    //  // or 1 click and its to the right of previously
    //  else if(position > self.selRegion){

    //  }

    //  // set
    var self = this;
    self.selRegion = position;

    var currentTime = position * self.ws.getDuration();
    console.log("selected: " + currentTime);
  }

  load(url){
  /*
   * Load the given url
   */
    var self = this;
    this.ws.load(url);
  }

};

// Load a given URL of a clip
function loadUrl(url){


  // send serv request -> on return ....

  // Create a dom
  var newDom = document.createElement("div");
  newDom.setAttribute('id', 'track'+trackIndex);
  newDom.setAttribute('class', 'track');
  document.getElementById("tracklist").appendChild(newDom);

  // Make a player
  // Player code
  var p = new Player('#'+newDom.id);
  p.load(url);
  //tracks.push(p)
  tracks[newDom.id] = p;


  // increment track index
  trackIndex += 1;
}

class Clock {

  sec = 0;
  listeners = {
    'fire':[]
  };

  constructor(){

    setInterval(function(){
      this.listeners['fire'].forEach(
        function(item,idx){
          item();
        })
    }, 1000);
  }

  // Listeners
  addListener(name, func){
    var self = this;
    var evt_listeners = self.listeners[name];
    if (!evt_listeners){
      evt_listeners = [func]
    }
    evt_listeners.push(func)
  }
}

// calculate time
function displayTime(){
  // display clock when running
  // from: https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript

  var sec = 0;
  function pad ( val ) { return val > 9 ? val : "0" + val; }
  setInterval( function(){
      document.getElementById("seconds").innerHTML = (pad(++sec%60));
      document.getElementById("minutes").innerHTML = (pad(parseInt(sec/60,10)));
  }, 1000);

}



// show error box
function showError(msg){
  var err = document.getElementById("errorbox")
  err.innerHTML = "Error: " + msg;
  err.setAttribute("style", "display:block");
}



//
// Main
//

// Globals
var state = "none"
var trackIndex = 0
var tracks = {};

document.addEventListener('DOMContentLoaded', function() {
  console.log("loaded");

  // Attach listener to Add button
  var form = document.getElementById("mainform");
  form.addEventListener('submit',
    function (evt) {

      // get url
      // TODO: validate url
      var url = document.getElementById('urlInput').value;

      // make server request
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/get_media", true);

      // set headers
      xhr.setRequestHeader("Content-Type", "application/json");
      // listener for loading data
      xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          // Request finished. Do processing here.

          var data = JSON.parse(xhr.responseText);
          console.log(data);
          state = data
          if(data["status"] != "success"){
            showError(data);
            return false;
          }

          // load the audio file into waveform onscreen
          loadUrl(data.data);
        }
      }

      // Make request
      xhr.send("urlInput="+url);

      // prevent form submit
      evt.preventDefault();
      return false;
    });
});


