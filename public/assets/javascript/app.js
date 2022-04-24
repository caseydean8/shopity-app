/* eslint-disable quotes */
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
  $("#home").on("click", function () {
    window.location = "/";
  });

  // click to get to user page
  $("#myAccount").on("click", function () {
    window.location = "/user";
  });

  // click to get to user page
  $("#signin").on("click", function () {
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
    newUser.username = $("#new-username").val();
    newUser.password = $("#new-password").val();
    $.post("/api/adduser", newUser).then(response => {
      // if we had success creating the new user and the user object is returned to us
      if (response.firstName === newUser.firstName) {
        // redirect the user to the login route
        console.log("Calling post route to /login");
        $.post("/login", newUser).then(response => {
          console.log("inside post route");
          if (response.status === "success") {
            window.location = "/user";
          } else {
            console.log(response);
            // display the response.message in the appropriate div to show the user why the login didnt work
          }
        });
      } else {
        if (response.errors) {
          console.log(response.errors);
        }
      }
    });
  });

  //// user page
  $(function() {
    $("#allGroceries, #userGroceries, #groceryCart").dblclick(function(e) {
      var item = e.target;
      if (e.currentTarget.id === "allGroceries") {
        //move from all to user
        let changedItem = {};
        changedItem.itemId = $(item).attr("data-id");
        changedItem.onList = true;
        changedItem.inCart = false;
        console.log(`move ${changedItem.itemId} to user list`);
        $.post("/api/update", changedItem).then(response => {
          if (response) {
            window.location = "/user";
          }
        });
      } else if (e.currentTarget.id === "userGroceries") {
        //move from user to all
        let changedItem = {};
        changedItem.itemId = $(item).attr("data-id");
        changedItem.onList = false;
        changedItem.inCart = true;
        console.log(changedItem);
        $.post("/api/update", changedItem).then(response => {
          if (response) {
            window.location = "/user";
          }
        });
      } else if (e.currentTarget.id === "groceryCart") {
        //move from user to all
        let changedItem = {};
        changedItem.itemId = $(item).attr("data-id");
        changedItem.onList = false;
        changedItem.inCart = false;
        console.log(changedItem);
        $.post("/api/update", changedItem).then(response => {
          if (response) {
            window.location = "/user";
          }
        });
      }
    });
  });

  // contact page

  linePage();
  cycleText();

  function linePage() {
    var splitMe = $(".sentence");

    // eslint-disable-next-line no-unused-vars
    splitMe.each(function (index) {
      var text = $(this).html();
      var output = "";

      //split all letters into spans
      for (var i = 0, len = text.length; i < len; i++) {
        // eslint-disable-next-line prettier/prettier
        output += '<span data-index="' + i + '">' + text[i] + "</span>";
      }

      //put it in the html
      $(this).html(output);

      //check the offset of each letter to figure out where the line breaks
      var prev = 0;
      var parts = [];
      $(this)
        .find("span")
        .each(function(i) {
          if ($(this).offset().top > prev) {
            parts.push(i);
            prev = $(this).offset().top;
          }
        });

      parts.push(text.length);

      //create final
      var finalOutput = "";

      parts.forEach(function (endPoint, i) {
        if (endPoint > 0) {
          finalOutput +=
            '<span data-line="' +
            i +
            '" class="line-wrap"><span class="line-inner">' +
            text.substring(parts[i - 1], parts[i]) +
            "</span></span>";
        }
      });

      $(this).html(finalOutput);
      $(this).addClass("lined");
    });
  }

  function cycleText() {
    setInterval(function() {
      $(".sentence").toggleClass("sentence--show");
    }, 4000);

    setTimeout(function() {
      $(".sentence").toggleClass("sentence--show");
    }, 1000);
  }
});

// slide logos

$(document).ready(function() {
  $(".customer-logos").slick({
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 900,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 3
        }
      }
    ]
  });
});

// logo click events
