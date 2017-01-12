$(document).ready(function(){


  $('input[name="date_of_birth"]').datepicker();
  $('input[name="date_of_birth"]').datepicker("option", "dateFormat", "yy-mm-dd" );

  $('#add_new').on("click", function(event){
    event.preventDefault();
    var is_ok=true;


     var check=  function(input){
        if (!input.val().replace(/^[ ]+|[ ]+$/g,'')){
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
      $('input[name="name"]').val($('input[name="name"]').val().replace(/^[ ]+|[ ]+$/g,''));
      $('input[name="surname"]').val($('input[name="surname"]').val().replace(/^[ ]+|[ ]+$/g,''));
      $('input[name="date_of_birth"]').val($('input[name="date_of_birth"]').val().replace(/^[ ]+|[ ]+$/g,''));
      $('input[name="country"]').val($('input[name="country"]').val().replace(/^[ ]+|[ ]+$/g,''));
      $('input[name="years_pro"]').val($('input[name="years_pro"]').val().replace(/^[ ]+|[ ]+$/g,''));
      $('input[name="century_breaks"]').val($('input[name="century_breaks"]').val().replace(/^[ ]+|[ ]+$/g,''));
      $('input[name="ranking_titles"]').val($('input[name="ranking_titles"]').val().replace(/^[ ]+|[ ]+$/g,''));
      $('input[name="world_champs"]').val($('input[name="world_champs"]').val().replace(/^[ ]+|[ ]+$/g,''));
      $('#new_player').trigger("submit");
      console.log("submitted");
    }else{
      $("#save_message").css("display","inline-block");
    }
  })


})
