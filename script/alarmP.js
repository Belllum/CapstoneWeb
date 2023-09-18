// Initialize Firebase
  firebase.initializeApp({
    apiKey: "AIzaSyAf7yRLEpa_wMxIuztOVBSg41a7N9XAO5o",
    authDomain: "webb-a4eff.firebaseapp.com",
    databaseURL: "https://webb-a4eff-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "webb-a4eff",
    storageBucket: "webb-a4eff.appspot.com",
    messagingSenderId: "527785203486",
    appId: "1:527785203486:web:be66796aac3ce589a35b0f",
    measurementId: "G-JRV8EBH893"
  });
  var alarmDateStartInput = document.getElementById('alarmDateStart');
  var alarmDateEndInput = document.getElementById('alarmDateEnd');
  var currentDate = new Date();
  var currentDateString = currentDate.toISOString().split('T')[0];
  
  // Set the minimum date for the input fields
  alarmDateStartInput.min = currentDateString;
  alarmDateEndInput.min = currentDateString;
  
  // Get a reference to the Firestore database
  var db = firebase.firestore();

  // Get the "Save" button element
  var saveButton = document.getElementById('save');

  // Add click event listener to the "Save" button
saveButton.addEventListener('click', function(event) {
  event.preventDefault();
  
  // Get the input field values
  var medicineName = document.getElementById('medicineName').value;
  var alarmDateStart = document.getElementById('alarmDateStart').value;
  var alarmTimeStart = document.getElementById('alarmTimeStart').value;
  var MedicationDosage = document.getElementById('MedicationDosage').value;
  var medicationConsumptionCount = document.getElementById('medicationConsumptionCount').value;
  var alarmDateEnd = document.getElementById('alarmDateEnd').value;
  var timeInterval = document.getElementById('timeInterval').value;
  var alarmDateStartif = new Date(alarmDateStart.replace(/-/g, '/'));
  var alarmDateEndif = new Date(alarmDateEnd.replace(/-/g, '/'));
  
  console.log(alarmDateStartif);
  console.log(alarmDateEndif);
  
    // Validate the input fields
    if (
      medicineName === '' ||
      alarmDateStart === '' ||
      alarmTimeStart === '' ||
      MedicationDosage === '' ||
      medicationConsumptionCount === '' ||
      alarmDateEnd === '' ||
      timeInterval === ''
    ) {
      alert("Error: Please fill in all the required fields.");
      return;
    }
    else{
  // Compare the dates
  if (alarmDateEndif <= alarmDateStartif) {
    // Display an error message or perform any desired validation action
    alert("Error: Medication Schedule End should be after Medication Schedule Start.");
  } else {
    // Create a new document in Firestore collection
    var alarmData = {
      medicineName: medicineName,
      alarmDateStart: alarmDateStart,
      alarmTimeStart: alarmTimeStart,
      MedicationDosage: MedicationDosage,
      medicationConsumptionCount: medicationConsumptionCount,
      alarmDateEnd: alarmDateEnd,
      timeInterval: timeInterval,
      patientid: id
    };
    
    
    

      // Save the data to Firestore
      db.collection('alarm').add(alarmData)
        .then(function(docRef) {
          console.log('Document written with ID: ', docRef.id);
          // Reset the input fields after successful save
          document.getElementById('medicineName').value = '';
          document.getElementById('alarmDateStart').value = '';
          document.getElementById('alarmTimeStart').value = '';
          document.getElementById('MedicationDosage').value = '1';
          document.getElementById('medicationConsumptionCount').value = '';
          document.getElementById('alarmDateEnd').value = '';
          document.getElementById('timeInterval').value = '';
        })
        .catch(function(error) {
          console.error('Error adding document: ', error);
        });
    
  }
}
});


  console.log(id);
  
  
