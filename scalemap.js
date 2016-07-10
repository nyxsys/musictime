

var scalegen = {};
scalegen.headchord = {};
scalegen.major = ["whole","whole","half","whole","whole","whole","half"];
scalegen.sharps = ["A","B","D","E","G", "A#", "C#", "D#", "F#", "G#"];
scalegen.flats = ["F","Bb","Eb","Ab","Db","Gb"];


function note(note, sharp,next, alternate){
    this.note = note;
    this.alternate = alternate;
    this.sharp = sharp;
    this.next = next;
}

scalegen.init = function(){
  var notes = ['A',['A#','Bb'],'B','C',['C#','Db'],'D',['D#','Eb'],'E','F',['F#','Gb'],'G',['G#','Ab']];
  var chords = {};
  for (var n = notes.length-1; n>=0; n--){
      if(notes[n][1] ===undefined){
         chords[n] = new note(notes[n], false,  chords[n+1]);
      }
      else{
          chords[n] = new note(notes[n][1], false,  chords[n+1],notes[n][0]);
      }
  }
  chords[notes.length-1].next =  chords[0];//close the circle
  scalegen.headchord = chords[0];
  scalegen.headchord.length = notes.length;
};


scalegen.forEach= function(call){
    var i = 0;
     var current = scalegen.headchord;
     while (i < scalegen.headchord.length) {
         call(current);
         current = current.next;
         i++;
     }
};

scalegen.noteScale = function(note, interval_type){
    var interval;
    
    if(interval_type === "major"){
        interval = scalegen.major;
    }
    //other interval types go here 
    else{
        return(console.error("invalid interval type"));
    }
    
    var scale = [];
    var current = scalegen.get(note);
    var pitch = scalegen.checkPitch(note);
    if(current === undefined){
        return undefined;
    }
    for(var i in interval){
        if(current.alternate && pitch === "sharp"){
            scale.push(current["alternate"]);
        }
        else{
            scale.push(current["note"]);
        }
        if(interval[i]=="whole"){
            current = scalegen.whole(current);
        }
        else{
            current = scalegen.half(current);
        }
    }
    return scale;
};


scalegen.whole = function(current){
    return current.next.next;
};
scalegen.half = function(current){
    return current.next;
};

scalegen.get = function(note){
    var final = null;
    scalegen.forEach(function(chord){
       if(chord.note === note){
           final = chord;
       }
    });
    if(final !== null){
        return final;
    }
    else{
        return console.error("note not found");
    }
};
scalegen.checkPitch = function(note){
    if (scalegen.contains(scalegen.flats, note)){
        return("flat");
    }
    else if (scalegen.contains(scalegen.sharps, note)){
        return("sharp");
    }
    else{
        return(console.error("note not in range"));
    }
}

scalegen.contains = function (a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

scalegen.init();
//console.log(scalegen.noteScale("Gb","major"));

exports.noteScale = scalegen.noteScale;