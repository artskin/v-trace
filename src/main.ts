import {LitElement, html} from 'lit'
import {customElement, property} from 'lit/decorators.js'
import {parse} from "json5/lib/parse"
@customElement('v-trace')
class VTrace extends LitElement {
  @property()
  type = 'default'
  @property() data = ''
  dataObj = {}
  constructor(){
    super()
    
    //this.dataObj = JSON.parse(this.data)
  }

  connectedCallback(){
    console.log(parse(this.data))
    //console.log(typeof this.dataObj)
  }

  render(){
      return html`
      <div class="trace-layer">
        loading
      </div>
      `
  }
}