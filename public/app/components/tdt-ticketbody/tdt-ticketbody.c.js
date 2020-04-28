import { AutoloadingComponent } from '../autoloading-component.js'

export class TdtTicketbody extends AutoloadingComponent
{
    init(ticketData)
    {
        const setSlots = () => {
            const
                duration      = this.querySelector('[slot=duration]'),
                price         = this.querySelector('[slot=price]'),
                vendorName    = this.querySelector('[slot=vendor-name'),
                vendorPicture = this.querySelector('[slot=vendor-picture]')
    
            duration.textContent = ticketData.totalDuration
            price.textContent = ticketData.priceDisplay
            vendorName.textContent = ticketData.vendorName
            vendorPicture.setAttribute('src', ticketData.vendorPicture)
            vendorPicture.setAttribute('alt', ticketData.vendorName)
        }

        const setConditions = () => {
            const
                conditionsTemplate = this.root.querySelector('.conditions-template'),
                conditionsElt      = conditionsTemplate.content.cloneNode(true),
                conditionsDetail   = conditionsElt.querySelector('.conditions-detail'),
                conditionsBtn      = conditionsElt.querySelector('.conditions-btn'),
                conditionsContent  = conditionsElt.querySelector('.conditions-content strong'),
                target             = this.root.querySelector('.journey-conditions')

            conditionsContent.textContent = ticketData.conditionsDisplay
            conditionsBtn.addEventListener('click', () => conditionsDetail.toggleAttribute('open'))
            target.appendChild(conditionsElt)
        }

        const setStep = (step) => {
            const
                stepTemplate = this.root.querySelector('.step-template'),
                stepElt      = stepTemplate.content.cloneNode(true),
                startTime    = stepElt.querySelector('.step-start .step-time'),
                startStation = stepElt.querySelector('.step-start .train-station'),
                endTime      = stepElt.querySelector('.step-end .step-time'),
                endStation   = stepElt.querySelector('.step-end .train-station'),
                duration     = stepElt.querySelector('.step-duration')

            startTime.textContent    = step.startTime
            startStation.textContent = step.startStation
            endTime.textContent      = step.endTime
            endStation.textContent   = step.endStation
            duration.textContent     = step.duration

            this.root.querySelector('.journey-steps').appendChild(stepElt)

            if (!!step.connectionDuration) {
                const
                    connectionTemplate = this.root.querySelector('.connection-template'),
                    connectionElt = connectionTemplate.content.cloneNode(true),
                    connectionDuration = connectionElt.querySelector('.connection-duration')

                connectionDuration.textContent = `Correspondance : ${step.connectionDuration}min.`
                this.root.querySelector('.journey-steps').appendChild(connectionElt)
            }
        }

        setSlots()
        ticketData.steps.forEach(setStep)
        if (ticketData.conditions) setConditions()
    }
}

TdtTicketbody.config = {
    TAGNAME: 'tdt-ticketbody',
    PATH: './app/components/tdt-ticketbody/'
}