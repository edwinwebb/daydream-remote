/**
 * Dream Remote
 */

const DefaultURL = `'ws://${window.location.host}/dreamremote`;
//const DefaultURL = 'ws://html5rocks.websocket.org/echo';

class DreamRemote {

  constructor() {
    this.connected = false;

    this.emit = this.emit.bind(this);
    this.emitClick = this.emitClick.bind(this);
    this.emitTouch = this.emitTouch.bind(this);

    this.socket = new WebSocket(DefaultURL);
    this.socket.addEventListener('open',(e)=>{this.connected = true});
    this.socket.addEventListener('close',(e)=>{this.connected = false});
    this.socket.addEventListener('error', (e)=>{throw new Error('DreamRemote Socket Error', e)});

    this.socket.addEventListener('message', (e) => {console.log(e)})
    this.bindEvents();
  }

  bindEvents() {
    const wheel = document.querySelector('#wheel');
    const click = document.querySelector('#click');

    click.addEventListener('click', this.emitClick);
    wheel.addEventListener('mousemove', this.emitTouch);

  }

  emitTouch(e) {
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

  emitClick(e) {
    const newEvent = {
      'type': 'click'
    }

    this.emit(newEvent);
  }

  emit(object) {
    const jsonStr = JSON.stringify(object);

    if(this.connected === true) {
      this.socket.send(jsonStr);
    }
  }
}

var dm = new DreamRemote();
