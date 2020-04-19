
export class TicketAnimation
{
    constructor(animationName, element)
    {
        if (animationName === 'cartremove') this.promise = this.cartRemove(element)
    }

    cartRemove(element)
    {
        return new Promise((resolve) => {
            const duration = 1000
            element.animate([
                { opacity: 1 },
                { opacity: 0 }
            ], {
                duration: duration,
                fill: 'forwards'
            })

            setTimeout(() => resolve(), duration)
        })
    }
}