var scalegen = require("../scalemap.js");

describe("scale_notes", function(){
    
   it("accepts only certain types of scales", function(){
       expect(scalegen.noteScale("B","blah")).toBeUndefined();
       console.log("\n")
   });
   it("accepts only certain types of notes", function(){
       expect(scalegen.noteScale("Abacus","major")).toBeUndefined();
       console.log("\n")
   });
   
   it("takes in notes and returns a scale based on that note", function(){
      expect(scalegen.noteScale("D","major")).toEqual([ 'D', 'E', 'F#', 'G', 'A', 'B', 'C#' ]); 
   });
    
});