$(document).ready(function() {

    var delay = 300; // milliseconds
    var cookie_expire = 0; // days

    var cookie = localStorage.getItem("list-builder");
    if(cookie == undefined || cookie == null) {
        cookie = 0;
    }

    if(((new Date()).getTime() - cookie) / (1000 * 60 * 60 * 24) > cookie_expire) {
        $("#list-builder").delay(delay).fadeIn("fast", () => {
            $("#popup-box").fadeIn("fast", () => {});
        });

        $("#popup-close").click(() => {
            $("#list-builder, #popup-box").hide();
            localStorage.setItem("list-builder", (new Date()).getTime());
        });
    }

});

// NEW 9.9.2019

//click to get to home page
$("#home").on('click', function(){
    window.location = "index";    
  });
  
  // click to get to user page
  $("#signin").on('click', function(){
    window.location = "user";    
  });
  
  // click to get to user page
  $("#myAccount").on('click', function(){
    window.location = "user";    
  });
  
  //// user page 
  $(function() {
      $("#allGroceries, #userGroceries").sortable({
        connectWith: "ul",
        placeholder: "placeholder",
        delay: 150
      })
      .disableSelection()
      .dblclick( function(e){
        var item = e.target;
        if (e.currentTarget.id === 'allGroceries') {
          //move from all to user
          $(item).fadeOut('fast', function() {
            $(item).appendTo($('#userGroceries')).fadeIn('slow');
          });
        } else {
          //move from user to all
          $(item).fadeOut('fast', function() {
            $(item).appendTo($('#allGroceries')).fadeIn('slow');
          });
        }
      });
    });

    // NEW 9.9.2019 