<?php
// db_connection.php

$servername = "localhost"; // Datenbankserver
$username = "haustieruser"; // Dein Datenbankbenutzername
$password = "sicheres_passwort"; // Dein Datenbankpasswort
$dbname = "haustierverwaltung"; // Der Name deiner Datenbank

// Verbindung erstellen
$conn = new mysqli($servername, $username, $password, $dbname);

// Verbindung prüfen
if ($conn->connect_error) {
    die("Verbindung fehlgeschlagen: " . $conn->connect_error);
}

?>
