export default `<teleport to="#app">
<transition name="snack" v-if="currentConfiguration" >
  <div v-if="currentConfiguration.action" :style="styles"
       class="snackbar"
       :class="currentConfiguration.position">
    <div class="snackbar__text">{{ currentConfiguration.text }}</div>
    <template v-if="currentConfiguration.button">
      <div @click.prevent="currentConfiguration.action"
            class="snackbar__action">{{ currentConfiguration.button }}
      </div>
    </template>
    <template v-if="currentConfiguration.close">
      <div @click="close" class="snackbar__times">
        <i class="gg-close"></i>
      </div>
    </template>
  </div>
</transition>
</teleport>`;
