"use strict";

var titles = $.ajax({
  url: "http://api.tvmaze.com/shows",
  cache: false,
  type: "get",
  dataType: "json",
  success: function success(data) {
    console.log(data);
  },
  error: function error() {
    console.log("error");
  }
});

function runApp() {
  console.log("app runing");
}

$(function () {
  runApp();
});
//# sourceMappingURL=final.js.map
