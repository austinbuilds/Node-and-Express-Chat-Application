// Socket.io
let socket = io();

// Document Ready
$(() => {

  // On #send click callback
  $("#send").click(() => {
    // Assign message name value & message value
    let message = { name: $("#name").val(), message: $("#message").val() };
    // Call post message function passing message
    postMessage(message);
  });

  // Call get message function
  getMessages();
});

// Socket.io add message when called
socket.on('message', addMessage);

// Add messages takes message and appends to #messages
function addMessage(message) {
  $("#messages").append(`<h4> ${message.name} </h4> <p> ${message.message} </p>`);
};

// Get messages checks for messages & sends each to addMessages
function getMessages() {
  $.get('http://localhost:3000/messages', (data) => {
    data.forEach(addMessage);
  })
};

// Takes message from #send click & posts
function postMessage(message) {
  $.post('http://localhost:3000/messages', message);
};
