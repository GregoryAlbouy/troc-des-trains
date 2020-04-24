import { TdtSearchbox } from '../components/tdt-searchbox/tdt-searchbox.js'

export class Searchbox
{
    constructor()
    {
        const container = document.querySelector('.search-section')
        const searchboxElt = container.appendChild(new TdtSearchbox)
    }
}