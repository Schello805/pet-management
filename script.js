document.addEventListener('DOMContentLoaded', () => {
    const sections = {
        'haustier-liste-section': document.getElementById('haustier-liste-section'),
        'neues-haustier-section': document.getElementById('neues-haustier-section'),
        'profil-section': document.getElementById('profil-section'),
        'dokumente-section': document.getElementById('dokumente-section'),
    };

    const haustierListeNav = document.getElementById('haustier-liste-nav');
    const neuesHaustierNav = document.getElementById('neues-haustier-nav');
    const profilNav = document.getElementById('profil-nav');
    const dokumenteNav = document.getElementById('dokumente-nav');

    const haustierListe = document.getElementById('liste');
    const neuesHaustierForm = document.getElementById('neues-haustier-form');
    const profilForm = document.getElementById('profil-form');
    const dokumenteForm = document.getElementById('dokumente-form');
    const dokumenteListe = document.getElementById('dokumente-liste');

    let userProfil = {
        email: 'example@example.com'
    };

    function berechneAlter(geburtsdatum) {
        const heute = new Date();
        const geburtstag = new Date(geburtsdatum);
        let alter = heute.getFullYear() - geburtstag.getFullYear();
        const m = heute.getMonth() - geburtstag.getMonth();
        if (m < 0 || (m === 0 && heute.getDate() < geburtstag.getDate())) {
            alter--;
        }
        return alter;
    }

    function zeigeHaustierListe() {
        fetch('abrufen.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Netzwerkantwort war nicht ok');
                }
                return response.text();  // Ändere hier zu text()
            })
            .then(text => {
                console.log('Antworttext:', text);  // Füge dies hinzu, um die Antwort zu überprüfen
                try {
                    const data = JSON.parse(text);  // Manuelles Parsen und Fehlerbehandlung
                    haustierListe.innerHTML = '';
                    data.forEach(haustier => {
                        const alter = berechneAlter(haustier.geburtsdatum);
                        const li = document.createElement('li');
                        li.className = 'list-group-item list-group-item-custom';
                        li.innerHTML = `
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="d-flex align-items-center">
                                    <img src="${haustier.foto || getIcon(haustier.tierart)}" alt="${haustier.tierart}" class="icon"> 
                                    ${haustier.name} (${alter} Jahre)
                                </div>
                                <button class="details-button" onclick="toggleDetails(${haustier.id})">Details</button>
                            </div>
                            <div id="details-${haustier.id}" class="details d-none">
                                <form id="bearbeite-haustier-form-${haustier.id}">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label for="name-${haustier.id}">Name</label>
                                                <input type="text" id="name-${haustier.id}" class="form-control" value="${haustier.name}" required>
                                            </div>
                                            <div class="form-group">
                                                <label for="geburtsdatum-${haustier.id}">Geburtsdatum</label>
                                                <input type="date" id="geburtsdatum-${haustier.id}" class="form-control" value="${haustier.geburtsdatum}" required>
                                            </div>
                                            <div class="form-group">
                                                <label for="geschlecht-${haustier.id}">Geschlecht</label>
                                                <select id="geschlecht-${haustier.id}" class="form-control" required>
                                                    <option value="Weiblich" ${haustier.geschlecht === 'Weiblich' ? 'selected' : ''}>Weiblich</option>
                                                    <option value="Männlich" ${haustier.geschlecht === 'Männlich' ? 'selected' : ''}>Männlich</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label for="letzteImpfung-${haustier.id}">Letzte Impfung</label>
                                                <input type="date" id="letzteImpfung-${haustier.id}" class="form-control" value="${haustier.letzteImpfung}">
                                            </div>
                                            <div class="form-group">
                                                <label for="letzteImpfungBeschreibung-${haustier.id}">Letzte Impfung Beschreibung</label>
                                                <input type="text" id="letzteImpfungBeschreibung-${haustier.id}" class="form-control" value="${haustier.letzteImpfungBeschreibung}">
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label for="naechsteImpfung-${haustier.id}">Nächste Impfung</label>
                                                <input type="date" id="naechsteImpfung-${haustier.id}" class="form-control" value="${haustier.naechsteImpfung}">
                                            </div>
                                            <div class="form-group">
                                                <label for="naechsteImpfungBeschreibung-${haustier.id}">Nächste Impfung Beschreibung</label>
                                                <input type="text" id="naechsteImpfungBeschreibung-${haustier.id}" class="form-control" value="${haustier.naechsteImpfungBeschreibung}">
                                            </div>
                                            <div class="form-group">
                                                <label for="rasse-${haustier.id}">Rasse</label>
                                                <input type="text" id="rasse-${haustier.id}" class="form-control" value="${haustier.rasse}" required>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <label for="foto-${haustier.id}">Foto</label>
                                                <input type="file" id="foto-${haustier.id}" class="form-control" accept="image/*">
                                                <img id="foto-preview-${haustier.id}" src="${haustier.foto}" alt="${haustier.name}" class="icon mt-2">
                                            </div>
                                            <div class="action-buttons mt-2">
                                                <button type="submit" class="btn btn-primary">Speichern</button>
                                                <button type="button" class="btn btn-danger" onclick="loescheHaustier(${haustier.id})">Löschen</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        `;
                        haustierListe.appendChild(li);

                        // Event listener for the form submission
                        document.getElementById(`bearbeite-haustier-form-${haustier.id}`).addEventListener('submit', function (event) {
                            event.preventDefault();
                            speichereHaustierDaten(haustier.id);
                        });

                        // Event listener for the file input change
                        document.getElementById(`foto-${haustier.id}`).addEventListener('change', function (event) {
                            const file = event.target.files[0];
                            const reader = new FileReader();
                            reader.onload = function (e) {
                                document.getElementById(`foto-preview-${haustier.id}`).src = e.target.result;
                            };
                            reader.readAsDataURL(file);
                        });
                    });
                } catch (e) {
                    console.error('Fehler beim Parsen des JSON:', e);
                }
            })
            .catch(error => console.error('Fehler:', error));
    }

    function getIcon(tierart) {
        switch (tierart) {
            case 'Hund': return 'https://img.icons8.com/ios-filled/50/000000/dog.png';
            case 'Katze': return 'https://img.icons8.com/ios-filled/50/000000/cat.png';
            case 'Kaninchen': return 'https://img.icons8.com/ios-filled/50/000000/rabbit.png';
            case 'Huhn': return 'https://img.icons8.com/ios-filled/50/000000/chicken.png';
            default: return 'https://img.icons8.com/ios-filled/50/000000/pet.png';
        }
    }

    window.toggleDetails = function(id) {
        const detailsDiv = document.getElementById(`details-${id}`);
        if (detailsDiv) {
            detailsDiv.classList.toggle('d-none');
        }
    };

    function fuegeNeuesHaustierHinzu(event) {
        event.preventDefault();
        const formData = new FormData(neuesHaustierForm);

        fetch('speichern.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Netzwerkantwort war nicht ok');
            }
            return response.text();
        })
        .then(data => {
            console.log('Antworttext nach dem Hinzufügen:', data); // Logge die Antwort nach dem Hinzufügen
            zeigeHaustierListe(); // Aktualisiere die Liste nach dem Hinzufügen
        })
        .catch(error => console.error('Fehler:', error));
    }

    function speichereHaustierDaten(id) {
        const form = document.getElementById(`bearbeite-haustier-form-${id}`);
        const formData = new FormData(form);

        fetch(`speichern.php?id=${id}`, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Netzwerkantwort war nicht ok');
            }
            return response.text();
        })
        .then(data => {
            console.log('Antworttext nach dem Speichern:', data); // Logge die Antwort nach dem Speichern
            zeigeHaustierListe(); // Aktualisiere die Liste nach dem Speichern
        })
        .catch(error => console.error('Fehler:', error));
    }

    function loescheHaustier(id) {
        fetch(`loeschen.php?id=${id}`, {
            method: 'POST'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Netzwerkantwort war nicht ok');
            }
            return response.text();
        })
        .then(data => {
            console.log('Antworttext nach dem Löschen:', data); // Logge die Antwort nach dem Löschen
            zeigeHaustierListe(); // Aktualisiere die Liste nach dem Löschen
        })
        .catch(error => console.error('Fehler:', error));
    }

    haustierListeNav.addEventListener('click', () => {
        Object.values(sections).forEach(section => section.style.display = 'none');
        sections['haustier-liste-section'].style.display = 'block';
        zeigeHaustierListe();
    });

    neuesHaustierNav.addEventListener('click', () => {
        Object.values(sections).forEach(section => section.style.display = 'none');
        sections['neues-haustier-section'].style.display = 'block';
    });

    profilNav.addEventListener('click', () => {
        Object.values(sections).forEach(section => section.style.display = 'none');
        sections['profil-section'].style.display = 'block';
    });

    dokumenteNav.addEventListener('click', () => {
        Object.values(sections).forEach(section => section.style.display = 'none');
        sections['dokumente-section'].style.display = 'block';
    });

    neuesHaustierForm.addEventListener('submit', fuegeNeuesHaustierHinzu);
});
