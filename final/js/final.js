"use strict";

var titles = $.ajax({
  url: "http://api.tvmaze.com/shows",
  cache: false,
  type: "get",
  dataType: "json",
  success: function success(data) {
    primaryShow(data[Math.floor(Math.random() * data.length)]);
    runGrid(data);
  },
  error: function error() {
    console.log("error");
  }
});

function primaryShow(title) {
  var template = "",
      $node = $("#primaryShow"),
      ajaxTemplate = $.ajax({
    url: "views/coverprime/template.html",
    cache: false,
    type: "get",
    dataType: "html",
    success: function success(data) {
      template = data;
    }
  });

  $.when(ajaxTemplate).done(function () {
    var genres = "",
        name = title;
    for (var i = 0; i < title.genres.length; i++) {
      genres += title.genres[i] + ", ";
    }
    ajaxTemplate = template;
    ajaxTemplate = ajaxTemplate.replace("##title##", title.name).replace("##score##", title.rating.average).replace("##cover##", title.image.medium).replace("##genres##", genres).replace("##coverprime##", title.image.original).replace("##description##", title.summary).replace("##runtime##", title.runtime).replace("##lang##", title.language);
    $node.append(ajaxTemplate);
  });
}

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
