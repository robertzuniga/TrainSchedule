// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
console.log('AWESOME TRAIN STUFF!');

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAzjvKnkcLrNXq8ltvu62ueDPiPHae9am8",
  authDomain: "my-fb-demo-211e7.firebaseapp.com",
  databaseURL: "https://my-fb-demo-211e7.firebaseio.com",
  projectId: "my-fb-demo-211e7",
  storageBucket: "my-fb-demo-211e7.appspot.com",
  messagingSenderId: "314643695164",
  appId: "1:314643695164:web:ff371179fda757ac"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#name").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrainTime = moment($("#firsttime").val().trim(), "HH:mm").format("X");
  var frequency = $("#frequency").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    trainName,
    destination,
    firstTrainTime,
    frequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  // console.log(newTrain);

  alert("Train added");

  // Clears all of the text-boxes
  $("#name").val("");
  $("#destination").val("");
  $("#firsttime").val("");
  $("#frequency").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  var firstTrainTime = childSnapshot.val().firstTrainTime;
  var tFrequency = childSnapshot.val().frequency;
  var formattedTimeString = moment(firstTrainTime, "X").format("LT");

  console.log(`First Train Time: ${formattedTimeString}`);
 
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrainTime, "X").subtract(1, "years");
    // var firstTimeConverted = moment(firstTrainTime, "X");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // console.log(`First Train Time Difference with Now: ${diff.format("LT")}`);

  // Store everything into a variable.
  // var empName = childSnapshot.val().name;
  // var empRole = childSnapshot.val().role;
  // var empStart = childSnapshot.val().start;
  // var empRate = childSnapshot.val().rate;

  // // Employee Info
  // console.log(empName);
  // console.log(empRole);
  // console.log(empStart);
  // console.log(empRate);

  // // Prettify the employee start
  // var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

  // // Calculate the months worked using hardcore math
  // // To calculate the months worked
  // var empMonths = moment().diff(moment(empStart, "X"), "months");
  // console.log(empMonths);

  // // Calculate the total billed rate
  // var empBilled = empMonths * empRate;
  // console.log(empBilled);

  // // Create the new row
  // var newRow = $("<tr>").append(
  //   $("<td>").text(empName),
  //   $("<td>").text(empRole),
  //   $("<td>").text(empStartPretty),
  //   $("<td>").text(empMonths),
  //   $("<td>").text(empRate),
  //   $("<td>").text(empBilled)
  // );

  // // Append the new row to the table
  // $("#employee-table > tbody").append(newRow);
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case