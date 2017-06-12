
  // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAJZC-N_rlcWyPjs94X7tl6js8zCztGJjY",
      authDomain: "all-aboard-6ff64.firebaseapp.com",
      databaseURL: "https://all-aboard-6ff64.firebaseio.com",
      projectId: "all-aboard-6ff64",
      storageBucket: "all-aboard-6ff64.appspot.com",
      messagingSenderId: "118442425636"
  };
  firebase.initializeApp(config);

  // Create a variable to reference the database
	var database = firebase.database();

	//button click
	$('#add-thomas').on("click",function(event){
	  event.preventDefault();

	//initial retrieveTrainSchedule variables decleration
	var trainName = "";
	var destination = "";
	var frequency;
	var nextArrival = 0;

	trainName = $('#trainName-input').val().trim();
	destination = $('#destination-input').val().trim();
	frequency = $('#frequency-input').val().trim();
	nextArrival = $('#nextArrival-input').val().trim();

	//prevents input fields are not empty
	if(trainName != "" && destination !="" && frequency != "" && nextArrival != "") {
		//append data into firebaseDB
		database.ref('thomas-data').push({
			trainName: trainName,
			destination: destination,
			frequency: frequency,
			nextArrival: nextArrival,
      timeAdded: firebase.database.ServerValue.TIMESTAMP
		}); //END append dato to firebaseDB
    $("#trainForm")[0].reset();

	} //if(trainName != "" && destination !="" && frequency != "" && nextArrival != "")

}); //$('#add-thomas').on("click"

		var retrieveTrainSchedule = $('#thomasInfo');
		database.ref('thomas-data').on("child_added", function(snapshot) {

    //prep variables
    var trainName = snapshot.val().trainName;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;

    //- check if nextArrival is in the past, if so adjust it according to frequency
    var n = moment(snapshot.val().nextArrival, 'HH:mm')._i;
    var now = moment().format('HH:mm');
    if (n<now) {
      // first add frequency minutes to nextArrival
      var convertCurrent = moment(moment()._d).format('HH:mm');
      var currentArrival = moment(convertCurrent, 'HH:mm').add(frequency, 'm');
      // console.log(moment(currentArrival).format('HH:mm'));

      var nextArrival = moment(currentArrival).format('HH:mm');
      // console.log(nextArrival);
    }
    else {
      var nextArrival = snapshot.val().nextArrival;
    }

    var departure = moment().format("YYYY-MM-DD") + "T" + nextArrival + "00:000";
    var minutesAway = moment(departure).diff(moment(), "minutes");
    //add to DOM
    var $trainName = $('<td>').text(trainName);
    var $destination = $('<td>').text(destination);
    var $frequency = $('<td>').text(frequency);
    var $nextArrival = $('<td>').text(nextArrival);
    var $minutesAway = $('<td>').text(minutesAway);

    retrieveTrainSchedule
     .append('<tr>')
     .append($trainName)
     .append($destination)
     .append($frequency)
     .append($nextArrival)
     .append($minutesAway);

  //    well.append(['name', 'email', 'age', 'comment'].map(item => {
  //    return $('<div>').attr('id', item).text(snapshot).val()[item]
  //  }));

		// console.log(snapshot.val());
	}); //.on("child_added"
