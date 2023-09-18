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
// Get a reference to the Firestore database
var db = firebase.firestore();

// Reference to the table body element
var tableBody = document.querySelector('.sub-table tbody');

// Function to create and populate a table row with the data
function createTableRow(data) {
  // Create new elements
  var newRow = document.createElement('tr');
  var newTd = document.createElement('td');
  var newDiv = document.createElement('div');
  var innerDiv = document.createElement('div');
  var h1 = document.createElement('h1');
  var h3 = document.createElement('h3');
  var h4 = document.createElement('h4');
  var button = document.createElement('button');
  var buttonText = document.createElement('font');

  // Set the element classes and styles
  newDiv.classList.add('dashboard-items', 'search-items');
  innerDiv.style.width = '100%';
  button.classList.add('login-btn', 'btn-primary-soft', 'btn');
  button.style.paddingTop = '11px';
  button.style.paddingBottom = '11px';
  button.style.width = '100%';
  buttonText.classList.add('tn-in-text');
  buttonText.textContent = 'Done';

  // Set the data values to the element contents
  h1.textContent = data.medicineName;
  h3.innerHTML = '<span class="label">Start Date:</span> ' + data.alarmDateStart + '<br/><span class="label">End Date:</span> ' + data.alarmDateEnd;
  h3.style.color = 'black'; // Set h3 color to black
  h4.innerHTML =
    '<div class="data-container">' +
    '<div><span>Alarm Time Start:</span> ' +
    data.alarmTimeStart +
    '</div>' +
    '<div><span>Medication Dosage:</span> ' +
    data.MedicationDosage +
    '</div>' +
    '<div><span>Consumption Count:</span> ' +
    data.medicationConsumptionCount +
    '</div>' +
    '<div><span>Time Interval:</span> ' +
    data.timeInterval +
    '</div>' +
    '</div>';

  h4.style.color = '#888'; // Set h4 color to black

  // Append the elements to construct the table row
  button.appendChild(buttonText);
  innerDiv.appendChild(h1);
  innerDiv.appendChild(h3);
  innerDiv.appendChild(h4);
  innerDiv.appendChild(button);
  newDiv.appendChild(innerDiv);
  newTd.appendChild(newDiv);
  newRow.appendChild(newTd);
  tableBody.appendChild(newRow);
}

// Retrieve the data from Firestore and populate the table
db.collection('alarm')
  .get()
  .then(function(querySnapshot) {
    var hasMedicineAlarm = false; // Flag to check if there are medicine alarms for the user

    querySnapshot.forEach(function(doc) {
      var data = doc.data();
      // Compare userid and patientid before creating the table row
      if (userid.toString() === data.patientid) {
        createTableRow(data);
        hasMedicineAlarm = true; // Set the flag to true when a medicine alarm is found
      }
    });

   // Display a message if there are no medicine alarms
if (!hasMedicineAlarm) {
  var popupContainer = document.createElement('div');
  popupContainer.classList.add('popup-container');

  var popupImage = document.createElement('img');
  popupImage.src = '../img/notfound.svg';
  popupImage.style.width = '25%';

  var popupMessage = document.createElement('p');
  popupMessage.classList.add('heading-main12');
  popupMessage.style.marginLeft = '45px';
  popupMessage.style.fontSize = '20px';
  popupMessage.style.color = 'rgb(49, 49, 49)';
  popupMessage.textContent = "There are currently no alarms scheduled.";




  var popupLink = document.createElement('a');
  popupLink.classList.add('non-style-link');
  popupLink.href = 'schedule.php';


  popupContainer.appendChild(popupImage);
  popupContainer.appendChild(document.createElement('br'));
  popupContainer.appendChild(popupMessage);
  popupContainer.appendChild(popupLink);

  var messageRow = document.createElement('tr');
  var messageCell = document.createElement('td');
  messageCell.colSpan = 4;
  messageCell.style.textAlign = 'center'; // Center the cell content
  messageCell.appendChild(popupContainer);
  messageRow.appendChild(messageCell);
  tableBody.appendChild(messageRow);
}

  })
  .catch(function(error) {
    console.error('Error getting documents: ', error);
  });