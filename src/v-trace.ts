import { LitElement, html, css, unsafeCSS } from 'lit';
import {customElement, property} from 'lit/decorators.js'
import parse from "json5/lib/parse.js"

import './utils/resize.js'
import styles from './style.styl'
/**
 * @slot - This element has a slot
 */
export class VTrace extends LitElement {
  static get styles() {
    return css`:host {display: block;max-width: 1920px;background:#efefef;overflow:hidden}`
  }
  @property() name:string ='map'
  @property() list:string = '[]'

  get renderHeight(){
    let rHeight = Math.round(this.offsetWidth / 16 *9)+'px';
    this.setAttribute('style',`height:${rHeight}`);
    return rHeight
  }

  attributeChangedCallback(name:string,ov:string,nv:string){
    if(ov && (nv != ov)){
      
    }
    
    super.attributeChangedCallback(name, ov, nv);
  }

  _handleResize = (ev:Event) => {
    this.renderHeight;
  }
  update(changedProps:any) {
    super.update(changedProps);
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize:end', this._handleResize);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize:end', this._handleResize);
  }
  
  render() {
    console.log(parse(this.list))
    console.log(window)
    const {name,renderHeight,loading} = this;
    return html`
      <style>${unsafeCSS(styles)}</style>
      <div class="trace-wrapper">
        <canvas id="pcanvas" class="canvas"></canvas>
        <slot>loading</slot>
        <trace-item item="" src="/img/map01.png"></trace-item>
      </div>`
  }
}