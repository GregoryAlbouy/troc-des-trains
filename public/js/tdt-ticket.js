// Only for testing purposes. If it's still here, that means I forgot to delete it.


    class TdtTicket extends HTMLElement
    {
        constructor() 
        {
            super()
        }
        
        // connectedCallback() // appelée auto à la création du component
        // {
        //     console.log('tdt-ticket ajouté au DOM !')
        // }
    
        start()
        {
            this.textContent = 'Vroum !!'
        }
    
        connectedCallback()
        {
            // this.classList.add('ticket');
            this.innerHTML =
            `
    <article class="ticket">
                    <header class="ticket-head">

                        <button class="close-btn">
                            <span class="line"></span>
                        </button>

                        <div class="ticket-head__summary">

                            <h3 class="journey-date"><time datetime="2020-01-16">16/01/2020</time></h3>

                            <ul class="journey-info">


                                <li class="journey-step">
                                    <time class="step-time" datetime="2020-01-16 12:17">12:17</time>
                                    <span class="step-station">Paris Gare de Lyon</span>
                                </li>
                                <li class="journey-step">
                                    <time class="step-time" datetime="2020-01-16 19:42">19:42</time>
                                    <span class="step-station">Montpellier St-Roch</span>
                                </li>
                                <li class="journey-summary">
                                    <time class="journey-duration" datetime="PT7H35M">7h35</time>
                                    <span class="journey-connections">1 correspondance</span>
                                </li>
    
                            </ul>
    
                            <p class="conditions">Carte jeune</p>
    
                        </div>

                        <div class="ticket-head__price">
                            <p class="price">99,00€</p>
                        </div>

                    </header>

                    <div class="ticket-body">

                        <section class="ticket-body__journey">

                            <h3 class="journey-title">Ma sélection</h3>
                            <aside class="journey-conditions">
                                <h4 class="conditions-title">Soumis à conditions : <span class="conditions-btn">voir détails</span></h4>
                                <p class="conditions-content"><strong>Carte jeune</strong> : penser à se munir d'une pièce justificative en cours de validité. Troc des trains et ses vendeurs affiliés ne sauraient être tenus responsables en cas d'omission.</p>
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


                            <p class="journey-duration">Durée totale : <span>6h45</span></p>

                            <footer class="journey-add">

                                <p class="price">49,00€</p>
                                <button class="btn btn--add">Ajouter au panier</button>

                            </footer>
                        </section>

                        <aside class="ticket-body__vendor">
                            <h3 class="vendor-title">Vendeur</h3>

                            <div class="vendor-display">
                                <div class="img-container"><img src="https://picsum.photos/200/300" alt=""></div>
                                <div class="infos">
                                    <h4 class="vendor-name">Arnaud Fornelli</h4>
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
                    </article>
            `
        }
    }
    
    window.customElements.define('tdt-ticket', TdtTicket);
    const listItem = document.createElement('li');
    const ticketList = document.querySelector('.ticket-list-container');
    // customTicket.classList.add('ticket');
    listItem.appendChild(new TdtTicket);
    ticketList.appendChild(listItem);

// });