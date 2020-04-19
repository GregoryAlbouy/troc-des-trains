// import { TdtTicket } from '../../components/tdt-ticket/TdtTicket.js'
// import { TdTCartTicket } from './components/tdt-cart-ticket/TdTCartTicket.js'
import { Utils } from '../modules/utils.js'

export class Ticket
{
    ticketApp
    data
    dom = {}
    inCart = false
    isAppended = false // unused

    constructor(ticketApp, ticketData)
    {
        this.ticketApp = ticketApp
        this.data = ticketData

        this.createElement()
        // this.setConnectionObserver()
    }

    // set inCart(value) { this.inCart = value; console.log(`ticket ${this.data.id} in cart: ${this.inCart}`) }

    setConnectionObserver()
    {
        // const container = document.querySelector('.ticket-list-container')
        // const observer = new MutationObserver((mutations, observer) => {
        //     console.log(mutations, observer)
        // })
        // observer.observe(container, { childList: true })
    }

    connectedCallback() // custom for now: called by custom event appendEvent
    {
        this.isAppended = true
        this.dom.bodyHeight = Utils.getOffset(this.dom.body).height
        this.toggleAccordion()
    }

    addToCart()
    {
        if (this.inCart) return
        this.ticketApp.addToCart(this)
    }

    removeFromCart()
    {
        if (!this.inCart) return
        console.log('iiioooo')
        this.ticketApp.removeFromCart(this)
    }

    close()
    {
        this.dom.element.classList.remove('open')
        this.dom.body.style.height = '0px'
    }

    open()
    {
        this.dom.element.classList.add('open')
        this.dom.body.style.height = `${this.dom.bodyHeight}px`
    }

    createElement()
    {
        const ticket = document.createElement('article')

        ticket.classList.add('ticket')
        ticket.setAttribute('data-id', this.data.id)
        ticket.innerHTML = this.getHTML()

        this.dom = {
            element: ticket,
            head: ticket.querySelector('.ticket-head'),
            body: ticket.querySelector('.ticket-body'),
            btnAdd: ticket.querySelector('.btn--add'),
            btnRemove: ticket.querySelector('.close-btn')
        }

        this.dom.btnAdd.onclick = this.addToCart.bind(this)
        this.dom.btnRemove.onclick = this.removeFromCart.bind(this)
        this.dom.element.addEventListener('ticketappend', this.connectedCallback.bind(this))
    }

    toggleAccordion()
    {
        // First, show the ticket closed.
        if (!this.dom.element.classList.contains('open')) this.dom.body.style.height = '0px';

        // Finally, restitute its height on click or set it to 0 depending on its state
        this.dom.head.addEventListener('click', () =>  {
            // close all
            if (!this.dom.element.classList.contains('open')) {
                this.ticketApp.ticketList.content.forEach(ticket => ticket.close())
                this.open()
            } else {
                this.close()
            }
        });
    };

    getHTML()
    {
        return `
            <header class="ticket-head">

                <div class="ticket-head__summary">

                    <h3 class="journey-date"><time datetime="2020-01-16">16/01/2020</time></h3>

                    <ul class="journey-info">


                        <li class="journey-step">
                            <time class="step-time" datetime="2020-01-16 ${this.data.startTime}">${this.data.startTime}</time>
                            <span class="step-station">Paris<span class="desktop-only"> Gare de Lyon</span></span>
                        </li>
                        <li class="journey-step">
                            <time class="step-time" datetime="2020-01-16 ${this.data.endTime}">${this.data.endTime}</time>
                            <span class="step-station">Montpellier<span class="desktop-only"> St-Roch</span></span>
                        </li>
                        <li class="journey-summary">
                            <time class="journey-duration" datetime="PT7H35M">${this.data.totalDuration}</time>
                            <span class="journey-connections">${this.data.connections}</span>
                        </li>

                    </ul>

                    <p class="conditions">${this.data.conditions}</p>

                </div>

                <div class="ticket-head__price">
                    <p class="price">${this.data.price}€</p>
                </div>

            </header>

            <div class="ticket-body">

                <section class="ticket-body__journey">

                    <h3 class="journey-title">Ma sélection</h3>
                    <aside class="journey-conditions">
                        <h4 class="conditions-title">Soumis à conditions : <span class="conditions-btn">voir détails</span></h4>
                        <p class="conditions-content"><strong>${this.data.conditions}</strong> : penser à se munir d'une pièce justificative en cours de validité. Troc des trains et ses vendeurs affiliés ne sauraient être tenus responsables en cas d'omission.</p>
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


                    <p class="journey-duration">Durée totale : <span>${this.data.totalDuration}</span></p>

                    <footer class="journey-add">

                        <p class="price">${this.data.price}€</p>
                        <button class="btn btn--add">Ajouter au panier</button>

                    </footer>
                </section>

                <aside class="ticket-body__vendor">
                    <h3 class="vendor-title"><span class="mobile-only">Infos </span>Vendeur</h3>

                    <div class="vendor-display">
                        <div class="img-container"><img src="https://picsum.photos/200/300" alt=""></div>
                        <div class="infos">
                            <h4 class="vendor-name">${this.data.vendorName}</h4>
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
        `
    }
}