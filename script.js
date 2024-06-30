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

    let haustiere = [
        {
            id: 1, 
            name: 'Bella', 
            geburtsdatum: '2018-05-20', 
            geschlecht: 'Weiblich', 
            letzteImpfung: '2023-01-15', 
            letzteImpfungBeschreibung: 'Tollwut',
            naechsteImpfung: '2024-01-15',
            naechsteImpfungBeschreibung: 'Staupe',
            tierart: 'Hund', 
            rasse: 'Labrador',
            dokumente: [],
            foto: ''
        },
        {
            id: 2, 
            name: 'Whiskers', 
            geburtsdatum: '2020-07-14', 
            geschlecht: 'Männlich', 
            letzteImpfung: '2023-02-10', 
            letzteImpfungBeschreibung: 'Leukose',
            naechsteImpfung: '2024-02-10', 
            naechsteImpfungBeschreibung: 'Katzenseuche',
            tierart: 'Katze', 
            rasse: 'Siamkatze',
            dokumente: [],
            foto: ''
        }
    ];

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
        haustierListe.innerHTML = '';
        haustiere.forEach(haustier => {
            const alter = berechneAlter(haustier.geburtsdatum);
            const li = document.createElement('li');
            li.className = 'list-group-item';
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
        haustiere = haustiere.filter(haustier => haustier.id !== id);
        zeigeHaustierListe();
    };

    function fuegeNeuesHaustierHinzu(event) {
        event.preventDefault();
        const formData = new FormData(neuesHaustierForm);
        const neuesHaustier = {
            id: Date.now(),
            name: formData.get('name'),
            geburtsdatum: formData.get('geburtsdatum'),
            geschlecht: formData.get('geschlecht'),
            letzteImpfung: formData.get('letzteImpfung'),
            letzteImpfungBeschreibung: formData.get('letzteImpfungBeschreibung'),
            naechsteImpfung: formData.get('naechsteImpfung'),
            naechsteImpfungBeschreibung: formData.get('naechsteImpfungBeschreibung'),
            tierart: formData.get('tierart'),
            rasse: formData.get('rasse'),
            dokumente: [],
            foto: ''
        };
        const foto = formData.get('foto');
        if (foto) {
            const reader = new FileReader();
            reader.onload = function(e) {
                neuesHaustier.foto = e.target.result;
                haustiere.push(neuesHaustier);
                zeigeHaustierListe();
                neuesHaustierForm.reset();
            }
            reader.readAsDataURL(foto);
        } else {
            haustiere.push(neuesHaustier);
            zeigeHaustierListe();
            neuesHaustierForm.reset();
        }
    }

    function speichereProfil(event) {
        event.preventDefault();
        userProfil.email = profilForm.querySelector('#profil-email').value;
        alert('Profil gespeichert!');
    }

    function fuegeDokumentHinzu(event) {
        event.preventDefault();
        const fileInput = dokumenteForm.querySelector('#dokument-datei');
        const file = fileInput.files[0];
        if (file) {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = `${dokumenteForm.querySelector('#dokument-name').value} - ${file.name}`;
            dokumenteListe.appendChild(li);
            dokumenteForm.reset();
        } else {
            alert('Bitte wählen Sie eine Datei aus.');
        }
    }

    neuesHaustierForm.addEventListener('submit', fuegeNeuesHaustierHinzu);
    profilForm.addEventListener('submit', speichereProfil);
    dokumenteForm.addEventListener('submit', fuegeDokumentHinzu);

    document.getElementById('haustier-liste-nav').addEventListener('click', () => {
        zeigeAbschnitt('haustier-liste-section');
    });
    document.getElementById('neues-haustier-nav').addEventListener('click', () => {
        zeigeAbschnitt('neues-haustier-section');
    });
    document.getElementById('profil-nav').addEventListener('click', () => {
        zeigeAbschnitt('profil-section');
    });
    document.getElementById('dokumente-nav').addEventListener('click', () => {
        zeigeAbschnitt('dokumente-section');
    });

    function zeigeAbschnitt(abschnitt) {
        Object.keys(sections).forEach(key => {
            sections[key].style.display = key === abschnitt ? 'block' : 'none';
        });
    }

    zeigeHaustierListe();
});
