import { onMounted, getCurrentInstance } from 'vue';

export default {
  title: 'snackbar',
  decorators: [() => ({ template: '<div style="flex-grow: 1;" id="app"><story/></div>' })],
};

const Template = (args) => ({
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    console.log(getCurrentInstance().appContext.config.globalProperties.$snack);
    let showFn;
    onMounted(() => {
      showFn = getCurrentInstance().appContext.config.globalProperties.$snack;
    });
    const show = () => {
      showFn.danger({
          title: 'prova',
          button: 'Close',
          time: 5000,
          action: () => { console.log('action'); }
        }); 
    }
    return { args, show };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: args.template,
});

export const BasicMessage = Template.bind({});
BasicMessage.args = {
  template: '<button @click="show">show</button>',
};
