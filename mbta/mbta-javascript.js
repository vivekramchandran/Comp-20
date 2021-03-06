	  var map;


    function initMap() {
      var MBTAlocs = [
      	{name: "South Station", myLatLng: {lat: 42.352271, lng: -71.05524200000001}},
      	{name: "Andrew", myLatLng: {lat: 42.330154, lng: -71.057655}},
      	{name: "Porter Square", myLatLng: {lat: 42.3884, lng: -71.11914899999999}},
      	{name: "Harvard Square", myLatLng: {lat: 42.373362, lng: -71.118956}},
      	{name: "JFK/UMass", myLatLng: {lat: 42.320685, lng: -71.052391}},
      	{name: "Savin Hill", myLatLng: {lat: 42.31129, lng: -71.053331}},
      	{name: "Park Street", myLatLng: {lat: 42.35639457, lng: -71.0624242}},
      	{name: "Broadway", myLatLng: {lat: 42.342622, lng: -71.056967}},
      	{name: "North Quincy", myLatLng: {lat: 42.275275, lng: -71.029583}},
      	{name: "Shawmut", myLatLng: {lat: 42.29312583, lng: -71.06573796000001}},
      	{name: "Davis", myLatLng: {lat: 42.39674, lng: -71.121815}},
      	{name: "Alewife", myLatLng: {lat: 42.395428, lng: -71.142483}},
      	{name: "Kendall/MIT", myLatLng: {lat: 42.36249079, lng: -71.08617653}},
      	{name: "Charles/MGH", myLatLng: {lat: 42.361166, lng: -71.070628}},
      	{name: "Downtown Crossing", myLatLng: {lat: 42.355518, lng: -71.060225}},
      	{name: "Quincy Center", myLatLng: {lat: 42.251809, lng: -71.005409}},
      	{name: "Quincy Adams", myLatLng: {lat: 42.233391, lng: -71.007153}},
      	{name: "Ashmont", myLatLng: {lat: 42.284652, lng: -71.06448899999999}},
      	{name: "Wollaston", myLatLng: {lat: 42.2665139, lng: -71.0203369}},
      	{name: "Fields Corner", myLatLng: {lat: 42.300093, lng: -71.061667}},
      	{name: "Central Square", myLatLng: {lat: 42.365486, lng: -71.103802}},
      	{name: "Braintree", myLatLng: {lat: 42.2078543, lng: -71.0011385}}    	
      	];
      	
      var alewifeAshmontLocs = [
      		{lat: 42.395428, lng: -71.142483}, //Alewife
      		{lat: 42.39674, lng: -71.121815}, // Davis
      		{lat: 42.3884, lng: -71.11914899999999}, // Porter
      		{lat: 42.373362, lng: -71.118956}, // Harvard
      		{lat: 42.365486, lng: -71.103802}, // Central
      		{lat: 42.36249079, lng: -71.08617653}, // Kendall
      		{lat: 42.361166, lng: -71.070628}, // Charles
      		{lat: 42.35639457, lng: -71.0624242}, // Park St
      		{lat: 42.355518, lng: -71.060225}, // Downtown Crossing
      		{lat: 42.352271, lng: -71.05524200000001}, // South Station
      		{lat: 42.342622, lng: -71.056967}, // Broadway
      		{lat: 42.330154, lng: -71.057655}, // Andrew
      		{lat: 42.320685, lng: -71.052391}, // JFK
      		{lat: 42.31129, lng: -71.053331}, // Savin Hill
      		{lat: 42.300093, lng: -71.061667}, // Fields Corner
      		{lat: 42.29312583, lng: -71.06573796000001}, // Shawmut
      		{lat: 42.284652, lng: -71.06448899999999} // Ashmont
      	];
      
      	var JFKBrainLocs = [
      		{lat: 42.320685, lng: -71.052391}, // JFK
      		{lat: 42.275275, lng: -71.029583}, // North Quincy
      		{lat: 42.2665139, lng: -71.0203369}, // Wollaston
      		{lat: 42.251809, lng: -71.005409}, // Quincy Center
      		{lat: 42.233391, lng: -71.007153}, // Quincy Adams
      		{lat: 42.2078543, lng: -71.0011385} // Braintree
      	];
      	
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 42.3519, lng: -71.0551},
          zoom: 12
        });
        
        var icon = {
   			 url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/MBTA.svg/1024px-MBTA.svg.png", // url
    		 scaledSize: new google.maps.Size(15, 15), // scaled size

        };
      var request = new XMLHttpRequest();
      var stationInfowindow = [];
             var final_array = [];
      request.open("GET", "https://hidden-wildwood-24761.herokuapp.com/redline.json", true);
      request.onreadystatechange = function(){

       if (request.readyState == 4 && request.status == 200) {
        var raw = request.responseText;
        var content = JSON.parse(raw);
        final_array = gather_data(content);
        }
       if (final_array[0] == undefined){
        return;
       }

      names = [];

      for (var i = 0; i < MBTAlocs.length; i++) {
        names[i] = MBTAlocs[i].name
      }

      for (var i = 0; i < MBTAlocs.length; i++) {
        stationInfowindow[i] = find_info(final_array, names[i])
      }


      var marker_array = [];


      var markers = [];
      var infowindows = [];

      for (var i = 0; i < MBTAlocs.length; i++) {
        markers[i] = new google.maps.Marker({
              position: MBTAlocs[i].myLatLng, 
              map: map, 
              title: MBTAlocs[i].name,
              icon: icon
        });
        marker_array.push(markers[i]);

        markers[i].index = i;
   
        infowindows[i] = new google.maps.InfoWindow({
            content: stationInfowindow[i],
            maxWidth: 300
        });

        google.maps.event.addListener(markers[i], 'click', function() {
            infowindows[this.index].open(map,markers[this.index]);
        }); 
    }

    }    


       	
    

		request.send();
       	   
  		var alewifeAshmont = new google.maps.Polyline({
   		 path: alewifeAshmontLocs,
    	 geodesic: true,
    	 strokeColor: '#FF0000',
   		 strokeOpacity: 1.0,
   		 strokeWeight: 2
  		});
  		
  		var JFKBrain = new google.maps.Polyline({
   		 path: JFKBrainLocs,
    	 geodesic: true,
    	 strokeColor: '#FF0000',
   		 strokeOpacity: 1.0,
   		 strokeWeight: 2
  		});

 		alewifeAshmont.setMap(map);
 		JFKBrain.setMap(map);


    var infoWindow = new google.maps.InfoWindow({map: map});

    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
          
          var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

          infoWindow.setPosition(pos);
          
          var minDistance = distanceCalc(pos.lat, pos.lng, MBTAlocs[0].myLatLng.lat, MBTAlocs[0].myLatLng.lng);
          var minStation = MBTAlocs[0].name;
          var minLat = MBTAlocs[0].myLatLng.lat, minLng = MBTAlocs[0].myLatLng.lng;
          var distance = [];
          var marker = new google.maps.Marker({
               position: pos,
               map: map
            });

          for (var i = 1; i < 22; i++) {
            if (distanceCalc(pos.lat, pos.lng, MBTAlocs[i].myLatLng.lat, MBTAlocs[i].myLatLng.lng) < minDistance) {
                     minDistance = distanceCalc(pos.lat, pos.lng, MBTAlocs[i].myLatLng.lat, MBTAlocs[i].myLatLng.lng);
                     minStation = MBTAlocs[i].name;
                     minLat = MBTAlocs[i].myLatLng.lat;
                     minLng = MBTAlocs[i].myLatLng.lng;
                  }
            distance[i] = MBTAlocs[i].myLatLng;
          }
         

        infoWindow.setContent(minStation);

        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.open(map,marker);
        }); 
        var closeLineLocs = [{lat: pos.lat, lng: pos.lng} , {lat: minLat, lng: minLng}];

        var closeLine = new google.maps.Polyline({
       path: closeLineLocs,
       geodesic: true,
       strokeColor: '#66CD00',
       strokeOpacity: 1.0,
       strokeWeight: 2
      });
        closeLine.setMap(map);


          // infoWindow.setContent(word);
 

            // map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
		
}

