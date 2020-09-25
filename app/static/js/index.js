
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
    

    // TODO: remove 
    //this.ws.load("/audio/blah.mp3");
    this.ws.load("http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3");
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
};

// the boundary time of the  clip
var s0 = 0, s1 = 0;


// Main
var p
document.addEventListener('DOMContentLoaded', function() {
  console.log("loaded");
  p = new Player();

});



