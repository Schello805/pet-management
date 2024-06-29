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

// Daten aus POST-Anfrage abrufen
$name = $_POST['name'];
$geburtsdatum = $_POST['geburtsdatum'];
$geschlecht = $_POST['geschlecht'];
$letzteImpfung = $_POST['letzteImpfung'];
$letzteImpfungBeschreibung = $_POST['letzteImpfungBeschreibung'];
$naechsteImpfung = $_POST['naechsteImpfung'];
$naechsteImpfungBeschreibung = $_POST['naechsteImpfungBeschreibung'];
$tierart = $_POST['tierart'];
$rasse = $_POST['rasse'];
$foto = $_POST['foto']; // Pfad zum Bild, falls hochgeladen

// SQL-Befehl zum Einfügen der Daten
$sql = "INSERT INTO haustiere (name, geburtsdatum, geschlecht, letzteImpfung, letzteImpfungBeschreibung, naechsteImpfung, naechsteImpfungBeschreibung, tierart, rasse, foto)
VALUES ('$name', '$geburtsdatum', '$geschlecht', '$letzteImpfung', '$letzteImpfungBeschreibung', '$naechsteImpfung', '$naechsteImpfungBeschreibung', '$tierart', '$rasse', '$foto')";

if ($conn->query($sql) === TRUE) {
    echo "Neuer Datensatz erfolgreich erstellt";
} else {
    echo "Fehler: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
