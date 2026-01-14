document.addEventListener('DOMContentLoaded', function() {
    const form1 = document.getElementById('ophtalmoForm1');
    const form2 = document.getElementById('ophtalmoForm2');
    const generateBtn = document.getElementById('generateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const printBtn = document.getElementById('printBtn');
    const printableArea = document.getElementById('printableArea');
    const dateNaissanceInput1 = document.getElementById('dateNaissance1');
    const ageInput1 = document.getElementById('age1');
    const dateNaissanceInput2 = document.getElementById('dateNaissance2');
    const ageInput2 = document.getElementById('age2');
    const headerLogo = document.getElementById('headerLogo');

    if (typeof LOGO_BASE64 !== 'undefined') {
        headerLogo.src = LOGO_BASE64;
    }

    dateNaissanceInput1.addEventListener('change', () => calculateAge('1'));
    dateNaissanceInput2.addEventListener('change', () => calculateAge('2'));

    generateBtn.addEventListener('click', function() {
        if (form1.checkValidity() && form2.checkValidity()) {
            generateBothFiches();
        } else {
            alert('Veuillez remplir tous les champs obligatoires des deux fiches.');
        }
    });

    resetBtn.addEventListener('click', function() {
        form1.reset();
        form2.reset();
        ageInput1.value = '';
        ageInput2.value = '';
        printableArea.innerHTML = '';
    });

    printBtn.addEventListener('click', function() {
        window.print();
    });

    function calculateAge(formNumber) {
        const dateNaissanceInput = document.getElementById('dateNaissance' + formNumber);
        const ageInput = document.getElementById('age' + formNumber);

        const birthDate = new Date(dateNaissanceInput.value);
        if (isNaN(birthDate.getTime())) {
            ageInput.value = '';
            return;
        }
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        ageInput.value = age + ' ans';
    }

    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return day + '/' + month + '/' + year;
    }

    function formatAcuity(value) {
        if (!value || value.trim() === '') return '/ 10';
        const num = value.replace(/[^0-9]/g, '');
        if (num) return num + '/10';
        return value + '/10';
    }

    function getFormData(formNumber) {
        const sexeRadio = document.querySelector('input[name="sexe' + formNumber + '"]:checked');
        return {
            date: formatDate(document.getElementById('date' + formNumber).value),
            entreprise: document.getElementById('entreprise' + formNumber).value,
            nom: document.getElementById('nom' + formNumber).value,
            prenoms: document.getElementById('prenoms' + formNumber).value,
            dateNaissance: formatDate(document.getElementById('dateNaissance' + formNumber).value),
            age: document.getElementById('age' + formNumber).value,
            sexe: sexeRadio ? sexeRadio.value : '',
            avlSansDroit: formatAcuity(document.getElementById('avlSansDroit' + formNumber).value),
            avpSansDroit: formatAcuity(document.getElementById('avpSansDroit' + formNumber).value),
            avlSansGauche: formatAcuity(document.getElementById('avlSansGauche' + formNumber).value),
            avpSansGauche: formatAcuity(document.getElementById('avpSansGauche' + formNumber).value),
            avlAvecDroit: formatAcuity(document.getElementById('avlAvecDroit' + formNumber).value),
            avpAvecDroit: formatAcuity(document.getElementById('avpAvecDroit' + formNumber).value),
            avlAvecGauche: formatAcuity(document.getElementById('avlAvecGauche' + formNumber).value),
            avpAvecGauche: formatAcuity(document.getElementById('avpAvecGauche' + formNumber).value),
            examenFondDroit: document.getElementById('examenFondDroit' + formNumber).value || '............',
            examenFondGauche: document.getElementById('examenFondGauche' + formNumber).value || '............',
            conclusion: document.getElementById('conclusion' + formNumber).value || ''
        };
    }

    function generateBothFiches() {
        const formData1 = getFormData('1');
        const formData2 = getFormData('2');

        const fiche1HTML = createFicheHTML(formData1);
        const fiche2HTML = createFicheHTML(formData2);

        printableArea.innerHTML = fiche1HTML + '<hr class="fiche-separator">' + fiche2HTML;
        printableArea.scrollIntoView({ behavior: 'smooth' });
    }

    function createFicheHTML(data) {
        const sexeDisplay = data.sexe || '';

        return `
            <div class="fiche">
                <div class="fiche-header-bar"></div>
                <div class="fiche-logo">
                    <img src="${typeof LOGO_BASE64 !== 'undefined' ? LOGO_BASE64 : 'LOGO UMED HD 1 (2).png'}" alt="UMED">
                </div>

                <div class="fiche-line-double">
                    <div class="part">
                        <span class="label">Date :</span>
                        <span class="dots">${data.date}</span>
                    </div>
                    <div class="part">
                        <span class="label">Entreprise :</span>
                        <span class="dots">${data.entreprise}</span>
                    </div>
                </div>

                <div class="fiche-line">
                    <span class="label">Nom :</span>
                    <span class="dots">${data.nom}</span>
                </div>

                <div class="fiche-line">
                    <span class="label">Prenoms :</span>
                    <span class="dots">${data.prenoms}</span>
                </div>

                <div class="fiche-line">
                    <span class="label">Date de naissance:</span>
                    <span class="dots">${data.dateNaissance}</span>
                </div>

                <div class="fiche-line">
                    <span class="label">Âge :</span>
                    <span class="dots">${data.age}</span>
                </div>

                <div class="fiche-line">
                    <span class="label">Sexe :</span>
                    <span class="dots">${sexeDisplay}</span>
                </div>

                <div class="fiche-data">
                    <div class="fiche-data-header">
                        <div class="col-label"></div>
                        <div class="col-data">OEIL DROIT</div>
                        <div class="col-data">OEIL GAUCHE</div>
                    </div>

                    <div class="fiche-data-section-title">SANS CORRECTION</div>
                    <div class="fiche-data-row">
                        <div class="col-label">Acuité Visuelle de Loin</div>
                        <div class="col-data">${data.avlSansDroit}</div>
                        <div class="col-data">${data.avlSansGauche}</div>
                    </div>
                    <div class="fiche-data-row">
                        <div class="col-label">Acuité Visuelle de Près</div>
                        <div class="col-data">${data.avpSansDroit}</div>
                        <div class="col-data">${data.avpSansGauche}</div>
                    </div>

                    <div class="fiche-data-section-title">AVEC CORRECTION</div>
                    <div class="fiche-data-row">
                        <div class="col-label">Acuité Visuelle de Loin</div>
                        <div class="col-data">${data.avlAvecDroit}</div>
                        <div class="col-data">${data.avlAvecGauche}</div>
                    </div>
                    <div class="fiche-data-row">
                        <div class="col-label">Acuité Visuelle de Près</div>
                        <div class="col-data">${data.avpAvecDroit}</div>
                        <div class="col-data">${data.avpAvecGauche}</div>
                    </div>

                    <div class="fiche-data-row" style="margin-top: 10px;">
                        <div class="col-label"><strong>EXAMEN DU FOND D'OEIL</strong></div>
                        <div class="col-data">${data.examenFondDroit}</div>
                        <div class="col-data">${data.examenFondGauche}</div>
                    </div>
                </div>

                <div class="fiche-conclusion">
                    <span class="label">CONCLUSION :</span>
                    <span class="dots">${data.conclusion}</span>
                </div>

                <div class="fiche-footer">
                    <div class="fiche-footer-title">Agence de Développement de l'E-Santé (A.D.E.S)</div>
                    <div>SARL Capital: 10 000 000 FCFA, Imm. Haussmann, BP 464 CEDEX III Abidjan, Côte d'Ivoire</div>
                    <div>RCCM N°: CI-ABJ-2019-B-11938 | N° CC: 1931586 C | FDFP: 242-2019/HAB/NKJ/ALB8/kt | DEPS: 000245/MSHP/DGS/DEPS/nkiamr</div>
                </div>
            </div>
        `;
    }
});
