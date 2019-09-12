$(document).ready(function() {
  var delay = 300; // milliseconds
  var cookieExpire = 0; // days

  var cookie = localStorage.getItem("list-builder");
  if (cookie === undefined || cookie === null) {
    cookie = 0;
  }

  if ((new Date().getTime() - cookie) / (1000 * 60 * 60 * 24) > cookieExpire) {
    $("#list-builder")
      .delay(delay)
      .fadeIn("fast", () => {
        // eslint-disable-next-line no-empty-function
        $("#popup-box").fadeIn("fast", () => {});
      });

    $("#popup-close").click(() => {
      $("#list-builder, #popup-box").hide();
      localStorage.setItem("list-builder", new Date().getTime());
    });
  }

  // NEW 9.9.2019

  //click to get to home page
  $("#home").on("click", function() {
    window.location = "/";
  });

  // click to get to user page
  $("#myAccount").on("click", function() {
    window.location = "/user";
  });

  // click to get to user page
  $("#signin").on("click", function() {
    let user = {};
    user.username = $("#username").val();
    user.password = $("#password").val();
    $.post("/login", user).then(response => {
      if (response.status === "success") {
        window.location = "/user";
      } else {
        console.log(response);
        // display the response.message in the appropriate div to show the user why the login didnt work
      }
    });
  });

  $("#create").on("click", () => {
    let newUser = {};
    newUser.firstName = $("#first-name").val();
    newUser.lastName = $("#last-name").val();
    newUser.username = $("#username").val();
    newUser.password = $("#new-password").val();
    console.log(newUser);
    $.post("/api/adduser", newUser).then(response => {
      console.log(response);
    });
  });

  //// user page
  $(function() {
    $("#allGroceries, #userGroceries")
      .sortable({
        connectWith: "ul",
        placeholder: "placeholder",
        delay: 150
      })
      .disableSelection()
      .dblclick(function(e) {
        var item = e.target;
        if (e.currentTarget.id === "allGroceries") {
          //move from all to user
          $(item).fadeOut("fast", function() {
            $(item)
              .appendTo($("#userGroceries"))
              .fadeIn("slow");
          });
        } else {
          //move from user to all
          $(item).fadeOut("fast", function() {
            $(item)
              .appendTo($("#allGroceries"))
              .fadeIn("slow");
          });
        }
      });
  });

  // NEW 9.9.2019
});
