<?php
//header('Content-Type: text/html; charset=utf-8');
ini_set('display_errors', 1);
date_default_timezone_set( 'Europe/Copenhagen' );
include('PHPMailerAutoload.php');

$return = new stdClass();
$errors = array();

if (isset($_POST['robots']) && !empty($_POST['robots'])){
	$return->status = "robot";
	$return = json_encode($return);
	echo $return;
	die(); // If this parameter is filled, it was probably done by a robot. Kill script.
} 


if (isset($_POST['name']) && !empty($_POST['name'])){
	$name = utf8_decode($_POST['name']);
} else {
	array_push($errors, "name not set");
}

if (isset($_POST['address']) && !empty($_POST['address'])){
	$address = utf8_decode($_POST['address']);
} else {
	array_push($errors, "address not set");
}

if (isset($_POST['zip']) && !empty($_POST['zip'])){
	$zip = utf8_decode($_POST['zip']);
} else {
	array_push($errors, "zip not set");
}

if (isset($_POST['city']) && !empty($_POST['city'])){
	$city = utf8_decode($_POST['city']);
} else {
	array_push($errors, "city not set");
}

if (isset($_POST['email']) && !empty($_POST['email'])){
	$email = utf8_decode($_POST['email']);
} else {
	array_push($errors, "email not set");
}

if (isset($_POST['comments']) && !empty($_POST['comments'])){
	$comment = utf8_decode($_POST['comments']);
}

//$timestamp = 
$date = date("d. M Y");
$time = date("H:i");

$mail = new PHPMailer;
//$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'send.one.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'robot.emmagadikke@example.com';                 // SMTP username
$mail->Password = '3mmagadikk3';                           // SMTP password
$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; 

$mail->setFrom('robot.emmagadikke@example.com', 'EmmaGadIkke - Salg');
//$mail->addAddress('esbenlykkeolsen@gmail.com');     // Add a recipient
$mail->addAddress('munke04@hotmail.com');     // Add a recipient
$mail->isHTML(true); 

$mail->Subject = 'Ny bestilling - Emma Gad Ikke';
$mail->Body    = "Ny bestilling modtaget den $date kl. $time <br /><br />
				Navn: $name <br />
				Adresse: $address <br />
				Postnummer: $zip <br />
				By: $city <br />
				Email: $email <br />
				Kommentar: $comment<br />
				
";

//$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

if (empty($errors)){
	if(!$mail->send()) {
//		echo 'Message could not be sent.';
//		echo 'ERROR' . $mail->ErrorInfo;
		$return->status = "Error: " . $mail->ErrorInfo;
//		echo json_encode($return);
	} else {
//		echo 'OK';
		$return->status = "OK";
//		echo json_encode($return);
	}
	
} else {
	$return->status = "Error: errors in parameters";
	$return->errors = $errors;
//	echo json_encode($return);
}

$return = json_encode($return);
echo $return;

?> 

 