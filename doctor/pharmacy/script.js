  // Replace with your own Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAf7yRLEpa_wMxIuztOVBSg41a7N9XAO5o",
    authDomain: "webb-a4eff.firebaseapp.com",
    databaseURL: "https://webb-a4eff-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "webb-a4eff",
    storageBucket: "webb-a4eff.appspot.com",
    messagingSenderId: "527785203486",
    appId: "1:527785203486:web:be66796aac3ce589a35b0f",
    measurementId: "G-JRV8EBH893"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Get a reference to the database service
  var database = firebase.database();
  document.addEventListener("DOMContentLoaded", function () {
    var chatMessages = document.getElementById("chat-messages");
    var messageInput = document.getElementById("message-input");
    var sendButton = document.getElementById("send-button");

    // Function to append a message to the chat
    function appendMessage(message, sender) {
        var messageDiv = document.createElement("div");
        messageDiv.className = "message " + sender;
        
        // Check if sender is "Doctor" and add "doctor" class for styling
        if (sender === "Doctor") {
            messageDiv.classList.add("doctor");
        }
        
        var senderLabel = document.createElement("div");
        senderLabel.className = "sender-label";
        senderLabel.textContent = sender === "Doctor" ? "Doctor" : "Patient";
        
        var messageText = document.createElement("div");
        messageText.className = "message-text";
        messageText.textContent = message;
        
        messageDiv.appendChild(senderLabel);
        messageDiv.appendChild(messageText);
        
        chatMessages.appendChild(messageDiv);
    }

    // Listen for new messages from Firebase
    var chatRef = database.ref("chatMessages");
    chatRef.on("child_added", function (snapshot) {
        var messageData = snapshot.val();
        appendMessage(messageData.text, messageData.sender);
    });

    // Send a message
    sendButton.addEventListener("click", function () {
        var message = messageInput.value.trim();
        if (message !== "") {
            chatRef.push({
                text: message,
                sender: "Doctor" // Change as needed
            });
            messageInput.value = "";
        }
    });
});

