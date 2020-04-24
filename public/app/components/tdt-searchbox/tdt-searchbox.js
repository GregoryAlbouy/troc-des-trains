export class TdtSearchbox extends HTMLElement
{
    STYLE_URL = './app/components/tdt-searchbox/tdt-searchbox.style.css'
    TEMPLATE_URL = './app/components/tdt-searchbox/tdt-searchbox.template.html'

    constructor()
    {
        super()
        this.classList.add('searchbox', 'open')
        this.style.display = 'block'
    }

    async getHTML()
    {
        return (await fetch(this.TEMPLATE_URL)).text()
    }

    connectedCallback()
    {
        (async () => this.innerHTML = await this.getHTML())()
    }
}