import SnackbarPlugin from "@/index";
import "@/assets/main.scss";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
import '../stories/assets/custom.css';

import { app } from '@storybook/vue3';

app.use(SnackbarPlugin, {
  methods: [{
    name: 'test',
    color: 'green'
  }]
});
