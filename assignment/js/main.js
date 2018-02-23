/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */
/* =====================
  Lab 2, part 2 - application state

  Spatial applications aren't typically as simple as putting data on a map. In
  addition, you'll usually need to change the stored data in response to user
  input. This lab walks you through writing a set of functions that are capable
  of building an interactive application.

  First, we'll need to write a function for loading points onto the map. Choose
  any dataset from part1 and write a function here to download it, parse it,
  make it into markers, and plot it. You'll know you've succeeded when you can
  see markers on the map.

  NOTE 1: When we have added markers to the map in the past, we have used a line like:

       L.marker([50.5, 30.5]).addTo(map);

       This is accomplishing two goals. L.marker([50.5, 30.5]) makes a marker
       and .addTo(map) adds that marker to the map. This task differs in that
       you are being asked to create separate functions: one to create markers
       and one to add them to the map.

  (IMPORTANT!)
  NOTE 2: These functions are being called for you. Look to the bottom of this file
       to see where and how the functions you are defining will be used. Remember
       that function calls (e.g. func();) which are equal to a value (i.e. you
       can set a var to it: var result = func();) must use the 'return' keyword.

       var justOne = function() {
         return 1;
       }
       var one = justOne();
===================== */

// Use the data source URL from lab 1 in this 'ajax' function:
//var downloadData = $.ajax("https://raw.githubusercontent.com/sydng/OST4GIS-week4/master/GSI_Public_Projects_Point.geojson");
//var myUrl=$('#text-input1').val();
//var downloadData = $.ajax(myUrl);

var parseData = function(data) {
  var step1 = JSON.parse(data);
  var step2 = step1.features;
  var step3 = [];
  for (var key in step2) {
    step3.push({LATITUDE: _.propertyOf(step2[key].geometry)('coordinates')[1],
                LONGITUDE: _.propertyOf(step2[key].geometry)('coordinates')[0],
                PROJECTNAME: _.propertyOf(step2[key].properties)('PROJECTNAME')});
            }
  return step3;
};

var makeMarkers = function(elem) {
  var lat = $("#text-input2").val().toUpperCase();
  var lon = $("#text-input3").val().toUpperCase();
  if (lat != "LATITUDE") {
    lat = "LATITUDE";
  }
  if (lon != "LONGITUDE") {
    lon = "LONGITUDE";
  }
  var description = $("#text-input4").val();
  var color = $("#color-input").val();
  var step4 = [];
  for(var key in elem) {
      step4.push(L.circleMarker([elem[key][lat], elem[key][lon]], {color: color}).bindPopup(description));
      }
  return step4;
};

// Now we need a function that takes this collection of markers and puts them on the map
var plotMarkers = function(layer) {
    _.each(layer, function(x) { map.addLayer(x); });
};

var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 14
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

/* =====================
 CODE EXECUTED HERE!
===================== */

$("#text-label1").text("URL");
  $("#text-input1").val("").prop('disabled', false);
$("#text-label2").text("Coordinate Key 1");
  $("#text-input2").val("").prop('disabled', false);
$("#text-label3").text("Coordinate Key 2");
  $("#text-input3").val("").prop('disabled', false);
$("#text-label4").text("Description");
  $("#text-input4").val("").prop('disabled', false);
$("#color-label").text("Choose Style");
  $("#color-input").val();
$("button").text("Map It");


$("button").text("Map It").click(function(){
    $(document).ready(function() {

      var myUrl=$('#text-input1').val();
      var downloadData = $.ajax(myUrl);

      downloadData.done(function(data) {
        var parsed = parseData(data);
        var markers = makeMarkers(parsed);
        plotMarkers(markers);
      });
    });
});
