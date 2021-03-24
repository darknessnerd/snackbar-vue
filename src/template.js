export default `<teleport to="#app">
<transition name="snackbar" v-if="currentConfiguration" >
  <div v-if="currentConfiguration.action" :style="styles"
       class="snackbar"
       :class="currentConfiguration.position">
    <div class="snackbar__text">{{ currentConfiguration.text }}</div>
    <div class="snackbar__controls">
     <template v-if="currentConfiguration.button">
      <div @click.prevent="currentConfiguration.action"
           class="snackbar__action">
           <div>{{ currentConfiguration.button }} </div>
      </div>
    </template>
    <template v-if="currentConfiguration.close">
      <div @click="close" class="snackbar__close">
        <i class="gg-close"></i>
      </div>
    </template>
    </div>
  </div>
</transition>
</teleport>`;
