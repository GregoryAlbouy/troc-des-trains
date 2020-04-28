export class AutoloadingComponent extends HTMLElement
{
    constructor() {
        super()

        this.root = this.attachShadow({ mode: 'open' })

        const init = () => {
            const template = document.createElement('template')
            template.innerHTML = this.constructor.INNER_HTML
            this.root.appendChild(template.content.cloneNode(true))
        }

        const waitForLoading = () => {
            const POLL_RATE = 5

            const wait = () => new Promise((resolve) => setTimeout(resolve, POLL_RATE))

            const ask = () => this.constructor.INNER_HTML ? Promise.resolve() : wait().then(ask)

            return new Promise((resolve) => ask().then(resolve))
        }

        !this.constructor.templateHasBeenRequested ? this.constructor.loadTemplate().then(init) :
            !this.constructor.INNER_HTML ? waitForLoading().then(init) : init()
    }

    static async loadTemplate() {
        if (this.templateHasBeenRequested) return Promise.resolve()

        this.templateHasBeenRequested = true

        const
            basePath = this.config.PATH + this.config.TAGNAME,
            htmlPath = basePath + '.c.html',
            cssPath = basePath + '.c.css'

        const loadFileString = async (path) => (await fetch(path)).text()

        const setInnerHTML = ([html, css]) => this.INNER_HTML = `<style>${css}</style>${html}`

        // parallel loading
        return Promise.all([
            (async () => await loadFileString(htmlPath))(),
            (async () => await loadFileString(cssPath))()
        ]).then(setInnerHTML)
    }
}