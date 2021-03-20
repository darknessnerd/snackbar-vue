import { createApp, ref } from 'vue';
import Default from './default';
import SnackBar from './SnackBar.vue';

let currentComponent = null;
let currentConfiguration = null;
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
  currentConfiguration.value.action = false;
  await sleep(400);
  currentComponent.unmount();
  currentComponent = null;
  document.getElementById(currentConfiguration.value.id).remove();
  // TODO Remove the div 
  // eslint-disable-next-line no-use-before-define
  processQueue();
};

/**
 * Shift from the queue if there is at least one element in the queue and
 * is not already showing a snack bar
 */
const processQueue = () => {
  if (snackbarQueue.length <= 0 || currentComponent !== null) {
    return;
  }
  currentConfiguration = snackbarQueue.shift();
  const SnackbarComponent = createApp({
    components: { SnackBar },
    action: ref(false),
    setup() {
      return { currentConfiguration };
    },
    template: '<SnackBar :config="currentConfiguration"/>',
  });
  const div = document.createElement('div');
  div.id = `snackbar-${Date.now()}`;
  currentConfiguration.value.id = div.id;
  document.getElementById('app').appendChild(div);
  currentComponent = SnackbarComponent;
  currentComponent.mount(`#${div.id}`);
  timeout = setTimeout(close, currentConfiguration.value.time);
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
  snackbarQueue.push(ref({ ...options }));
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
