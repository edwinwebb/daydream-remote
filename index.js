/**
 * Dream Remote
 */

const DefaultOptions = {
  url : 'ws://html5rocks.websocket.org/echo'
};

export default class DreamRemote {
  constructor(options = DefaultOptions) {
    this.options = options;
    this.connected = false;
    this.emit = this.emit.bind(this);
    this.emitClick = this.emitClick.bind(this);
    this.socket = new Websocket(options.url);
    this.socket.addEventLister('open',(e)=>{this.connected = true});
    this.socket.addEventLister('close',(e)=>{this.connected = false});
    this.socket.addEventLister('error', (e)=>{throw new Error('DreamRemote Socket Error', e)}
  }

  get state() {
    return this.socket.readyState;
  }

  inject(element) {
    element.addEventLister('click', this.emitClick.bind(this));
    this.element = element;
  }

  reconnect() {
    this.socket = new Websocket(this.options.url);
  }

  disconnect() {
    this.socket.close();
  }

  startEmit() {
    this.emitEvents = true;
  }

  emitTouch(e) {
    const newEvent = {
      'type' : 'touch',
      //'touches' : e.touches,
      'x' : Touch.clientX,
      'y' : Touch.clientY
    }
  }

  emitClick(e) {
    const newEvent = {
      'type': 'click',
      'name': e.currentTarget.getAttribute('data-name') || 'unkown'
    }

    this.emit(newEvent);
  }

  emit(object) {
    const jsonStr = JSON.Stringify(object);

    if(this.emitEvents === true) {
      this.socket.send(jsonStr);
    }
  }
}
