
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
        WaveSurfer.cursor.create()
      ]
    });

    // to maintain reference/scope for callbacks
    var self = this;

    // attach listeners
    this.ws.on('seek', this.selectionHandler);
    

    // TODO: remove 
    //this.ws.load("/audio/blah.mp3");
    this.ws.load("http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3");
    return this.ws;
  }

  // Listeners
  selectionHandler(position){


    // if selected is right of previous
    if (self.selRegion > postion){
      
    }
    var currentTime = position * self.ws.getDuration();
    console.log("selected: " + currentTime);
  } 
};

// the boundary time of the  clip
var s0 = 0, s1 = 0;







// Main
document.addEventListener('DOMContentLoaded', function() {
  var p = new Player()

});



