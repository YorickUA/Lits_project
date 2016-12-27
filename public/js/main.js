$(document).ready(function(){

  $('input[name="image"]').on("change", function(){
    var path=$(this).val().split("\\");
    $('#fileName').html(path[path.length-1]);
  })

})
