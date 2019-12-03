<?php

// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require 'vendor/autoload.php';

$record = file_get_contents('php://input');
// convert file contents to json object
$jsonrec = json_decode($record);
// read the primary key
$Email = $jsonrec->Email;
$parts = explode('@', $Email);
$UserName = $parts[0];
$Code = $jsonrec->ItemURL;
$Subject = "ASDA Share Item";
$Content = "Hi {$UserName}, \r\n {$ItemURL}";

// Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'bhanukabandara97@gmail.com';                     // SMTP username
    $mail->Password   = 'Bhanuka19970927';                               // SMTP password
    $mail->SMTPSecure = 'tls';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
    $mail->Port       = 587;                                    // TCP port to connect to

    //Recipients
    $mail->setFrom('bhanukabandara97@gmail.com', 'Mailer');
    $mail->addAddress("{$Email}", "{$UserName}");     // Add a recipient

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = "{$Subject}";
    $mail->Body    = "{$Content}";
    $mail->AltBody = "{$Content}";

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}


?>
