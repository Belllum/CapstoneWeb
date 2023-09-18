// Get a reference to the Firestore database
var db = firebase.firestore();

// Retrieve data from Firestore collection
db.collection('alarm').get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      var data = doc.data();

      // Get the field values
      var MedicationDosage = data.MedicationDosage;
      var alarmDateEnd = data.alarmDateEnd;
      var alarmDateStart = data.alarmDateStart;
      var alarmTimeStart = data.alarmTimeStart;
      var medicationConsumptionCount = data.medicationConsumptionCount;
      var medicineName = data.medicineName;
      var timeIntervalD = data.timeInterval;

      // Get the alarm details
      var startDate = new Date(alarmDateStart);
      var endDate = new Date(alarmDateEnd);
      var alarmTimeStart = alarmTimeStart;
      var medicationDosage = MedicationDosage;
      var consumptionCount = parseInt(medicationConsumptionCount); // Number of times the alarm should repeat
      var timeInterval = parseInt(timeIntervalD); // Time interval between each alarm (in minutes)
      var remainingCount = consumptionCount; // Remaining count of medication consumption

      // Calculate the start and end datetime for the alarm sequence
      var startDateTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(),
                                   parseInt(alarmTimeStart.split(':')[0]), parseInt(alarmTimeStart.split(':')[1]));
      var endDateTime = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(),
                                 parseInt(alarmTimeStart.split(':')[0]), parseInt(alarmTimeStart.split(':')[1]));

      // Calculate the time difference between the current time and the start datetime
      var timeDifference = startDateTime - new Date();

      // Check if the start datetime has already passed
      if (timeDifference <= 0) {
        console.log('The start datetime has already passed.');
      } else {
        // Schedule the initial alarm
        setTimeout(function() {
          triggerAlarm(medicineName);
          scheduleRecurringAlarms();
        }, timeDifference);
      }

// Function to trigger the alarm
function triggerAlarm(medicineName) {
    console.log('Alarm triggered!');
    console.log('Medicine name:', medicineName);
    console.log('Remaining Count:', remainingCount);
  
    // Play a ring sound
    var audio = new Audio('../audio/alarm.mp3');
    audio.play();
  
    // Display an alert
    alert('Alarm! Time to take ' + medicineName);
  
    remainingCount--; // Decrement the remaining count
  
    if (remainingCount > 0) {
      console.log('Remaining Count:', remainingCount);
      // Schedule the next alarm if the remaining count is more than 0
      setTimeout(triggerAlarm, timeInterval * 60 * 1000);
    } else {
        alert('All medication consumed.');
    }
  }
  

      // Function to schedule recurring alarms
      function scheduleRecurringAlarms() {
        var interval = timeInterval * 60 * 1000; // Convert time interval to milliseconds

        // Calculate the number of days between the start and end date
        var daysDifference = Math.ceil((endDateTime - startDateTime) / (1000 * 60 * 60 * 24));

        // Schedule the remaining alarms based on consumption count, time interval, and days difference
        for (var i = 1; i < consumptionCount; i++) {
          for (var j = 0; j <= daysDifference; j++) {
            var scheduledDateTime = new Date(startDateTime.getTime() + j * (24 * 60 * 60 * 1000) + i * interval);
            setTimeout(function() {
              triggerAlarm(medicineName);
            }, scheduledDateTime - new Date());
          }
        }
      }
    });
  })
  .catch(function(error) {
    console.log("Error getting documents: ", error);
  });
