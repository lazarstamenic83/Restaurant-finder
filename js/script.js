
function getFoursquare(){
  var url = "https://api.foursquare.com/v2/venues/search?v=20161016&ll=44.814879%2C%20+20.476069&query=restaurant&intent=browse&radius=2000&client_id=HYKZPMCYQCKI4GCQOPKWBUUNZV4REYDVUZNC4U0B55CM24NP&client_secret=CXUN52HLKQIH0XZJHGXZA3JPKYE1HWKAUTWYG10B0QCKIN1A&limit=13";
  $.ajax({
    url: url,
    dataType: 'json',
    success: function(data){
    	 // console.log(data);
      	var venues = data.response.venues;
      	$.each(venues, function(i,venue){
      		var venues_address = venue.location.address;
      		var venues_lat = venue.location.lat;
      		var venues_lng = venue.location.lng;
        	$('.holder').append('<div class="restaurant_wrapper" id="restaurant_wrapper'+i+'"><p>' + venue.name + '</p><p class="address" id="address'+i+'">' + venues_address + '</p></div>'); 
          if (venues_address === undefined){
              $('#address' +i).remove();
              $('#restaurant_wrapper' +i).append('<p>Addres not available</p>');
          }
          //click adress
          
          $( "#address" +i).click(function () {
                var adressMarker = {lat: venues_lat, lng: venues_lng};
                var startPosition = {lat: 44.814879, lng: 20.476069};
                deleteMarkers();
                addMarker(startPosition);
                addMarker(adressMarker);
                console.log(venues_address);
          });

          //click adress

        //second ajax
		var url1 = "https://api.foursquare.com/v2/venues/"+venue.id+"/tips?group=venue&client_id=HYKZPMCYQCKI4GCQOPKWBUUNZV4REYDVUZNC4U0B55CM24NP&client_secret=CXUN52HLKQIH0XZJHGXZA3JPKYE1HWKAUTWYG10B0QCKIN1A&v=20180404&limit=1";
		    $.ajax({
			  url: url1,
			  dataType: 'json',
			  success: function(data1){
			  	
			     var venues1 = data1.response.tips.items;
      	         $.each(venues1, function(index,venue1){
        	        $('#restaurant_wrapper' +i).append('<p class="description_text">' + venue1.text + '</p>');      
                 });//second each
             }//second success
         });//second ajax
        //second ajax

      //third ajax
        var url2 = "https://api.foursquare.com/v2/venues/"+venue.id+"/photos?group=venue&client_id=HYKZPMCYQCKI4GCQOPKWBUUNZV4REYDVUZNC4U0B55CM24NP&client_secret=CXUN52HLKQIH0XZJHGXZA3JPKYE1HWKAUTWYG10B0QCKIN1A&v=20180404&limit=1";
          $.ajax({
           url: url2,
           dataType: 'json',
           success: function(data2){
             var venues2 = data2.response.photos.items;
             $.each(venues2, function(index,venue2){
             	// console.log(venues2);
              $('#restaurant_wrapper' +i).append('<div class="getDetailsHolder"><p class="getDetails" id="getDetails'+i+'">More details....</p></div>');
              $( "#getDetails"+i).click(function() {                          
              $('#detailsHolder').append("<div class='imgWrapper' id='imgWrapper"+i+"'></div><div class='likesHolder' id='likesHolder"+i+"'></div><div class='nameSurname' id='nameSurname"+i+"'></div>");
              $('#imgWrapper'+i).css('background-image', 'url('+venue2.prefix+'500x500'+venue2.suffix+')');             
              $(".detailsHolder").fadeIn("slow");


               
                });  
              });//third each
            }//third success
         });//third ajax
        //third ajax

        //like with picture ajax
        var url3 = "https://api.foursquare.com/v2/venues/"+venue.id+"/likes?group=venue&client_id=HYKZPMCYQCKI4GCQOPKWBUUNZV4REYDVUZNC4U0B55CM24NP&client_secret=CXUN52HLKQIH0XZJHGXZA3JPKYE1HWKAUTWYG10B0QCKIN1A&v=20180404&limit=1";
          $.ajax({
           url: url3,
           dataType: 'json',
           success: function(data3){
           	// console.log(data3);
              var venues3 = data3.response.likes.items;
              $.each(venues3, function(index,venue3){
                       // console.log(venue3.firstName+ " "+venue3.lastName);
              			   // console.log(venue3.photo.prefix+"300x300"+venue3.photo.suffix);
              			   // console.log(data3.response.likes.count);
              $( "#getDetails"+i).click(function() {                          
              
               $('#likesHolder'+i).css('background-image', 'url('+venue3.photo.prefix+"100x100"+venue3.photo.suffix+')');             
               $('#nameSurname'+i).append("<i class='fa fa-thumbs-up'></i><p>"+venue3.firstName+"  "+venue3.lastName+"</p><p>Likes in total:</p><p>"+data3.response.likes.count+"</p>");

                }); //click function   
              });//fourth each
            }//fourth success
         });//fourth ajax

        //like with picture ajax

      });//each
    }//success
  });//ajax
};//getfoursqare

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
   $( ".closeButton").click(function() {
        $('.imgWrapper').remove();
        $('.likesHolder').remove();
        $('.nameSurname').remove();

        $(".detailsHolder").fadeOut("slow");

        });

});//doc.ready

