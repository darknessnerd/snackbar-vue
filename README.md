# snackbar-vue

[![Build Status](https://www.travis-ci.com/darknessnerd/snackbar.svg?branch=main)](https://www.travis-ci.com/darknessnerd/snackbar)
![NPM Downloads](https://img.shields.io/npm/dw/snackbar-vue)
![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/snackbar-vue)
![NPM License](https://img.shields.io/npm/l/snackbar-vue)
![NPM Version](https://img.shields.io/npm/v/snackbar-vue)
![npm collaborators](https://img.shields.io/npm/collaborators/snackbar-vue)

:bomb:<br>
[Features Live Demo Link: Click here !! ](https://darknessnerd.github.io/snackbar-vue/index.html)

> Vue3 Library For a snackbar notification system.

![demo](https://github.com/darknessnerd/snackbar-vue/blob/main/stories/assets/demo.gif?raw=true)

### :rocket: Features



## Install and basic usage

```bash
$ npm install --save snackbar-vue
```

### Register the plugin and confgiure it 

#### Default configurations : 
```json
{
  "default": {
    "primary": "#2C89F1"
  },
  "success": {
    "primary": "#00DEB2"
  },
  "danger": {
    "primary": "#FF0057"
  },
  "background": "#353535",
  "textColor": "#E3E3E3",
  "time": 5000,
  "position": "bottom",
  "margin": {
    "top": "0px",
    "bottom": "0px"
  },
  "font": "sans-serif",
  "close": false,
  "teleportTo": "body",
  "teleportPosition": "fixed"
}
```
#### custom position 
If you would like to change the position  where the snackbar it's show, specifies a target element
where the snackbar will be moved, by default the teleportPosition is set to fixed change it to relative.
teleportTo has to be a valid query selector, example: 
teleportTo="#some-id"
teleportTo=".some-class"
teleportTo="HTMLElelement"

Example: 
we have in the body a div like this: 
<div id="test">some content </div> 
if we would like to show the snackbar inside the div change the configuration like this: 

#### Install and configure 
```json
{
  "teleportPosition": "relative",
  "teleportTo": "#test"
}
```

```js
import {SnackbarPlugin} from 'snackbar-vue';

/**
Here it's possibile to override the default configuration
**/
// With some custom method
app.use(SnackbarPlugin, {
  methods: [{
    name: 'test',
    color: 'green'
  }]
});

/*
With some custom global configuration
*/
app.use(SnackbarPlugin, {
  time: 1000,
  close: true,
  font: {
    family: 'Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif',
    size: '18px',
  },
  methods: [{
    name: 'test',
    color: 'green'
  }]
});
```
#### Usage 
Now your component it's possible to inject the snackbar:

```js
import { useSnackbarPlugin } from 'snackbar-vue';
// optionally import default styles
import 'snackbar-vue/dist/snackbar-vue.common.css';
// ...
const snack = useSnackbarPlugin();
// Simple message with the close button 
snack.show({
        position: 'bottom',
        text: `Test Show ${Date.now()}`,
        time: 2000,
        close: true,
      });
// Alert message with an action 
snack.danger({
        position: 'bottom-right',
        text: `Test Danger ${Date.now()}`,
        button: 'ACTION',
        time: 2000,
        close: false,
        action: () => { console.log('do something'); },
      });
// Success message with an action 
snack.success({
        position: 'bottom-left',
        text: `Test Success ${Date.now()}`,
        button: 'ACTION',
        time: 2000,
        action: () => { console.log('do something'); },
      });
// Custom method created from the plugin initialization
snack.test({
  background: '#ffffff',
  textColor: '#000000',
  position: 'top',
  text: `prova ${Date.now()}`,
  button: 'REDO',
  time: 5000,
  close: true,
  action: () => { console.log('do something'); },
});
   

```
