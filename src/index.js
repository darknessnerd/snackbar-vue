import {
  defineComponent, ref, inject, watch, createVNode, render,
} from 'vue';
import '@/assets/main.scss';
import Default from './default';
import template from './template';

let currentComponent = null;
const currentConfiguration = ref(null);
let timeout = null;
const snackbarQueue = [];
const snackbarPlugin = Symbol('snackbarPlugin');
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
  currentConfiguration.value = null;
  // eslint-disable-next-line no-use-before-define
  processQueue();
};
/**
 * Shift from the queue if there is at least one element in the queue and
 * is not already showing a snack bar
 */
const processQueue = () => {
  if ((snackbarQueue.length <= 0 || currentConfiguration.value !== null)
    && currentComponent
  ) {
    return;
  }
  currentConfiguration.value = snackbarQueue.shift();
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
  snackbarQueue.push({ ...options });
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
    app.provide(snackbarPlugin, $snack(options));
    document.addEventListener('DOMContentLoaded', () => {
      const SnackbarComponent = defineComponent({
        action: ref(false),
        setup() {
          const styles = ref('');
          watch(currentConfiguration, (val) => {
            if (val !== null) {
              const { theme } = currentConfiguration.value;
              styles.value = `--primary: ${currentConfiguration.value[theme].primary};
              --text: ${currentConfiguration.value.textColor};
              --font: ${currentConfiguration.value.font.family};
              --font-size: ${currentConfiguration.value.font.size};
              --background: ${currentConfiguration.value.background};`;
            } else {
              styles.value = '';
            }
          });
          return { close, currentConfiguration, styles };
        },
        template,
      });
      const vNode = createVNode(SnackbarComponent);
      // eslint-disable-next-line no-underscore-dangle
      vNode.appContext = app._context;
      render(vNode, document.createElement('div'));
      currentComponent = SnackbarComponent;
    });
  },
};

function useSnackbarPlugin() {
  const snackbarPluginInstance = inject(snackbarPlugin);
  if (!snackbarPluginInstance) throw new Error('No snackbarPlugin provided!!!');
  return snackbarPluginInstance;
}

export { SnackbarPlugin, useSnackbarPlugin };
