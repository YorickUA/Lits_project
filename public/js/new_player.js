$(document).ready(function(){


  $('input[name="date_of_birth"]').datepicker();
  $('input[name="date_of_birth"]').datepicker("option", "dateFormat", "yy-mm-dd" );

  $('#add_new').on("click", function(event){
    event.preventDefault();
    var is_ok=true;


     var check=  function(input){
        if (!input.val()){
          is_ok=false;
          if(!input.hasClass("error"))
          input.toggleClass("error");
        }else{
          input.removeClass("error");
        }
      }

    check($('input[name="name"]'));
    check($('input[name="surname"]'));
    check($('input[name="date_of_birth"]'));
    check($('input[name="country"]'));
    check($('input[name="years_pro"]'));
    check($('input[name="century_breaks"]'));
    check($('input[name="ranking_titles"]'));
    check($('input[name="world_champs"]'));

    if(is_ok){
      $('#new_player').trigger("submit");
      console.log("submitted");
    }else{
      $("#save_message").css("display","inline-block");
    }
  })


})
