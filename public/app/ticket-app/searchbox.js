import { TdtSearchbox } from '../components/tdt-searchbox/tdt-searchbox.c.js'

export class Searchbox
{
    constructor()
    {
        const container = document.querySelector('.search-section')
        const searchboxElt = container.appendChild(new TdtSearchbox)
    }
}