<?php
// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : 'No name provided';
    $email = isset($_POST['email']) ? htmlspecialchars($_POST['email']) : 'No email provided';
    $message = isset($_POST['message']) ? htmlspecialchars($_POST['message']) : 'No message provided';
    
    // Set email parameters
    $to = "space.reinvent@gmail.com";
    $subject = "New message from SpaceInvent website";
    
    // Create email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";
    
    // Set email headers
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    // Send the email
    $success = mail($to, $subject, $email_content, $headers);
    
    // Redirect to thank you page
    if ($success) {
        header("Location: thank-you.html");
        exit;
    } else {
        // If mail fails, redirect to a page with error message
        header("Location: index.html?status=error#contact");
        exit;
    }
} else {
    // Not a POST request, redirect to home page
    header("Location: index.html");
    exit;
}
?> 