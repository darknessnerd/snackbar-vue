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
      <div @click="close" class="times">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="#E3E3E3" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59
              6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
      </div>
    </template>
  </div>
</transition>
</teleport>`;
