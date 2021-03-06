/**
 * Dream Remote
 */

const DefaultURL = `ws://${window.location.host}/`;

class DreamRemote {

  constructor() {

    this.emit = this.emit.bind(this);
    this.emitClick = this.emitClick.bind(this);
    this.emitMouse = this.emitMouse.bind(this);
    this.emitTouch = this.emitTouch.bind(this);
    this.emitOrientation = this.emitOrientation.bind(this);
    this.emitMotion = this.emitMotion.bind(this);

    this.socket = new WebSocket(DefaultURL);
    this.socket.addEventListener('open',(e)=>{document.querySelector('.status').classList.add('connected')});
    this.socket.addEventListener('close',(e)=>{document.querySelector('.status').classList.remove('connected')});
    this.socket.addEventListener('error', (e)=>{throw new Error('DreamRemote Socket Error', e)});

    this.socket.addEventListener('message', (e) => {console.log(e)});
    this.bindEvents();
  }

  bindEvents() {
    const wheel = document.querySelector('#wheel');
    const click = document.querySelector('#click');

    window.addEventListener('deviceorientation', this.emitOrientation);
    window.addEventListener('devicemotion', this.emitMotion);
    click.addEventListener('click', this.emitClick);
    wheel.addEventListener('mousemove', this.emitMouse);
    wheel.addEventListener('touchmove', this.emitTouch);
    wheel.addEventListener('touchstart', this.emitTouch);
    wheel.addEventListener('touchend', this.emitTouch);
  }

  emitMouse(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const newEvent = {
      'type' : 'touch',
      x,
      y
    };

    this.emit(newEvent);
  }

  emitTouch(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const touches = e.changedTouches || e.touches;
    const x = (touches[0].clientX - rect.left) / rect.width;
    const y = (touches[0].clientY - rect.top) / rect.height;
    const newEvent = {
      'type' : e.type,
      x,
      y
    };

    this.emit(newEvent);
  }

  emitClick(e) {
    const newEvent = {
      'type': 'click'
    };

    this.emit(newEvent);
  }

  emitOrientation(e) {
    const {alpha, beta, gamma, absolute} = e;
    const newEvent = {
      'type' : 'orientation',
      alpha,
      beta,
      gamma,
      absolute
    };

    this.emit(newEvent);
  }

  emitMotion() {
    const {x,y,z} = e.acceleration;
    const {alpha, beta, gamma} = e.rotationRate ;
    const newEvent = {
      'type' : 'motion',
      x,
      y,
      z,
      alpha,
      beta,
      gamma
    };

    this.emit(newEvent);
  }

  emit(object) {
    const jsonStr = JSON.stringify(object);

    this.socket.send(jsonStr);
  }
}
