$( document ).ready( function(){
  console.log("Hi gals");
  $( "#searchButton" ).on( "click", function(){

    // get user input from text field w/ id 'searchIn'
    var searchText = $( '#searchIn' ).val();
    console.log( "In searchButton onclick", searchText );

    // assemble search URL
    var searchUrl = "https://archive.org/advancedsearch.php?q=" + searchText + "&output=json";

    // ajax call to archive.org

    $.ajax({
      url: searchUrl,
      // when dataType was "JSON", then error "XMLHttpRequest cannot load https://archive.org/advancedsearch.php?q=cars&output=json. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore not allowed access."
      //changing dataType to "JSONP" fixed error
      dataType: "JSONP",
      success: function( data ){
        // console.log out returned data
        console.log( "in ajax success! Woot! Here is the data:", data);
        // ID info needed w/in returned info
        showResults( data.response.docs );
      }
    }); //end of ajax call
  }); //end searchButton onclick

  var showResults = function( searchResults ){
    console.log( "in showResults:", searchResults );

    // loop thru results and display on DOM
    var outputText = "";
    for ( var i = 0; i < searchResults.length; i++){
      // link URL to detail page for object
      outputText += '<p><strong><a href="https://archive.org/details/' + searchResults[i].identifier + '">' + searchResults[i].identifier + '</a>:</strong>' + searchResults[i].description + '</p>';
    } //end for loop
    $( "#outputDiv" ).html( outputText);

  };  //end showResults

}); //end doc ready
