<?php
// Get the data from the client.
$record = file_get_contents('php://input');
// convert file contents to json object
$jsonRec = json_decode($record);
$array = $jsonRec->ShoppingCart;

$fileName = "ShoppingCart";
$i=0;
// foreach ($array as $value) {
//    if (array_key_exists("ParentFileName",$value)){
//        $fileName = $value->ParentFileName;
//        unset($array[$i]);
//  }
//  $i++;
//}

$jsonRec->ShoppingCart = $array;
$jsonUpdatedRec = json_encode($jsonRec);

//write the data out to a file on the server
//make sure permissions are all OK!
//create the parent folder
if (!is_dir('../models/ShoppingCart/')) {
mkdir('../models/ShoppingCart/');
}

//define the file
$jsonFile = "../models/ShoppingCart/" . $fileName . ".json";

$f = fopen($jsonFile, 'w') or die("Error: Can't open file. Got write permission?");
fwrite($f, $jsonUpdatedRec);
fclose($f);
?>
