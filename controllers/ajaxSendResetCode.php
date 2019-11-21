<?php
// Get the data from the client.
$record = file_get_contents('php://input');
// convert file contents to json object
$jsonrec = json_decode($record);
// read the primary key
$Email = $jsonrec->Email;
$Code = $jsonrec->FourDigitCode;

mail($Email, $Code);
?>
