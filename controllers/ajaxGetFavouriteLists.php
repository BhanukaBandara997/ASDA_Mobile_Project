<?php
//get the file contents from the server
If (isset($_REQUEST['file'])) {
$file = basename($_REQUEST['file']);
echo file_get_contents('../models/FavouriteLists/'.$file);
} Else {
If (is_dir('../models/FavouriteLists/') && $handle = opendir('../models/FavouriteLists/')) {
While (False !== ($entry = readdir($handle))) {
If (!is_dir($entry)) {
echo basename($entry)."\n";
}
}
closedir($handle);
} Else {
header("HTTP/1.0 404 Not Found");
}
}
?>

