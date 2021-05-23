import { LitElement, html, css, unsafeCSS } from 'lit';


// import "/src/lib/resize-end.js";
// import "/src/lib/protobuf.min.js";
// import "/src/lib/previewinfo_config.js";
// import "/src/lib/previewinfo_static.js";
// import "/src/lib/h5_player.js";

 import stylePlayer from './style.styl'
/**
 * @slot - This element has a slot
 */
export class VideoPlus extends LitElement {
  static get styles() {
    return css`:host {display: block;max-width: 1920px;background:#4d4d4d;overflow:hidden}`
  }

  static get properties() {
    return {
      name: { type: String },
      rtsp: { type: String },
      ws: { type: String },
      poster: { type: String },
      //videoEl: { type: HTMLCanvasElement },
    }
  }



  constructor() {
    super()
    this.name = ''
    this.rtsp = ''
    this.ws = ''
    this.poster = ''

    this.player = null
    this.pState="play"
    this.width = 1920
    this.height = 1080
    this.loading = ''
    this.shotImg = ''

    //this.renderHeight = 'auto'
  }
  get canvasEl() { return this.shadowRoot.querySelector('#pcanvas') }
  get videoEl() {
    let video = this.shadowRoot.querySelector('#pvideo');
    video.width = this.width
    video.height = this.height
    return video
  }
  get renderHeight(){
    let rHeight = Math.round(this.offsetWidth / 16 *9)+'px';
    this.setAttribute('style',`height:${rHeight}`);
    return rHeight
  }

  get state() {return this.pState}
  set state(nv){
    this.pState = nv;
  }

  attributeChangedCallback(name,ov,nv){
    if(ov && (nv != ov)){
      console.log('attr changed:', name, ov);
      console.log(nv);
      let optMap = new Map([['rtsp','url'],['ws','socketurl']])
      let newOpts = {}
      if(nv){
        newOpts[optMap.get(name)] = nv
      }
      
      if(this.player){
        this.player.stop()
        this.requestUpdate('state','playing')
        this.state = "playing"
        this.player = null
        setTimeout(()=>{
          this.initPlayer(this.getOpts(newOpts));
        },5)
      }
    }
    
    super.attributeChangedCallback(name, ov, nv);
  }
  update(changedProps) {
    super.update(changedProps);
  }

  overlayRenderer(){
    let config={
      canvas: this.canvasEl,
      video: this.videoEl,
    }
    return new H5SensePlayer.overlayRenderer(config);
  }

  getOpts(remoteOpt) {
    let opts = {
      url: this.rtsp,
      socketurl: this.ws,
      preferMode: "mse",
      container: this.videoEl,
    }
    if(!remoteOpt){ return opts }
    if(remoteOpt){
      return Object.assign(opts,remoteOpt);
    }
  }

  onPlay() {
    if(this.player){
      if(this.state == 'playing'){
        this.player.play();
        this.requestUpdate('state','pause')
        this.state = "pause"
      }else if(this.state == 'pause'){
        this.player.stop()
        this.requestUpdate('state','playing')
        this.state = "playing"
      }
    }else{
      this.initPlayer(this.getOpts());
    }
  }
  
  initPlayer(options) {
    console.log(options)
    if (this.player) {
			this.player.stop();
      this.player = null;
		}
    //this.overlayRenderer().restart();
    this.player = new H5SensePlayer(options);
    this.player.play();
    
    this.requestUpdate('state','pause')
    this.state = "pause"

    this.loading = 'isloading';
    this.videoEl.onloadedmetadata = () =>{
      debugger
      this.requestUpdate('loading','')
      this.loading = '';
      this.requestUpdate('state','lod')
      this.state = "lod"
    }
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('resize:end', this._handleResize);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('resize:end', this._handleResize);
  }
  _handleResize = (ev) => {
    this.renderHeight;
  }
  screenshot(){
    let shotCanvas = this.shadowRoot.querySelector('.screenshot');
    console.log(shotCanvas)
    shotCanvas.style.display = "block";
    
      this.shotImg = new Image();
      this.shotImg.src = this.shadowRoot.querySelector('#pvideo').toDataURL("image/jpeg",1.0);
      //console.log(this.videoEl.toDataURL("image/png"))
      //return image;
      shotCanvas.appendChild(this.shotImg)
    
    // let offscreen = new OffscreenCanvas(256,256)
    // let gl = offscreen.getContext('webgl')
    // let bitmapImg = offscreen.transferToImageBitmap()
    // shotCanvas.transferFromImageBitmap(bitmapImg);
    
    //console.log(this.videoEl)
    //console.log(this.videoEl.getContext("2d").getImageData(0,0,this.videoEl.width,this.videoEl.height))
    //shotCanvas.getContext("2d").drawImage(this.videoEl,this.videoEl.width,this.videoEl.height)
    
  }
  
  render() {
    const {name, state, poster,renderHeight,loading,shotImg, onPlay,screenshot} = this;
    return html`
      <style>${unsafeCSS(stylePlayer)}</style>
      <div class="s-player">
        <canvas id="pcanvas" class="canvas"></canvas>
        <canvas id="pvideo"></canvas>
        <div class="video-title">${name}</div>
        <div class="masks masks-${state}" @click=${onPlay}>
          <img class="poster-img" src=${poster} alt="">
          <i class="icono-${state}"></i>
          <slot>loading...</slot>
        </div>
        <div class="${loading}"><div class="load1"><div class="loader"></div></div></div>
        <div class="screenshot">
          <i class="down">下载</i>
        </div>
        <div class="video-tool-bar">
          <i class="icono-camera" title="截屏" @click=${screenshot}></i>
        </div>
      </div>`
  }
}
