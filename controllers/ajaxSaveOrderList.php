<?php
// Get the data from the client.
$record = file_get_contents('php://input');
// convert file contents to json object
$jsonrec = json_decode($record);
// read the primary key
$User = $jsonrec->User;
//write the data out to a file on the server
//make sure permissions are all OK!
//create the parent folder
if (!is_dir('../models/OrderedLists/')) {
mkdir('../models/OrderedLists/');
}

//define the file
$jsonFile = "../models/OrderedLists/" . $User . "-ordered-item-list.json";

$f = fopen($jsonFile, 'w') or die("Error: Can't open file. Got write permission?");
fwrite($f, $record);
fclose($f);
?>