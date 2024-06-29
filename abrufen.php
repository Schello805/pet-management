<?php
$servername = "localhost";
$username = "haustieruser";
$password = "sicheres_passwort";
$dbname = "haustierverwaltung";

// Verbindung zur Datenbank herstellen
$conn = new mysqli($servername, $username, $password, $dbname);

// Verbindung überprüfen
if ($conn->connect_error) {
    die("Verbindung fehlgeschlagen: " . $conn->connect_error);
}

$sql = "SELECT * FROM haustiere";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Daten ausgeben
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["id"]. " - Name: " . $row["name"]. " - Geburtsdatum: " . $row["geburtsdatum"]. "<br>";
    }
} else {
    echo "0 Ergebnisse";
}

$conn->close();
?>
