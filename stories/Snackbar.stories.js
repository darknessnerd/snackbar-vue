import { onMounted, getCurrentInstance } from 'vue';

export default {
  title: 'snackbar',
  decorators: [() => ({ template: '<div style="flex-grow: 1;" id="app"><story/></div>' })],
};

const Template = (args) => ({
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    console.log(getCurrentInstance().appContext.config.globalProperties.$snack);
    onMounted(() => {
      getCurrentInstance().appContext.config.globalProperties.$snack.danger({ title: 'prova' });
    });
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: args.template,
});

export const BasicMessage = Template.bind({});
BasicMessage.args = {
  template: 'test',
};
