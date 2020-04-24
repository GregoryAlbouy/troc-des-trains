import { TdtSearchbox } from '../components/tdt-searchbox/tdt-searchbox.js'

export class Searchbox
{
    constructor()
    {
        const searchboxElt = new TdtSearchbox()
        const container = document.querySelector('.search-section')
        container.appendChild(searchboxElt)
    }
}