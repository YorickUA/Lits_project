$(document).ready(function() {
  $('input[name="image"]').on("change", function() {
    var path = $(this).val().split("\\");
    $('#fileName').html(path[path.length - 1]);
  })


  $('input[name="date_of_birth"]').datepicker();
  $('input[name="date_of_birth"]').datepicker("option", "dateFormat", "yy-mm-dd");

  $('#Delete').on('click', function() {
    //  $('#message_area').show();
    $('#Edit_response').hide()
    $('#delete_query').show();
  })

  $('#delete_no').on('click', function() {
    //  $('#message_area').hide();
    $('#delete_query').hide();
  })

  $('#delete_yes').on('click', function() {
    var path = document.URL.substring(0, document.URL.lastIndexOf('/')) + document.URL.substring(document.URL.lastIndexOf('/'));
    $.ajax({
      url: path,
      type: 'DELETE',
      success: function(res) {
        if (res) {
          window.location.replace(window.location.origin);
        }
      }
    });
  })

  $('#Update').on('click', function() {
    var is_ok = true;
    var check = function(input) {
      if (!input.val()) {
        is_ok = false;
        if (!input.hasClass("error"))
          input.toggleClass("error");
      } else {
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

    $('#delete_query').hide();
    $('#Edit_response').show();
    if (is_ok) {
      $("#update_error").hide();
      var data = {
        name: $('input[name="name"]').val(),
        surname: $('input[name="surname"]').val(),
        date_of_birth: $('input[name="date_of_birth"]').val(),
        country: $('input[name="country"]').val(),
        Years_pro: $('input[name="years_pro"]').val(),
        century_breaks: $('input[name="century_breaks"]').val(),
        ranking_titles: $('input[name="ranking_titles"]').val(),
        world_champs: $('input[name="world_champs"]').val(),
        bio: $('textarea[name="bio"]').val()
      };
      var path = document.URL.substring(0, document.URL.lastIndexOf('/')) + "/update" + document.URL.substring(document.URL.lastIndexOf('/'));
      $.post(path, data, function(response) {
        if (response) {
          $("#update_error").hide();
          $("#success").show();
        } else {
          $("#success").hide();
          $("#update_error").show();
        }
      })


      $(".error").removeClass('error');
    } else {
      $("#success").hide();
      $("#update_error").show().html("Fill all required fields");
    }

  })



  $.get(document.URL.substring(0, document.URL.lastIndexOf('/')) + "/data" + document.URL.substring(document.URL.lastIndexOf('/')),
    function(response) {
      player = response;
      fill_form(player[0]);
    })

  function fill_form(data) {
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

  $("#set_default").click(function() {


    $.post(document.URL.substring(0, document.URL.lastIndexOf('/')) + "/setDefault" + document.URL.substring(document.URL.lastIndexOf('/')), {
      data: null
    }, function(res) {
      if (res) {
        window.location.replace(window.location.origin + '/card/' + res);
      }
    })
  })
})
