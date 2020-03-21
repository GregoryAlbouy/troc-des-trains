/* Database emulation */

let ticketDataList = [
    {
        "id": 0,
        "vendorName": "Ophélie Martin",
        "price": "99.49",
        "startTime": "9:10",
        "endTime": "12:31",
        "totalDuration": "3:21",
        "connections": "direct",
        "conditions": "Tous publics",
        "steps": [
            {
                "isConnection": false,
                "startTime": "9:10",
                "endTime": "12:31",
                "duration": "3:21"
            }
        ]
    },
    {
        "id": 1,
        "vendorName": "Jacques Duchamp",
        "price": "99.50",
        "startTime": "9:10",
        "endTime": "12:31",
        "totalDuration": "3:21",
        "connections": "direct",
        "conditions": "Tous publics",
        "steps": [
            {
                "isConnection": false,
                "startTime": "9:10",
                "endTime": "12:31",
                "duration": "3:21"
            }
        ]
    },
    {
        "id": 2,
        "vendorName": "Jean Dupont",
        "price": "79.00",
        "startTime": "11:04",
        "endTime": "14:48",
        "totalDuration": "3:44",
        "connections": "direct",
        "conditions": "Carte Sénior",
        "steps": [
            {
                "isConnection": false,
                "startTime": "11:04",
                "endTime": "14:48",
                "duration": "3:44"
            }
        ]
    },
    {
        "id": 3,
        "vendorName": "Arnaud Fornelli",
        "price": "49.99",
        "startTime": "12:17",
        "endTime": "19:42",
        "totalDuration": "6:45",
        "connections": "1 correspondance",
        "conditions": "Carte Jeune",
        "steps": [
            {
                "isConnection": false,
                "startTime": "12:17",
                "endTime": "14:25",
                "duration": "2h08"
            },
            {
                "isConnection": true,
                "duration": "40"
            },
            {
                "isConnection": false,
                "startTime": "12:17",
                "endTime": "14:25"
            }

        ]
    }
];

