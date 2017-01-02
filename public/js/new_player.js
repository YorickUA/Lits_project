$(document).ready(function(){


  $('input[name="date_of_birth"]').datepicker();
  $('input[name="date_of_birth"]').datepicker("option", "dateFormat", "yy-mm-dd" );

  $('#add_new').on("click", function(event){
    event.preventDefault();
    var is_ok=true;

    if (!$('input[name="name"]').val()){
      is_ok=false;
      $('input[name="name"]').toggleClass("error");
    }

    if (!$('input[name="surname"]').val()){
      is_ok=false;
      $('input[name="surname"]').toggleClass("error");
    }

    if (!$('input[name="date_of_birth"]').val()){
      is_ok=false;
      $('input[name="date_of_birth"]').toggleClass("error");
    }

    if (!$('input[name="country"]').val()){
      is_ok=false;
      $('input[name="country"]').toggleClass("error");
    }

    if (!$('input[name="years_pro"]').val()){
      is_ok=false;
      $('input[name="years_pro"]').toggleClass("error");
    }

    if (!$('input[name="century_breaks"]').val()){
      is_ok=false;
      $('input[name="century_breaks"]').toggleClass("error");
    }

    if (!$('input[name="ranking_titles"]').val()){
      is_ok=false;
      $('input[name="ranking_titles"]').toggleClass("error");
    }

    if (!$('input[name="world_champs"]').val()){
      is_ok=false;
      $('input[name="world_champs"]').toggleClass("error");
    }


    if(is_ok){
      $('#new_player').trigger("submit");
      console.log("submitted");
    }else{
      $("#save_message").css("display","inline-block");
    }
  })

})
