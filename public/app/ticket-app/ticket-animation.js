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
        // element.style.transition = `height ${this.duration}ms`
        // element.style.height = `${element.ticketAnimation.naturalHeight}px`
        // setTimeout(() => element.style.transition = null, this.duration)

        element.animate([
            { height: '0px' },
            { height: `${element.ticketAnimation.naturalHeight}px` }
        ], {
            duration: this.duration,
            fill: 'forwards'
        })

        element.childNodes.forEach((child) => {
            if (child.nodeType === Node.ELEMENT_NODE) {
                child.animate([
                    { opacity: 0 },
                    { opacity: 1 }
                ], {
                    duration: this.duration,
                    fill: 'forwards'
                })
            }
        })
    }

    closeAccordion(element)
    {
        if (!element) return
        if (!element.ticketAnimation) element.ticketAnimation = {}
        if (!element.ticketAnimation.naturalHeight) element.ticketAnimation.naturalHeight = element.getBoundingClientRect().height

        element.animate([
            { height: `${element.getBoundingClientRect().height}px` },
            { height: '0px' }
        ], {
            duration: this.duration,
            fill: 'forwards'
        })

        // element.style.transition = `height ${this.duration}ms`
        // element.style.height = '0px'
        // setTimeout(() => element.style.transition = null, this.duration)

        element.childNodes.forEach((child) => {
            if (child.nodeType === Node.ELEMENT_NODE) {
                child.style.transition = `opacity ${this.duration}ms`
                child.style.opacity = 0
                setTimeout(() => {
                    child.style.opacity = null
                    child.style.transition = null
                }, this.duration)
            }
        })
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

    async addTicket(element)
    {
        const ghost = element.elt.head.cloneNode(true)

        ghost.style.position = 'absolute'
        ghost.style.top = `${element.offsetTop}px`
        ghost.style.left = `${element.offsetLeft}px`
        ghost.style.width = `${element.getBoundingClientRect().width}px`
        ghost.style.height = `${element.getBoundingClientRect().height}px`
        ghost.style.zIndex = '15';

        element.parentNode.appendChild(ghost)

        await new TicketAnimation('vanish', ghost, this.duration / 2)
        ghost.parentNode.removeChild(ghost)
    }
}