/* Shouldn't be here, but better for readability of the main.js */
const displayTickets = () => {
    for (const ticketData of ticketDataList) {
        const
            ticketListContainer = document.querySelector('.ticket-list-container'),
            ticket = document.createElement('article');

        ticket.classList.add('ticket');
        ticket.setAttribute('data-id', ticketData.id);

        ticket.innerHTML = `
            <header class="ticket-head">

                <div class="ticket-head__summary">

                    <h3 class="journey-date"><time datetime="2020-01-16">16/01/2020</time></h3>

                    <ul class="journey-info">


                        <li class="journey-step">
                            <time class="step-time" datetime="2020-01-16 ${ticketData.startTime}">${ticketData.startTime}</time>
                            <span class="step-station">Paris<span class="desktop-only"> Gare de Lyon</span></span>
                        </li>
                        <li class="journey-step">
                            <time class="step-time" datetime="2020-01-16 ${ticketData.endTime}">${ticketData.endTime}</time>
                            <span class="step-station">Montpellier<span class="desktop-only"> St-Roch</span></span>
                        </li>
                        <li class="journey-summary">
                            <time class="journey-duration" datetime="PT7H35M">${ticketData.totalDuration}</time>
                            <span class="journey-connections">${ticketData.connections}</span>
                        </li>

                    </ul>

                    <p class="conditions">${ticketData.conditions}</p>

                </div>

                <div class="ticket-head__price">
                    <p class="price">${ticketData.price}€</p>
                </div>

            </header>

            <div class="ticket-body">

                <section class="ticket-body__journey">

                    <h3 class="journey-title">Ma sélection</h3>
                    <aside class="journey-conditions">
                        <h4 class="conditions-title">Soumis à conditions : <span class="conditions-btn">voir détails</span></h4>
                        <p class="conditions-content"><strong>${ticketData.conditions}</strong> : penser à se munir d'une pièce justificative en cours de validité. Troc des trains et ses vendeurs affiliés ne sauraient être tenus responsables en cas d'omission.</p>
                    </aside>

                    <ul class="journey-steps">

                        <li class="step">

                            <div class="step-start">
                                <p class="step-time"><time datetime="2020-12-16 12:17">12:17</time></p>

                                <div class="step-info">
                                    <h4 class="train-station">Paris Gare de Lyon</h4>
                                    <p class="train-info">TGV inOUI 7364 | 2de - fenêtre</p>
                                </div>
                            </div>

                            <p class="step-duration"><time datetime="PT3H07M">3h07</time></p>

                            <div class="step-end">
                                <p class="step-time"><time datetime="2020-01-16 15:24">15:24</time></p>
                                
                                <div class="step-info">
                                    <h4 class="train-station">Lilles Flandres</h4>
                                </div>
                            </div>

                        </li>

                        <li class="transit">
                            <p class="transit-duration">Correspondance : 40 min.</p>
                        </li>

                        <li class="step">

                            <div class="step-start">
                                <p class="step-time"><time datetime="2020-01-16 16:04">16:04</time></p>

                                <div class="step-info">
                                    <h4 class="train-station">Lilles Flandres</h4>
                                    <p class="train-info">TER 2182 | 2de - carré</p>
                                </div>
                            </div>

                            <p class="step-duration"><time datetime="PT3H38M">3h38</time></p>

                            <div class="step-end">
                            <p class="step-time"><time datetime="2020-01-16 19:42">19:42</time></p>
                                
                                <div class="step-info">
                                    <h4 class="train-station">Montpellier St-Roch</h4>
                                </div>
                            </div>

                        </li>
                    </ul>


                    <p class="journey-duration">Durée totale : <span>${ticketData.totalDuration}</span></p>

                    <footer class="journey-add">

                        <p class="price">${ticketData.price}€</p>
                        <button class="btn btn--add">Ajouter au panier</button>

                    </footer>
                </section>

                <aside class="ticket-body__vendor">
                    <h3 class="vendor-title"><span class="mobile-only">Infos </span>Vendeur</h3>

                    <div class="vendor-display">
                        <div class="img-container"><img src="https://picsum.photos/200/300" alt=""></div>
                        <div class="infos">
                            <h4 class="vendor-name">${ticketData.vendorName}</h4>
                            <p class="vendor-notation" data-number="18 avis">
                                <span class="star"></span>
                                <span class="star"></span>
                                <span class="star"></span>
                                <span class="star"></span>
                                <span class="star star--empty"></span>
                            </p>
                        </div>
                    </div>

                    <h4 class="reviews-title">Derniers avis</h4>
                    <ul class="reviews-list">
                        <li class="review-item" data-date="11/12/2019">
                            <h5 class="review-author">Robert Robichet</h5>
                            <p class="review-content">Billets conformes à la description et livraison rapide. Je recommande.</p>
                        </li>
                        <li class="review-item" data-date="25/10/2019">
                            <h5 class="review-author">JP Avidol</h5>
                            <p class="review-content">Échange sans accroc et contact convivial. Merci encore à Arnaud pour sa disponibilité.</p>
                        </li>
                        <li class="review-item" data-date="16/08/2019">
                            <h5 class="review-author">Marcel Patulacci</h5>
                            <p class="review-content">Un peu cher par rapport au neuf mais pas de mauvaise surprise a fortiori.</p>
                        </li>
                    </ul>
                    <footer class="vendor-actions">
                        <button class="btn btn--vendor profile">Profil</button>
                        <button class="btn btn--vendor contact">Contacter</button>
                    </footer>


                </aside>

            </div>

            <button class="close-btn">
                <span class="line"></span>
            </button>
        `;

        listItem = document.createElement('li');
        listItem.appendChild(ticket)
        ticketListContainer.appendChild(listItem);

    }
}

displayTickets();