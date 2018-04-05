
function getFoursquare(){
  var url = "https://api.foursquare.com/v2/venues/search?v=20161016&ll=44.787599%2C%20+20.465822&query=park&intent=browse&radius=2000&client_id=2BQ1RYD4BSFFUCSCUK1MMHAYINQULNTARI1WM04UF0M5HP1J&client_secret=WY1FLJOHGKOFJPAKIMQQNGE0L0BLD0U3QKGKBJXAEJFSFV5Z&limit=3";
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

        //second ajax
		    var url = "https://api.foursquare.com/v2/venues/"+venue.id+"/tips?group=venue&client_id=2BQ1RYD4BSFFUCSCUK1MMHAYINQULNTARI1WM04UF0M5HP1J&client_secret=WY1FLJOHGKOFJPAKIMQQNGE0L0BLD0U3QKGKBJXAEJFSFV5Z&v=20180404&limit=1";
		      $.ajax({
			     url: url,
			     dataType: 'json',
			     success: function(data1){
			     console.log(data1);
			     var venues1 = data1.response.tips.items;
      	   $.each(venues1, function(index,venue1){
        	 $('#restaurant_wrapper' +i).append('<p class="description_text">' + venue1.text + '</p>');      

          });//each

    }//success

  });//ajax
    //second ajax



      });//each

    }//success

  });//ajax

};//getfourspace
$(document).ready(function() {
getFoursquare();
});//doc.ready

