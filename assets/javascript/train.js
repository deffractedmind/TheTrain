
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

		//this should have an array of objects not sure how to set it up
		//append data into firebaseDB
		database.ref('thomas-data').push({
			trainName: trainName,
			destination: destination,
			frequency: frequency,
			nextArrival: nextArrival,
      timeAdded: firebase.database.ServerValue.TIMESTAMP

		}); //END append dato to firebaseDB

	} //if(trainName != "" && destination !="" && frequency != "" && nextArrival != "")

}); //$('#add-thomas').on("click"

		var retrieveTrainSchedule = $('#thomasInfo');
		database.ref('thomas-data').on("child_added", function(snapshot) {

    var trainName = $('<td>').text(snapshot.val().trainName);
    var destination = $('<td>').text(snapshot.val().destination);
    var frequency = $('<td>').text(snapshot.val().frequency);
    // var empty1 = $('<td>')
    var nextArrival = $('<td>').text(snapshot.val().nextArrival);
    var empty2 = $('<td>')
    retrieveTrainSchedule
     .append('<tr>')
     .append(trainName)
     .append(destination)
     .append(frequency)
    //  .append(empty1)
     .append(nextArrival)
     .append(empty2);

  //    well.append(['name', 'email', 'age', 'comment'].map(item => {
  //    return $('<div>').attr('id', item).text(snapshot).val()[item]
  //  }));

		console.log(snapshot.val());
	}); //database.ref('employee-data').on("child_added"
