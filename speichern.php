<?php
header('Content-Type: application/json');
require 'db_connection.php'; // Deine Datenbankverbindung

// Daten von POST erhalten
$id = $_GET['id'];
$name = $_POST['name'];
$geburtsdatum = $_POST['geburtsdatum'];
$geschlecht = $_POST['geschlecht'];
$letzteImpfung = $_POST['letzteImpfung'];
$letzteImpfungBeschreibung = $_POST['letzteImpfungBeschreibung'];
$naechsteImpfung = $_POST['naechsteImpfung'];
$naechsteImpfungBeschreibung = $_POST['naechsteImpfungBeschreibung'];
$rasse = $_POST['rasse'];

// Optional: Foto hochladen und Pfad speichern
// ...

// Aktualisiere die Datenbank
$query = "UPDATE haustiere SET name=?, geburtsdatum=?, geschlecht=?, letzteImpfung=?, letzteImpfungBeschreibung=?, naechsteImpfung=?, naechsteImpfungBeschreibung=?, rasse=? WHERE id=?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ssssssssi", $name, $geburtsdatum, $geschlecht, $letzteImpfung, $letzteImpfungBeschreibung, $naechsteImpfung, $naechsteImpfungBeschreibung, $rasse, $id);
$stmt->execute();

// Gib eine Erfolgsmeldung zurück
$response = array('status' => 'success', 'message' => 'Daten gespeichert');
echo json_encode($response);
?>
