const routes = [
  {path: '/', component: listView},
  {path: '/:id', component: fullscreenView, props: true}
]

const router = new VueRouter({
  routes
})

const app = new Vue({
  router,
  data: function () {
    return {store}
  }
}).$mount('#app')
