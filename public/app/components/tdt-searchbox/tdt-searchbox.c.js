import { AutoloadingComponent } from '../autoloading-component.js'

export class TdtSearchbox extends AutoloadingComponent
{
    dom = {
        condNone,
        condYoung,
        condSenior
    }

    connectedCallback()
    {
        this.dom.condition0 = this.root.querySelector('#cond-none')
        this.dom.condition0 = this.root.querySelector('#cond-young')
        this.dom.condition0 = this.root.querySelector('#cond-senior')
    }

}

TdtSearchbox.config = {
    TAGNAME: 'tdt-searchbox',
    PATH: './app/components/tdt-searchbox/'
}