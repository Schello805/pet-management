<?php
header('Content-Type: application/json');
require 'db_connection.php'; // Deine Datenbankverbindung

// Deine Abfrage
$query = "SELECT * FROM haustiere";
$result = $conn->query($query);

$haustiere = array();
while($row = $result->fetch_assoc()) {
    $haustiere[] = $row;
}

// Gib die Daten als JSON aus
echo json_encode($haustiere);
?>
