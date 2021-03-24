import { useSnackbarPlugin } from '@/index';
import { onMounted } from 'vue';

export default {
  title: 'snackbar',
  decorators: [() => ({
    template: '<div style="flex-grow: 1; background-color: whitesmoke;" id="app"><story/></div>' })],
};

const Template = (args) => ({
  setup() {
    const snack = useSnackbarPlugin();
    const show = () => {
      snack.test({
        background: '#ffffff',
        textColor: '#000000',
        position: 'top',
        text: `Test custom method ${Date.now()} ${Date.now()} ${Date.now()} ${Date.now()}`,
        button: 'REDO',
        time: 100000000000,
        close: true,
        action: () => { show(); },
      });
      snack.show({
        position: 'bottom',
        text: `Test Show ${Date.now()} ${Date.now()} ${Date.now()} ${Date.now()}`,
        time: 2000,
        close: true,
      });
      snack.danger({
        position: 'bottom ',
        text: `Test Danger ${Date.now()} ${Date.now()} ${Date.now()} ${Date.now()}`,
        button: 'ACTION',
        time: 2000,
        close: false,
        action: () => { show(); },
      });
      snack.success({
        position: 'bottom',
        text: `Test Success ${Date.now()} ${Date.now()} ${Date.now()} ${Date.now()}`,
        button: 'ACTION',
        time: 2000,
        close: false,
        action: () => { show(); },
      });
      snack.show({
        position: 'bottom',
        text: `Test Show ${Date.now()} ${Date.now()} ${Date.now()} ${Date.now()}`,
        button: 'ACTION',
        time: 2000,
        close: false,
        action: () => { show(); },
      });


    };

    onMounted(() => {

    });
    return { args, show };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: args.template,
});

export const BasicMessage = Template.bind({});
BasicMessage.args = {
  template: '<button @click="show">show</button>',
};
