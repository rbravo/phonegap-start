
$(function () {
  

	var elevator2;
	var myOptions2 = {
	    zoom: 11,
	    center: new google.maps.LatLng(-22.907072809355967, -43.21398052978515),
	    mapTypeId: 'satellite'
	};

	map2 = new google.maps.Map($('#map_canvas2')[0], myOptions2);

	var markers2 = [];

	var directionDisplay2;
	var directionDisplay3;

	var directionsService2 = new google.maps.DirectionsService();
	var directionsService3 = new google.maps.DirectionsService();
	var map2;
	var rendererOptions2 = {
	  draggable: false
	};
	directionsDisplay2 = new google.maps.DirectionsRenderer(rendererOptions2);
	directionsDisplay2.setMap(map2);

	var rendererOptions3 = {
	  draggable: false,
	  polylineOptions: new google.maps.Polyline({
	    strokeColor: '#FF0000',
	    strokeOpacity: 1.0,
	    })
	};
	directionsDisplay3 = new google.maps.DirectionsRenderer(rendererOptions3);
	directionsDisplay3.setMap(map2);

	function calcRoute2() {
	    var start2 = "RJ, Av Glaucio Gil 777";//document.getElementById('start2').value;
	    var end2 = "RJ, Av Presidente Vargas 520";//document.getElementById('end2').value;
	    var request2 = {
	        origin:start2,
	        destination:end2,
	        travelMode: google.maps.DirectionsTravelMode.DRIVING
	        //provideRouteAlternatives: false,
	        //unitSystem: UnitSystem.IMPERIAL
	    };
	    
	    var waypoints2 = [];
	        
	     if($('#start2').val() != "")
	     {
	         waypoints2.push({
	          location:$('#start2').val(),
	          stopover:true
	        })
	     }
	    
	    
	     if($('#end2').val() != "")
	     {
	         waypoints2.push({
	          location:$('#end2').val(),
	          stopover:true
	        })
	     }
	    
	    if(waypoints2.length > 0)
	        request2.waypoints = waypoints2;
	    
	    directionsService2.route(request2, function(response, status) {
	        if (status == google.maps.DirectionsStatus.OK) {
	            directionsDisplay2.setDirections(response);
	        }
	    });


	    var request3 = {
	        origin:$('#start2').val(),
	        destination:$('#end2').val(),
	        travelMode: google.maps.DirectionsTravelMode.DRIVING
	        //provideRouteAlternatives: false,
	        //unitSystem: UnitSystem.IMPERIAL
	    };
	    directionsService3.route(request3, function(response, status) {
	        if (status == google.maps.DirectionsStatus.OK) {
	            directionsDisplay3.setDirections(response);
	        }
	    });
	}

	calcRoute2();

	$('#newRide input[type=text]').change(calcRoute2);

	$('a[href="#newRide"]').click(function(){
		setTimeout(function(){
			google.maps.event.trigger(map2, 'resize');
			calcRoute2();
		},1000);
	});


	$('#select-native-fc').change(function(){$('#txIda').val((new Date()).getHours() + ':' + (new Date()).getMinutes()); });


	$('#wannaRide').click(function(){

        theme = $.mobile.loader.prototype.options.theme,
        textonly = false;
	    $.mobile.loading( 'show', {
	            text: 'Buscando caronas',
	            textVisible: true,
	            theme: theme,
	            textonly: textonly
	    });

	    setTimeout(function(){
	   		$.mobile.loading('hide');

	   		location.hash = "gotARide";

	   		setTimeout(function(){
				google.maps.event.trigger(map2, 'resize');
				calcRoute2();
			},1000);

	    },6000);

	});


	$('#begRide').click(function(){

		theme = $.mobile.loader.prototype.options.theme,
        textonly = false;
	    $.mobile.loading( 'show', {
	            text: 'Aguardando resposta do motorista',
	            textVisible: true,
	            theme: theme,
	            textonly: textonly
	    });

	    setTimeout(function(){
	   		$.mobile.loading('hide');
				$('#btFOI').click();

	    },10000);

	});
});