function find_info(final_array, train_stop_name) {
	var indices = []
	var result = ""
	for (i = 0; i < final_array[0].length; i++) {
		if (final_array[0][i] == train_stop_name) {
			indices.push(i)
		}
	}
	var min_time = final_array[1][indices[0]];
	var final_index;
	for (i = 0; i < indices.length; i++) {
    if (final_array[1][indices[0]] > 0) {
		  result += "A Red Line train with a final destination of " + final_array[2][indices[i]] + " will arrive at " + final_array[0][indices[i]] + " in " + final_array[1][indices[i]] + " seconds.  ";
	 }
  }
	return result
}

function gather_data(content) {
	final_array = []
	var temp_destination = [];
	var destination = [];
	var train_stop = [];
	var wait_time = [];
	var predict = [];
	var all_trips = content["TripList"]
	var schedule = all_trips["Trips"]
	for (i = 0; i < schedule.length; i++) {
		temp_destination.push(schedule[i]["Destination"]);
		predict.push(schedule[i]["Predictions"]);		
	}
	for (i = 0; i < predict.length; i++) {
		for (j = 0; j < predict[i].length; j++) {
			train_stop.push(predict[i][j]["Stop"]);
			wait_time.push(predict[i][j]["Seconds"]);
			destination.push(temp_destination[i])
		}
	}		
	final_array.push(train_stop);
	final_array.push(wait_time);
	final_array.push(destination);
	return final_array
}


function distanceCalc(lat1, lon1, lat2, lon2) {

var R = 6371; // km 
//has a problem with the .toRad() method below.
var x1 = lat2-lat1;
var dLat = toRad(x1);  
var x2 = lon2-lon1;
var dLon = toRad(x2);  
var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
                Math.sin(dLon/2) * Math.sin(dLon/2);  
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
var d = R * c; 
    
    return d;
}

function toRad(x) {
   return x * Math.PI / 180;
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }