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

Register the plugin

```js

import {SnackbarPlugin} from "@/index";

app.use(SnackbarPlugin, {
  methods: [{
    name: 'test',
    color: 'green'
  }]
});

```

Now your component it's possible to inject the snackbar:

```js
import { useSnackbarPlugin } from '@/index';
// ...
const snack = useSnackbarPlugin();

snack.test({
  background: '#ffffff',
  textColor: '#000000',
  position: 'top',
  text: `prova ${Date.now()}`,
  button: 'REDO',
  time: 5000,
  close: true,
  action: () => { show(); },
});
   
```
