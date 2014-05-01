<?php

// Show any errors
ini_set('display_errors', true);

// Initialize the output array
$output = array();

// Find out where we're running from
$webroot = $_SERVER['DOCUMENT_ROOT'];

// Execute the shell script
exec("$webroot/deploy/pull.sh 2>&1", $output);

// Set the log file
$log = "$webroot/deploy/log.txt";

// Get previous log contents so we can prepend
$log_contents = file_get_contents($log);

// cut after 10k lines
$log_contents = substr($log_contents, 0, 10000);

// Build the log record
$str = "================ ".date('Y-m-d H:i:s')." ===============\n";

foreach ($output as $line) {
    $str .= $line."\n";
}

$str .= "\n\n";

// Write the log
file_put_contents($log, $str.$log_contents);

// Print the results
echo '<pre>'.$str.'</pre>';