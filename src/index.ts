import { App } from 'vue';
import { AppDateTimePicker } from '@/components/app-date-time-picker';
import { AppTimePicker } from '@/components/app-time-picker';
import ClientOnly from '@/components/ClientOnly.vue';
import '@/styles/variables.css';

const VueDateTimePickerPlugin = {
  install(app: App) {
    // 1) Register main components
    app.component('AppDateTimePicker', AppDateTimePicker);
    app.component('AppTimePicker', AppTimePicker);

    // 2) Register ClientOnly component if it is not already registered
    if (!app.component('ClientOnly')) {
      app.component('ClientOnly', ClientOnly);
    }
  },
};

export default VueDateTimePickerPlugin;
export { AppDateTimePicker, AppTimePicker };
