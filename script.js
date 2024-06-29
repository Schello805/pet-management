document.addEventListener('DOMContentLoaded', () => {
    const sections = {
        'haustier-liste-section': document.getElementById('haustier-liste-section'),
        'neues-haustier-section': document.getElementById('neues-haustier-section'),
        'profil-section': document.getElementById('profil-section'),
        'dokumente-section': document.getElementById('dokumente-section'),
    };

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
            .then(response => response.json())
            .then(data => {
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
                    document.getElementById(`bearbeite-haustier-form-${haustier.id}`).addEventListener('submit', (event) => {
                        event.preventDefault();
                        speichereHaustierDaten(haustier.id);
                    });

                    // Event listener for the file input
                    document.getElementById(`foto-${haustier.id}`).addEventListener('change', (event) => {
                        const file = event.target.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                document.getElementById(`foto-preview-${haustier.id}`).src = e.target.result;
                            };
                            reader.readAsDataURL(file);
                        }
                    });
                });
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
        detailsDiv.classList.toggle('d-none');
    };

    window.loescheHaustier = function(id) {
        const formData = new FormData();
        formData.append('id', id);

        fetch('loeschen.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            zeigeHaustierListe(); // Aktualisiere die Liste nach dem Löschen
        })
        .catch(error => console.error('Fehler:', error));
    };

    function fuegeNeuesHaustierHinzu(event) {
        event.preventDefault();
        const formData = new FormData(neuesHaustierForm);
        
        fetch('speichern.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            zeigeHaustierListe(); // Aktualisiere die Liste nach dem Hinzufügen
            neuesHaustierForm.reset();
        })
        .catch(error => console.error('Fehler:', error));
    }

    function speichereProfil(event) {
        event.preventDefault();
        const formData = new FormData(profilForm);
        
        fetch('speichern_profil.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            userProfil.email = profilForm.querySelector('#email').value;
            alert('Profil gespeichert');
        })
        .catch(error => console.error('Fehler:', error));
    }

    function ladeDokumente() {
        fetch('lade_dokumente.php')
        .then(response => response.json())
        .then(data => {
            dokumenteListe.innerHTML = '';
            data.forEach(dokument => {
                const li = document.createElement('li');
                li.className = 'list-group-item list-group-item-custom';
                li.innerHTML = `
                    <div class="d-flex justify-content-between align-items-center">
                        <div>${dokument.dokument_name}</div>
                        <a href="${dokument.pfad}" class="btn btn-primary" download>Download</a>
                    </div>
                `;
                dokumenteListe.appendChild(li);
            });
        })
        .catch(error => console.error('Fehler:', error));
    }

    function fuegeNeuesDokumentHinzu(event) {
        event.preventDefault();
        const formData = new FormData(dokumenteForm);
        
        fetch('speichern_dokument.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            ladeDokumente(); // Aktualisiere die Dokumentenliste nach dem Hinzufügen
            dokumenteForm.reset();
        })
        .catch(error => console.error('Fehler:', error));
    }

    function speichereHaustierDaten(id) {
        const form = document.getElementById(`bearbeite-haustier-form-${id}`);
        const formData = new FormData(form);
        formData.append('id', id);

        fetch('bearbeiten.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            zeigeHaustierListe(); // Aktualisiere die Liste nach dem Bearbeiten
        })
        .catch(error => console.error('Fehler:', error));
    }

    function zeigeSection(section) {
        Object.keys(sections).forEach(key => {
            sections[key].classList.add('d-none');
        });
        sections[section].classList.remove('d-none');
    }

    document.getElementById('haustier-liste-nav').addEventListener('click', () => {
        zeigeSection('haustier-liste-section');
        zeigeHaustierListe();
    });

    document.getElementById('neues-haustier-nav').addEventListener('click', () => {
        zeigeSection('neues-haustier-section');
    });

    document.getElementById('profil-nav').addEventListener('click', () => {
        zeigeSection('profil-section');
        profilForm.querySelector('#email').value = userProfil.email;
    });

    document.getElementById('dokumente-nav').addEventListener('click', () => {
        zeigeSection('dokumente-section');
        ladeDokumente();
    });

    neuesHaustierForm.addEventListener('submit', fuegeNeuesHaustierHinzu);
    profilForm.addEventListener('submit', speichereProfil);
    dokumenteForm.addEventListener('submit', fuegeNeuesDokumentHinzu);

    // Initialze Liste anzeigen
    zeigeHaustierListe();
});
