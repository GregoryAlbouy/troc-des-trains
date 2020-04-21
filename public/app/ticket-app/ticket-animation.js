
export class TicketAnimation
{
    duration = 1000

    constructor(name, element, duration)
    {
        const animations = {
            fadeout: () => this.fadeout(element),
            vanish: () => this.vanish(element),
            openAccordion: () => this.openAccordion(element),
            closeAccordion: () => this.closeAccordion(element),
            addTicket: () => this.addTicket(element)
        }

        if (duration) this.duration = duration

        animations[name]()
    }

    then(resolve)
    {
        setTimeout(() => resolve(), this.duration)
    }

    fadeout(element)
    {
        element.animate([
            { opacity: 1 },
            { opacity: 0 }
        ], {
            duration: this.duration,
            fill: 'forwards'
        })
    }

    openAccordion(element)
    {
        element.style.transition = `height ${this.duration}ms`
        element.style.height = `${element.autoHeight}px`
        setTimeout(() => element.style.transition = null, this.duration)
    }

    closeAccordion(element)
    {
        if (!element) return
        element.style.transition = `height ${this.duration}ms`
        element.style.height = '0px'
        setTimeout(() => element.style.transition = null, this.duration)
    }

    vanish(element)
    {
        const distance = window.innerWidth - element.offsetLeft

        console.log(distance)

        element.animate([
            { transform: 'translate(0px)', opacity: 1 },
            { transform: `translate(${distance}px)`, opacity: 0 }
        ], {
            duration: this.duration,
            fill: 'forwards'
        })
    }

    /**
     * Get position and width
     * Combine with fadeout
     */
    async addTicket(element)
    {
        const ghost = element.cloneNode(true)

        ghost.style.position = 'absolute'
        ghost.style.top = `${element.offsetTop}px`
        ghost.style.left = `${element.offsetLeft}px`
        ghost.style.width = `${element.getBoundingClientRect().width}px`
        ghost.style.height = `${element.getBoundingClientRect().height}px`

        element.parentNode.appendChild(ghost)

        await new TicketAnimation('vanish', ghost, this.duration / 2)
    }
}