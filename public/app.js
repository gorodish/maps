var MapWrapper = function(container, center, zoom){
  this.googleMap = new google.maps.Map(container, {
    center: center,
    zoom: zoom
  });
};

MapWrapper.prototype = {
  addMarker: function(coords){
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      animation: google.maps.Animation.DROP
    });

    var contentString = '<div id="content">'+
        '<p>Latitude: ' + coords.lat + '</p><p>' + 'Longitude: ' + coords.lng + '</p></div>';
    var infowindow = new google.maps.InfoWindow({
       content: contentString
     });
    marker.addListener('click', function() {
      infowindow.open(this.googleMap, marker);
    }.bind(this));
  },
  addClickEvent: function(){
    google.maps.event.addListener(this.googleMap, "click", function(event){
    var lat = ("Latitude: ", event.latLng.lat());
    var lng = ("Longitude: ", event.latLng.lng());
    this.addMarker({lat: event.latLng.lat(), lng: event.latLng.lng()});
    }.bind(this));
  }
};
var app = function(){ 
  var container = document.getElementById("main-map");
  var center = {lat: 51.5074, lng: 0.1278};
  var zoom = 10;
  var mainMap = new MapWrapper(container, center, zoom);
  mainMap.addMarker(center);
  mainMap.addClickEvent();
};

window.onload = app;