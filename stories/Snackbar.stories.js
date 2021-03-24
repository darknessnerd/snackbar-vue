import { useSnackbarPlugin } from '@/index';
import { ref } from 'vue';

export default {
  title: 'snackbar',
  decorators: [() => ({ template: '<div style="flex-grow: 1; background-color: whitesmoke;" id="app"><story/></div>' })],
};

const Template = (args) => ({
  setup() {
    const snack = useSnackbarPlugin();
    const actionClicked = ref('');
    const success = () => {
      snack.success({
        position: 'bottom',
        text: `Test Success ${Date.now()}`,
        button: 'ACTION',
        action: () => { actionClicked.value = 'success'; },
      });
    };
    const danger = () => {
      snack.danger({
        position: 'bottom',
        text: `Test danger ${Date.now()}`,
        button: 'ACTION',
        action: () => { actionClicked.value = 'danger'; },
      });
    };
    const show = () => {
      snack.show({
        position: 'bottom',
        text: `Test danger ${Date.now()}`,
        close: true,
        action: () => { actionClicked.value = 'show'; },
      });
    };
    const customMethod = () => {
      console.error(args);
      snack.customMethod({
        background: '#ffffff',
        textColor: '#000000',
        position: 'top',
        text: `Test custom method ${Date.now()} `,
        button: 'REDO',
        time: 100000000000,
        close: true,
        action: () => { actionClicked.value = 'test'; },
      });
    };
    return {
      args, customMethod, show, danger, success, actionClicked,
    };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: args.template,
});

export const Demo = Template.bind({});
Demo.args = {
  template: 'Action clicked: {{actionClicked}} <br><br>'
    + '<div id="test"></div>'
    + '<button style="margin-right: 4px" @click="customMethod">customMethod</button>'
    + '<button style="margin-right: 4px" @click="show">show</button>'
    + '<button style="margin-right: 4px" @click="danger">danger</button>'
    + '<button style="margin-right: 4px" @click="success">success</button>',
};
