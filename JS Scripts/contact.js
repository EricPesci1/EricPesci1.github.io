// JavaScript for handling the contact form submission
// Defining a function to send me an email when the contact form is submitted
function handleContact(e) {
  e.preventDefault();
  //Fetching values from the form using the getElementById method
  const name = document.getElementById("cf-name").value.trim();
  const subject = document.getElementById("cf-subject").value.trim();
  const message = document.getElementById("cf-message").value.trim();
  const status = document.getElementById("cf-status");
  //Checking if any of the fields are empty and displaying a message if so. It took me a while to figure this out but I got the if statement to work.
  if (!name || !subject || !message) {
    status.textContent = "Please fill all fields.";
    return;
  }
  //Creating the format for how the message will look and format, then opening the user's email client with a pre-filled email to me. I had to use Copilot to help me with this part and how to implement it.
  const bodyText = `From: ${name}\n\n${message}`;
  const mailto = `mailto:ericpesci04@gmail.com?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(bodyText)}`;
  window.location.href = mailto;
  status.textContent = "Opening email client...";
}
