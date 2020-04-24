import { TicketEvent } from '../../ticket-app/ticket-event.js'
import { TicketAnimation } from '../../ticket-app/ticket-animation.js'

export class TdtTicketbody extends HTMLElement
{
    STYLE_URL = './app/components/tdt-ticketbody/tdt-ticketbody.style.css'
    TEMPLATE_URL = './app/components/tdt-ticketbody/tdt-ticketbody.template.html'

    async getHTML()
    {
        return await (await fetch(this.TEMPLATE_URL)).text()
    }

    async set(ticketData)
    {
        this.classList.add('ticket-body')
        this.innerHTML = await this.getHTML()

        const
            stepListElt          = this.querySelector('.journey-steps'),
            durationElt          = this.querySelector('.journey-duration span'),
            priceElt             = this.querySelector('.price'),
            vendorNameElt        = this.querySelector('.vendor-name'),
            vendorIMGElt         = this.querySelector('.vendor-display img'),
            addBtn               = this.querySelector('.btn--add'),
            conditionsElt        = this.getConditionsElt(ticketData.conditions),
            conditionsContentElt = conditionsElt.querySelector('.conditions-content'),
            conditionsBtn        = conditionsElt.querySelector('.conditions-btn')
            

        stepListElt.innerHTML = this.getStepListTemplate(ticketData.steps)
        durationElt.textContent = ticketData.totalDuration
        priceElt.textContent = ticketData.priceDisplay
        vendorNameElt.textContent = ticketData.vendorName
        // vendorIMGElt.setAttribute('src', 'https://picsum.photos/200/300')

        // move to Tdt-ticket and replace this.parentNode to this
        addBtn.onclick = () => window.dispatchEvent(new TicketEvent('clickadd', {
            detail: { id: ticketData.id, elt: this.parentNode }
        }))

        if (conditionsBtn && conditionsContentElt) {
            conditionsContentElt.autoHeight = conditionsContentElt.getBoundingClientRect().height
            conditionsContentElt.style.height = '0px'

            conditionsBtn.addEventListener('click', () => {
                if (!conditionsElt.classList.contains('open')) {
                    conditionsElt.classList.add('open')
                    new TicketAnimation('openAccordion', conditionsContentElt, 200)
                } else {
                    conditionsElt.classList.remove('open')
                    new TicketAnimation('closeAccordion', conditionsContentElt, 200)
                }
            })
        }
    }

    getConditionsElt(conditions)
    {
        const conditionsElt = this.querySelector('.journey-conditions')

        if (conditions === 'Tous publics') return conditionsElt

        conditionsElt.innerHTML = `
            <h4 class="conditions-title">Soumis à conditions : <span class="conditions-btn">voir détails</span></h4>
            <p class="conditions-content"><strong>${conditions}</strong> : penser à se munir d'une pièce justificative en cours de validité. Troc des trains et ses vendeurs affiliés ne sauraient être tenus responsables en cas d'omission.</p>
        `

        return conditionsElt
    }

    getStepListTemplate(steps)
    {
        return steps.map((step) => {
            return `
                <li class="step">
        
                    <div class="step-start">
                        <p class="step-time">${step.startTime}</p>
        
                        <div class="step-info">
                            <h4 class="train-station">${step.startStation}</h4>
                            <p class="train-info">TGV inOUI 7364 | 2de - fenêtre</p>
                        </div>
                    </div>
        
                    <p class="step-duration">${step.duration}</p>
        
                    <div class="step-end">
                        <p class="step-time">${step.endTime}</p>
                        
                        <div class="step-info">
                            <h4 class="train-station">${step.endStation}</h4>
                        </div>
                    </div>
        
                </li>
                ${!step.connectionDuration ? '' : `
                <li class="transit">
                    <p class="transit-duration">Correspondance : ${step.connectionDuration}min.</p>
                </li>
               `}
            `
        }).join('')
    }
}