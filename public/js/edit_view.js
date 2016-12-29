$(document).ready(function(){
  $('input[name="image"]').on("change", function() {
    var path = $(this).val().split("\\");
    $('#fileName').html(path[path.length - 1]);
  })


  $('input[name="date_of_birth"]').datepicker();
  $('input[name="date_of_birth"]').datepicker("option", "dateFormat", "yy-mm-dd" );

  $.get(document.URL.substring(0, document.URL.lastIndexOf('/')) + "/data"+document.URL.substring( document.URL.lastIndexOf('/')),
   function(response) {
    player = response;
    fill_form(player[0]);
  })

  function fill_form(data){
    $('input[name="name"]').val(data.name);
    $('input[name="surname"]').val(data.surname);
    $('input[name="date_of_birth"]').val(data.date_of_birth.substring(0, data.date_of_birth.indexOf("T")));
    $('input[name="country"]').val(data.country);
    $('input[name="years_pro"]').val(data.Years_pro);
    $('input[name="century_breaks"]').val(data.century_breaks);
    $('input[name="ranking_titles"]').val(data.ranking_titles);
    $('input[name="world_champs"]').val(data.world_champs);
    $('textarea[name="bio"]').val(data.bio);
  }
})
