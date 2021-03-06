
function getFoursquare(){
  var url = "https://api.foursquare.com/v2/venues/search?v=20161016&ll=44.814879%2C%20+20.476069&query=park&intent=browse&radius=2000&client_id=2BQ1RYD4BSFFUCSCUK1MMHAYINQULNTARI1WM04UF0M5HP1J&client_secret=WY1FLJOHGKOFJPAKIMQQNGE0L0BLD0U3QKGKBJXAEJFSFV5Z&limit=3";
  $.ajax({
    url: url,
    dataType: 'json',
    success: function(data){
    	
      	var venues = data.response.venues;
      	$.each(venues, function(i,venue){
      		var venues_address = venue.location.address;
      		var venues_lat = venue.location.lat;
      		var venues_lng = venue.location.lng;
        	$('.holder').append('<div class="restaurant_wrapper" id="restaurant_wrapper'+i+'"><p>' + venue.name + '</p><p class="address" id="address'+i+'">' + venues_address + '</p></div>'); 
          
          //click adress
          
          $( "#address" +i).click(function () {
                var adressMarker = {lat: venues_lat, lng: venues_lng};
                var startPosition = {lat: 44.814879, lng: 20.476069};
                console.log(adressMarker);
                 deleteMarkers();

                addMarker(startPosition);
                addMarker(adressMarker);
          });

          //click adress

        //second ajax
		    var url = "https://api.foursquare.com/v2/venues/"+venue.id+"/tips?group=venue&client_id=2BQ1RYD4BSFFUCSCUK1MMHAYINQULNTARI1WM04UF0M5HP1J&client_secret=WY1FLJOHGKOFJPAKIMQQNGE0L0BLD0U3QKGKBJXAEJFSFV5Z&v=20180404&limit=1";
		      $.ajax({
			     url: url,
			     dataType: 'json',
			     success: function(data1){
			   
			       var venues1 = data1.response.tips.items;
      	     $.each(venues1, function(index,venue1){
        	   $('#restaurant_wrapper' +i).append('<p class="description_text">' + venue1.text + '</p>');      

          });//second each

    }//second success

  });//second ajax
    //second ajax
      });//each
    }//success
  });//ajax
};//getfourspace

      var map;
      var markers = [];

      function initMap() {
        var startPosition = {lat: 44.814879, lng: 20.476069};

        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: startPosition,
          mapTypeId: 'terrain'
        });
        // Adds a marker at the center of the map.
        addMarker(startPosition);
      }

      // Adds a marker to the map and push to the array.
      function addMarker(location) {
        var marker = new google.maps.Marker({
          position: location,
          map: map
        });
        markers.push(marker);
      }

      // Sets the map on all markers in the array.
      function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }

      // Removes the markers from the map, but keeps them in the array.
      function clearMarkers() {
        setMapOnAll(null);
      }

      // Shows any markers currently in the array.
      function showMarkers() {
        setMapOnAll(map);
      }

      // Deletes all markers in the array by removing references to them.
      function deleteMarkers() {
        clearMarkers();
        markers = [];
      }





$(document).ready(function() {
getFoursquare();

});//doc.ready

