/* eslint-disable quotes */
$(document).ready(function () {
  let authUser = window.authUser;
  authUser === "true" ? (authUser = true) : (authUser = false);

  function showLoginModal() {
    $("#list-builder")
      .delay(300)
      .fadeIn("fast", () => {
        // eslint-disable-next-line no-empty-function
        $("#popup-box").fadeIn("fast", () => {});
      });

    $("#popup-close").click(() => {
      $("#list-builder, #popup-box").hide();
      localStorage.setItem("list-builder", new Date().getTime());
    });
  }

  $("#account-tab").on("click", function () {
    authUser ? (window.location = "/user") : showLoginModal();
  });

  $("#sign-up-tab").on("click", function () {
    showLoginModal();
  });

  //click to get to home page
  $("#home").on("click", function () {
    window.location = "/";
  });

  // click to get to user page
  $("#signin").on("click touchstart", function () {
    let user = {};
    user.username = $("#username").val();
    user.password = $("#password").val();
    $.post("/login", user).then((response) => {
      $(".sign-in-err").empty();
      if (response.status === "success") {
        window.location = "/user";
      } else {
        console.log(response);
        // display the response.message in the appropriate div to show the user why the login didnt work
        $(".sign-in-err").append(
          "please enter the correct username and password"
        );
        validator.resetForm();
        $("#create-account").trigger("reset");
        $("#popup-form").trigger("reset");
      }
    });
  });

  // validate form inputs and display errors before sending new user to database.
  $("#create-account").validate({
    rules: {
      firstname: "required",
      lastname: "required",
      email: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        // minLength: 9
      },
    },
    messages: {
      firstname: "Please enter your firstname",
      lastname: "Please enter your last name",
      email: {
        required: "Please enter an email address",
        email: "Please enter a valid email address",
      },
      password: {
        required: "Please enter a password",
      },
    },
    submitHandler: function () {
      let newUser = {};
      newUser.firstName = $("#firstname").val();
      newUser.lastName = $("#lastname").val();
      newUser.username = $("#new-username").val();
      newUser.password = $("#new-password").val();
      $.post("/api/adduser", newUser).then((response) => {
        if (response.status) {
          $(".add-user-err").append(
            "That email address already exists in our system"
          );
        }
        // below can be changed to an else statement, response.errors doesn't exist
        if (response.firstName === newUser.firstName) {
          $.post("/login", newUser).then((response) => {
            response.status === "success"
              ? (window.location = "/user")
              : console.log(response);
          });
        } else {
          if (response.errors) {
            console.log(response.errors);
          }
        }
      });
    },
  });

  const validator = $("#create-account").validate();

  // User Page
  // check database for a duplicate before adding
  $(".add-item").on("click", function () {
    let newItem = {};
    newItem.name = $(".form-control").val();
    // database queries in apiRoutes.js
    $.post("/api/newitem", newItem).then((response) => {
      response.status
        ? $("input.form-control").after(
            "<label class='error'>item already added</label>"
          )
        : $.post("/api/update", newItem).then(
            () => (window.location = "/user")
          );
    });
  });

  // Rebuild this page with three different functions for the different buttons. Items will be set to onList, inCart or Exists. I believe this can be done with 2 tables. look up best way to program item with 3 states. probably giving the item value [-1, 0, 1]
  $(function () {
    $("#allGroceries, #userGroceries, #groceryCart").on(
      "click touchstart",
      function (e) {
        var item = e.target;
        let changedItem = {};
        changedItem.itemId = $(item).attr("data-id");
        if (e.currentTarget.id === "allGroceries") {
          //move from all to user
          changedItem.category = 0;
          $.post("/api/update", changedItem).then((response) => {
            if (response) {
              window.location = "/user";
            }
          });
        } else if (e.currentTarget.id === "userGroceries") {
          changedItem.category = 1;
          $.post("/api/update", changedItem).then((response) => {
            if (response) {
              window.location = "/user";
            }
          });
        } else if (e.currentTarget.id === "groceryCart") {
          changedItem.category = -1;
          $.post("/api/update", changedItem).then((response) => {
            if (response) {
              window.location = "/user";
            }
          });
        }
      }
    );
  });

  // contact page ========================================
  $("#contact-form").validate({
    rules: {
      name: "required",
      email: {
        required: true,
        email: true,
      },
      message: "required",
    },
    messages: {
      name: "Please enter a name",
      email: {
        required: "Please enter and email address",
        email: "Please enter a valid email address",
      },
      message: "Please enter a message",
    },
    submitHandler: function () {
      $(".contact-header").after("<h3>Sending . . .</h3>");
      let details = {};
      details.name = $("#name").val();
      details.email = $("#email").val();
      details.message = $("#message").val();
      $.post("/email", details).then((response) => {
        console.log(response.status);
        response.status === "ERROR"
          ? console.log("error")
          : (window.location = "/emailed");
      });
    },
  });

  // probably no longer needed
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
        .each(function (i) {
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
    setInterval(function () {
      $(".sentence").toggleClass("sentence--show");
    }, 4000);

    setTimeout(function () {
      $(".sentence").toggleClass("sentence--show");
    }, 1000);
  }
});

// slide logos

$(document).ready(function () {
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
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  });
});

// logo click events
