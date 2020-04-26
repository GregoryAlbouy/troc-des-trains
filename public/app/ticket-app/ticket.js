import { Utils } from '../modules/utils.js'
import { ticketApp } from '../app.js'
/**
 * TODO:
 * - remove
 *   - ticketApp instance
 *   - data storage => set data props from constructor parameters instead: this.price = ticketData.price
 *   - all dom-related methods & props => TdtTicket / TdtCartTicket
 */

export class Ticket
{
    // ticketApp
    data = {}
    inCart = false

    constructor(ticketData)
    {
        this.setData(ticketData)
    }

    // À FINIR
    setData(ticketData)
    {
        const
            connections = ticketData.steps.length - 1,
            firstStep = ticketData.steps[0],
            lastStep = ticketData.steps[connections]
        
        this.data.id = ticketData.id
        this.data.connections = connections
        this.data.connectionsDisplay = connections === 0 ? 'Direct' : `${connections} correspondance(s)`
        this.data.startDate = Utils.datetime(firstStep.startTime).toDate()
        this.data.startTime = Utils.datetime(firstStep.startTime).toTime()
        this.data.endTime = Utils.datetime(lastStep.endTime).toTime()
        this.data.totalDuration = Utils.datetime(lastStep.endTime, firstStep.startTime).toDuration()
        this.data.price = ticketData.price
        this.data.priceDisplay = `${ticketData.price}€` // use regex to convert NNNN to SS.SS€
        this.data.conditions = ticketData.conditions
        this.data.vendorName = ticketData.vendorName
        this.data.vendorPicture = ticketData.vendorPicture

        this.data.steps = ticketData.steps.map((step, i, steps) => {
            return {
                startStation: step.startStation,
                endStation: step.endStation,
                startTime: Utils.datetime(step.startTime).toTime(),
                endTime: Utils.datetime(step.endTime).toTime(),
                duration: Utils.datetime(step.endTime, step.startTime).toDuration(),
                connectionDuration: steps[i+1] ? Utils.datetime(steps[i+1].startTime, step.endTime).toDuration() : null
            }
        })
    }

    // MOVE TO tdt-ticket
    // connectedCallback() // custom for now: called by custom event appendEvent
    // {
    //     this.isAppended = true
    //     this.dom.bodyHeight = Utils.getOffset(this.dom.body).height
    //     this.toggleAccordion()
    // }

    // MOVE TO tdt-ticket
    // use custom event instead
    // addToCart()
    // {
    //     if (this.inCart) return
    //     ticketApp.addToCart(this)
    // }
}