window.onload = function(){
  document.getElementById("search").focus();
}

function suggest(){
  $("#search").autocomplete({
    source: function(request, response){
      $.ajax({
        url: "http://en.wikipedia.org/w/api.php",
        dataType: "jsonp",
        data: {
          'action': "opensearch",
          'format': "json",
          'search': request.term
        },
        success: function(data){
          response(data[1]);
        }
      });
    }
  });
}

function doSearch(){
  document.getElementById("box").innerHTML = "";
  var query = document.getElementById("search").value.trim();
  
  if(query!==""){
    $.ajax({
      url: "http://en.wikipedia.org/w/api.php",
      dataType: "jsonp",
      data: {
        'action': "opensearch",
        'format': "json",
        'search': query
      },
      success: function(data){
        var num = data[1].length;
        var s = "<br><h3>Displaying " + num + " Wikipedia Search Results</h3>";
        for(var i=0; i<num; i++){
          s += "<div class='display'>";
          s += "<a href='" + data[3][i] + "' target='blank'><h4>" + data[1][i] + "</h4></a>";
          s += "<span>" + data[2][i] + "</span>";
          s += "</div>";
        }
        document.getElementById("box").innerHTML= s;
      }
    });
  }
}