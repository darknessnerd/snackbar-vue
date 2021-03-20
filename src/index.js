import { createApp, defineComponent } from 'vue';
import Default from './default';
import SnackBar from './SnackBar.vue';

let currentComponent = null;
let timeout = null;
const snackbarQueue = [];
const methods = {
  danger: 'danger',
  show: 'default',
  success: 'success',
};

// eslint-disable-next-line no-unused-vars
const sleep = (time) => new Promise((resolve, reject) => setTimeout((_) => resolve(), time));
const close = async () => {
  clearTimeout(timeout);
  currentComponent.active = false;
  await sleep(400);
  currentComponent = null;
  // eslint-disable-next-line no-use-before-define
  processQueue();
};
/**
 * Shift from the queue if there is at least one element in the queue and is not already showing
 * a snack bar
 */
const processQueue = () => {
  if (snackbarQueue.length <= 0 || currentComponent !== null) {
    return;
  }
  const component = snackbarQueue.shift();
  const div = document.createElement('div');
  div.id = `snackbar-${Date.now()}`;
  document.getElementById('app').appendChild(div);
  currentComponent = component;
  currentComponent.mount(`#${div.id}`);
  timeout = setTimeout(close, currentComponent.time);
};

const actions = async (params, theme) => {
  let options = params;
  if (!options) {
    throw new Error('Invalid option');
  }
  if (typeof options === 'string') {
    options = { text: options };
  }
  console.warn(options, theme);
  const fn = options.action;
  options.action = async () => {
    if (!fn) {
      close();
      return;
    }
    await fn();
    close();
  };

  options = { ...Default, ...options, theme };
  console.debug('options', options);
  const SnackbarComponent = createApp({
    components: { SnackBar },
    setup() {
      const cfg = { ...options };
      return { cfg };
    },
    template: '<SnackBar :config="cfg"/>',
  });
  console.warn(SnackbarComponent);
  snackbarQueue.push(SnackbarComponent);
  processQueue();
};

const $snack = (opt) => {
  const news = {};
  const themes = {};
  // eslint-disable-next-line no-param-reassign
  opt.methods = opt.methods || [];
  opt.methods.forEach((item) => {
    news[item.name] = item.name;
    themes[item.name] = {
      primary: item.color || Default.default.primary,
    };
  });
  Object.assign(Default, themes);
  const all = {};
  const meth = { ...methods, ...news };

  console.warn(Object.keys(meth));
  Object.keys(meth).forEach((m) => {
    console.warn(m);
    all[m] = (params) => actions(params, meth[m]);
  });
  return all;
};

const SnackbarPlugin = {
  install(app, options = {}) {
    Object.assign(Default, options);
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$snack = $snack(options);
  },
};

export default SnackbarPlugin;
