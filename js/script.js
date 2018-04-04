$(document).ready(function() {
function getFoursquare(){
  var url = "https://api.foursquare.com/v2/venues/search?v=20161016&ll=44.787599%2C%20+20.465822&query=park&intent=browse&radius=2000&client_id=2BQ1RYD4BSFFUCSCUK1MMHAYINQULNTARI1WM04UF0M5HP1J&client_secret=WY1FLJOHGKOFJPAKIMQQNGE0L0BLD0U3QKGKBJXAEJFSFV5Z";
  $.ajax({
    url: url,
    dataType: 'json',
    success: function(data){
    	console.log(data);
      	var venues = data.response.venues;
      	$.each(venues, function(i,venue){
      		var venues_address = venue.location.address;
      		var venues_lat = venue.location.lat;
      		var venues_lng = venue.location.lng;
        	$('.holder').append('<div class="restaurant_wrapper"><p>' + venue.name + '</p><p class="address" id="address'+i+'">' + venues_address + '</p></div>');
        	$( "#address" + i).click(function() {
                    alert(venues_lat);
                    alert(venues_lng);
               }); 
     	
        	  
      });//each

    }//success

  });//ajax

};//getfourspace

getFoursquare();

});//doc.ready