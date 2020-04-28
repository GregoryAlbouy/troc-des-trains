export class TicketAnimation
{
    constructor(name, element, duration)
    {
        const animations = {
            fadeout: () => this.fadeout(element),
            vanish: () => this.vanish(element),
            openAccordion: () => this.openAccordion(element),
            closeAccordion: () => this.closeAccordion(element),
            addTicket: () => this.addTicket(element)
        }

        this.duration = duration || 1000
        if (!element) return
        animations[name]()
    }

    then(resolve)
    {
        setTimeout(() => resolve(), this.duration)
    }

    fadeout(element)
    {
        element.style.transition = `opacity ${this.duration}ms`
        element.style.opacity = '0'
        setTimeout(() => element.style.transition = null, this.duration)
    }

    openAccordion(element)
    {
        if (!(element.ticketAnimation && element.ticketAnimation.naturalHeight)) return

        element.style.transition = `height ${this.duration}ms, opacity ${this.duration}ms`
        element.style.height = `${element.ticketAnimation.naturalHeight}px`
        element.style.opacity = '1'
        setTimeout(() => element.style.transition = null, this.duration)
    }

    closeAccordion(element)
    {
        if (!element.ticketAnimation) element.ticketAnimation = {}
        if (!element.ticketAnimation.naturalHeight) element.ticketAnimation.naturalHeight = element.getBoundingClientRect().height

        element.style.transition = `height ${this.duration}ms, opacity ${this.duration}ms`
        element.style.height = '0px'
        element.style.opacity = '0'
        setTimeout(() => element.style.transition = null, this.duration)
    }

    vanish(element)
    {
        const distance = window.innerWidth - element.offsetLeft

        element.style.transition = `transform ${this.duration}ms, opacity ${this.duration}ms`
        element.style.transform = `translate(${distance})px`
        element.style.opacity = '0'
        setTimeout(() => element.style.transition = null)

        // element.animate([
        //     { transform: 'translate(0px)', opacity: 1 },
        //     { transform: `translate(${distance}px)`, opacity: 0 }
        // ], {
        //     duration: this.duration,
        //     fill: 'forwards'
        // })
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