DAYDREAM REMOTE
---------------
A Google Daydream remote Andriod app clone for Javascript based VR experiments.

Best used with a cutout cardboard overlay. There's an A4 PDF in the ./assets folder. Use the thickest card you have.

To size the graphic to your overlay use the input in the top left corner. Set it to 1, measure the width of the graphic in cm, then divide 4.6 by your measurement. Put this figure into the input.

Notes : ES6. Development only. Contributions welcome.

## Install and Use
Install
```
npm install --save-dev git+https://git@github.com/edwinwebb/daydream-remote
```

Run NPM Script and start the server
```
scripts :{
  "dreamremote" : "node ./node_modules/dream-remote/index.js"
}
```

Load on phone
```
http://localhost:8081
```

Connect to in VR app
```
ws://localhost:8081
```

### Socket Events

#### Wheel touch events
```
const newEvent = {
  'type' : 'touch',
  x,
  y
};
```

#### Gyro event
```
const newEvent = {
  'type' : 'orientation',
  alpha,
  beta,
  gamma,
  absolute
};
```

#### Click event
```
const newEvent = {
  'type': 'click'
};
```
