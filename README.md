# pet-management

I searched but cannot find a solution to "maintain" my pets, especially the chickens. So I let build the software from ChatGPT. :-)

<img width="1300" alt="Bildschirmfoto 2024-06-29 um 08 02 12" src="https://github.com/Schello805/pet-management/assets/28543330/f878b597-f8f0-48e9-a68d-87b990226e6c">
<img width="1300" alt="Bildschirmfoto 2024-06-29 um 08 02 06" src="https://github.com/Schello805/pet-management/assets/28543330/6ccbbdc2-610b-4c14-91ef-df6e9ba11ce7">


Install instructions at for exmample Ubuntu server 22.04


sudo apt update  
sudo apt install apache2 mariadb-server php php-mysql  
<br>
sudo mysql_secure_installation  
sudo systemctl start apache2  
sudo systemctl start mariadb  
sudo mysql -u root -p  
<br>
CREATE DATABASE haustierverwaltung;  
CREATE USER 'haustieruser'@'localhost' IDENTIFIED BY 'sicheres_passwort';  
GRANT ALL PRIVILEGES ON haustierverwaltung.* TO 'haustieruser'@'localhost';  
FLUSH PRIVILEGES;  
<br>
Still in the mariadb executionwindow: 
``` 
USE haustierverwaltung;

CREATE TABLE haustiere (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    geburtsdatum DATE NOT NULL,
    geschlecht VARCHAR(10) NOT NULL,
    letzteImpfung DATE,
    letzteImpfungBeschreibung VARCHAR(255),
    naechsteImpfung DATE,
    naechsteImpfungBeschreibung VARCHAR(255),
    tierart VARCHAR(50) NOT NULL,
    rasse VARCHAR(255),
    foto VARCHAR(255)
);

CREATE TABLE dokumente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    haustier_id INT,
    dokument_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (haustier_id) REFERENCES haustiere(id)
);

CREATE TABLE benutzer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE benutzer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE
);
```
<br>

