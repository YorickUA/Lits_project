$(document).ready(function() {
  var players, active_set;

  $('#submit_pass').on('click', login_handler )
  $('#logout').on('click', logout_handler )

  function login_handler(){
      $.post(document.URL.substring(0, document.URL.lastIndexOf('/')),
      {
        action:"login",
        password:$('input[type="password"]').val()
      },
      function(res){
        if(!res){
          $('.message').html("Wrong password")
        }else{
          $('#password_area').html("<a href=\"new\" class=\"ui button green\">New player</a> <button id=\"logout\" class=\"ui button red\">Logout</button> ")
          $('#logout').on('click', logout_handler)
        }
      })
    }


  function logout_handler(){
    console.log(document.URL.substring(0, document.URL.lastIndexOf('/'))+"/logout")
    $.post(document.URL.substring(0, document.URL.lastIndexOf('/'))+"/logout",{},

    function(){
      var content=""
      content+="<div style=\"margin-right:3px\" class=\"ui input\">"
      content+="<input type=\"password\" placeholder=\"Enter as admin\"></div>"
      content+="<button id=\"submit_pass\" class=\"ui button primary\">Submit</button>"
      content+="<span class=\"message\"></span>"
      $('#password_area').html(content);
      $('#submit_pass').on('click', login_handler )

    })

  }


  $.get(document.URL.substring(0, document.URL.lastIndexOf('/')) + "/data", function(response) {
    players = response;
    active_set=players
    setup_filter();
    apply_sort();
    render_cards(active_set);
  })

  function render_card(player) {
    var content = ""

    content += "<div id=\"" + player.id + "\" class=\"ui card\">"
    content += "<div class=\"image\">"
    content += "<img style=\"object-fit:contain;\" src=\"" + player.avatar_picture + "\">"
    content += "</div>"
    content += "<div class=\"content\">"
    content += "<a href=\"/card/"+ player._id +"\"class=\"header\">" + player.fullName + "</a>"
      // content+="<div class=\"meta\">"
      //   content+="<span class=\"date\">Joined in 2013</span>"
      // content+="</div>"
    content += "<div class=\"description\">"
    content += "Country: " + player.country
    content += "</div>"
    content += "</div>"
      // content+="<div class=\"extra content\">"
      //   content+="<a>"
      //     content+="<i class=\"user icon\"></i>"
      //     content+="22 Friends"
      //   content+="</a>"
      // content+="</div>"
    content += "</div>"
    return content;
  }

  function render_cards(players) {
    $('#content_container .ui.cards').html("");
    var content = "";
    for (var i = 0; i < players.length; i++) {
      if (players[i].country == $('#country_filter').val() || $('#country_filter').val() == "All")
        content += render_card(players[i]);
    }
    $('#content_container .ui.cards').append(content);
  }

  function apply_sort() {
    var what_to_sort = $('#card_sort').val();
    switch (what_to_sort) {
      case "0":
        players.sort(function(x, y) {
          return y.century_breaks - x.century_breaks;
        });
        break;
      case "1":
        players.sort(function(x, y) {
          return y.ranking_titles - x.ranking_titles;
        });
        break;
      case "2":
        players.sort(function(x, y) {
          return y.Years_pro - x.Years_pro;
        });
        break;
      case "3":
        players.sort(function(x, y) {
          return y.world_champs - x.world_champs;
        });
        break;
      case "4":
        players.sort(function(x, y) {
          return y.country.toLowerCase() < x.country.toLowerCase();
        });
        break;
    }
  }
  $('#card_sort').on('change', function() {
    apply_sort();
    render_cards(active_set);
  })

  function setup_filter() {
    var flags = [],
      output = [],
      l = players.length,
      i;
    for (i = 0; i < l; i++) {
      if (flags[players[i].country]) continue;
      flags[players[i].country] = true;
      output.push(players[i].country);
    }
    Object.keys(output);
    $('#country_filter').html("");
    var content = "<option value=\"All\">All</option>";
    for (i = 0; i < output.length; i++) {
      content += "<option value=\"" + output[i] + "\">" + output[i] + "</option>"
    }
    $('#country_filter').html(content);

  }

  $('#search').on('keyup', function(){
    active_set=[];
    if($(this).val()==""){
      active_set=players;
    }else{
      for(var i=0; i<players.length; i++){
        if(players[i].fullName.toLowerCase().indexOf(($(this).val()).toLowerCase())!==-1){
          active_set.push(players[i]);
        }
      }
    }
    render_cards(active_set);
  })
  $('#country_filter').on('change', function(){
    render_cards(active_set)});
})
