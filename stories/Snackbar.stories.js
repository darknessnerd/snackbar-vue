import { useSnackbarPlugin } from '@/index';

export default {
  title: 'snackbar',
  decorators: [() => ({ template: '<div style="flex-grow: 1;" id="app"><story/></div>' })],
};

const Template = (args) => ({
  setup() {
    const snack = useSnackbarPlugin();
    const show = () => {
      snack.test({
        background: '#ffffff',
        textColor: '#000000',
        position: 'top',
        text: `prova ${Date.now()}`,
        button: 'REDO',
        time: 100000000000,
        close: true,
        action: () => { show(); },
      });
    };
    return { args, show };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: args.template,
});

export const BasicMessage = Template.bind({});
BasicMessage.args = {
  template: '<button @click="show">show</button>',
};
