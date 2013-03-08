// Put your custom code here
$(document).bind("mobileinit", function () {
    $.mobile.pushStateEnabled = true;
});
 
$(function () {
  

	var elevator;
	var myOptions = {
	    zoom: 11,
	    center: new google.maps.LatLng(-22.907072809355967, -43.21398052978515),
	    mapTypeId: 'satellite'
	};

	map = new google.maps.Map($('#map_canvas')[0], myOptions);

	var markers = [];

	var directionDisplay;
	var directionsService = new google.maps.DirectionsService();
	var map;
	var rendererOptions = {
	  draggable: true
	};
	directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
	directionsDisplay.setMap(map);

	function calcRoute() {
	    var start = document.getElementById('start').value;
	    var end = document.getElementById('end').value;
	    var request = {
	        origin:start,
	        destination:end,
	        travelMode: google.maps.DirectionsTravelMode.DRIVING
	        //provideRouteAlternatives: false,
	        //unitSystem: UnitSystem.IMPERIAL
	    };
	    
	    var waypoints = [];
	        
	     if($('#carona1').val() != "")
	     {
	         waypoints.push({
	          location:$('#carona1').val(),
	          stopover:true
	        })
	     }
	    
	    
	     if($('#carona2').val() != "")
	     {
	         waypoints.push({
	          location:$('#carona2').val(),
	          stopover:true
	        })
	     }
	    
	    if(waypoints.length > 0)
	        request.waypoints = waypoints;
	    
	    directionsService.route(request, function(response, status) {
	        if (status == google.maps.DirectionsStatus.OK) {
	            directionsDisplay.setDirections(response);
	        }
	    });
	}

	calcRoute();

	$('#mapa input[type=text]').change(calcRoute);

	$('a[href="#mapa"]').click(function(){
		setTimeout(function(){
			google.maps.event.trigger(map, 'resize');
			calcRoute();
		},1000);
	});
});


