import {SnackbarPlugin} from "@/index";
import "@/assets/main.scss";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
import '../stories/assets/custom.css';

import { app } from '@storybook/vue3';

app.use(SnackbarPlugin, {
  time: 1000,
  close: false,
  font: {
    family: 'Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif',
    size: '18px',
  },
  methods: [{
    name: 'test',
    color: 'green'
  }]
});
