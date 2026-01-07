document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('ophtalmoForm');
    const resetBtn = document.getElementById('resetBtn');
    const printBtn = document.getElementById('printBtn');
    const printableArea = document.getElementById('printableArea');
    const dateNaissanceInput = document.getElementById('dateNaissance');
    const ageInput = document.getElementById('age');
    const headerLogo = document.getElementById('headerLogo');

    if (typeof LOGO_BASE64 !== 'undefined') {
        headerLogo.src = LOGO_BASE64;
    }

    dateNaissanceInput.addEventListener('change', calculateAge);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        generateFiche();
    });

    resetBtn.addEventListener('click', function() {
        form.reset();
        ageInput.value = '';
        printableArea.innerHTML = '';
    });

    printBtn.addEventListener('click', function() {
        window.print();
    });

    function calculateAge() {
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

    function generateFiche() {
        const sexeRadio = document.querySelector('input[name="sexe"]:checked');
        const formData = {
            date: formatDate(document.getElementById('date').value),
            entreprise: document.getElementById('entreprise').value,
            nom: document.getElementById('nom').value,
            prenoms: document.getElementById('prenoms').value,
            dateNaissance: formatDate(document.getElementById('dateNaissance').value),
            age: document.getElementById('age').value,
            sexe: sexeRadio ? sexeRadio.value : '',
            avlSansDroit: formatAcuity(document.getElementById('avlSansDroit').value),
            avpSansDroit: formatAcuity(document.getElementById('avpSansDroit').value),
            avlSansGauche: formatAcuity(document.getElementById('avlSansGauche').value),
            avpSansGauche: formatAcuity(document.getElementById('avpSansGauche').value),
            avlAvecDroit: formatAcuity(document.getElementById('avlAvecDroit').value),
            avpAvecDroit: formatAcuity(document.getElementById('avpAvecDroit').value),
            avlAvecGauche: formatAcuity(document.getElementById('avlAvecGauche').value),
            avpAvecGauche: formatAcuity(document.getElementById('avpAvecGauche').value),
            examenFondDroit: document.getElementById('examenFondDroit').value || '............',
            examenFondGauche: document.getElementById('examenFondGauche').value || '............',
            conclusion: document.getElementById('conclusion').value || ''
        };

        const ficheHTML = createFicheHTML(formData);
        printableArea.innerHTML = ficheHTML;
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
