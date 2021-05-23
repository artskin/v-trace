import { LitElement, html, css, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js'
import parse from "json5/lib/parse.js"

import './utils/resize.js'
import styles from './style.styl'


/**
 * @slot - This element has a slot
 */
export class TraceItem extends LitElement {
  static get styles() {
    return css`:host {display: block;max-width: 1920px;background:#efefef;overflow:hidden}`
  }
  @property() name:string ='map'
  @property() list:string = '[]'
  @property() src:string = ''

  constructor(){
    super()
  }

  // get renderHeight(){
  //   let rHeight = Math.round(this.offsetWidth / 16 *9)+'px';
  //   this.setAttribute('style',`height:${rHeight}`);
  //   return rHeight
  // }
  

  attributeChangedCallback(name:string,ov:string,nv:string){
    console.group('attributeChangedCallback')
    console.log(name,nv)
    if(ov && (nv != ov)){
      
    }
    super.attributeChangedCallback(name, ov, nv);
    console.groupEnd()
  }
  connectedCallback() {
    console.group('connectedCallback')
    super.connectedCallback();
    console.log(this.list)
    window.addEventListener('resize:end', this._handleResize);
    console.groupEnd()
  }

  _handleResize = (ev:Event) => {
    //this.renderHeight;
  }
  update(changedProps:any) {
    console.warn('update')
    super.update(changedProps);
  }
  render() {
    console.warn('render')
    const {name,src,list} = this;
    return html`
      <style>${unsafeCSS(styles)}</style>
      <div class="trace-item-layer">
        <img src=${src} />
        <div class="list">
          ${parse(list).map((it:ILocus,index:number)=>html`
            <i class="point" style="transform:translate(${it.points[0]}px,${it.points[1]}px)">
            <em>${it.name}</em>
            </i>
          `)}
        </div>
        <slot></slot>
      </div>`
  }
  disconnectedCallback() {
    console.log('disconnectedCallback')
    super.disconnectedCallback();
    window.removeEventListener('resize:end', this._handleResize);
  }
}