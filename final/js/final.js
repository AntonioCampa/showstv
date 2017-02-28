"use strict";

var titles = $.ajax({
  url: "http://api.tvmaze.com/shows",
  cache: false,
  type: "get",
  dataType: "json",
  success: function success(data) {
    console.log(data);
    runGrid(data);
  },
  error: function error() {
    console.log("error");
  }
});

function runGrid(titles) {
  var template = "",
      $node = $("#listShows"),
      ajaxTemplate = $.ajax({
    url: "views/templateGrid/template.html",
    cache: false,
    type: "get",
    dataType: "html",
    success: function success(data) {
      template = data;
    }
  });

  $.when(ajaxTemplate).done(function () {
    for (var title = 0; title < titles.length; title++) {
      var genres = "";
      for (var i = 0; i < titles[title].genres.length; i++) {
        genres += titles[title].genres[i] + ", ";
      }
      ajaxTemplate = template;
      ajaxTemplate = ajaxTemplate.replace("##title##", titles[title].name).replace("##score##", titles[title].rating.average).replace("##cover##", titles[title].image.medium).replace("##genres##", genres);
      $node.append(ajaxTemplate);
    }
  });
}

function runApp() {
  console.log("app runing");
}

$(function () {
  runApp();
});
//# sourceMappingURL=final.js.map
