function getPatterns () {
  let retArray = []

  function reqListener () {
    let patterns = JSON.parse(this.responseText)

    class Pattern {
      constructor (permalink, title, content, id) {
        this.permalink = permalink
        this.title = title
        this.url = 'https://www.toptal.com' + /src\s*=\s*"(.+?)"/g.exec(content)[1]
        this.id = id
      }
    }

    patterns.forEach(function (el) {
      retArray.push(new Pattern(el.permalink, el.title, el.content, el.id))
    })
  }

  var oReq = new XMLHttpRequest()
  oReq.addEventListener('load', reqListener)
  oReq.open('GET', 'https://www.toptal.com/designers/subtlepatterns/?feed=json')
  oReq.send()

  return retArray
}

let store = {
  debug: false,
  state: {
    activePattern: null
  },
  patterns: getPatterns(),
  selectPattern(index) {
    store.debug && console.log('selectPattern triggered with', index)
    store.state.activePattern = store.patterns[index]
  },
  clearPattern() {
    store.debug && console.log('clearPattern triggered')
    store.state.activePattern = null
  }
}

let listView = Vue.component('list-view', {
  data: function () {
    return {store}
  },
  template: `
    <div>
      <div v-for="(p, index) in store.patterns">
        <pattern-item :pattern="p" :index="index"></pattern-item>
      </div>
    </div>
  `
})

let patternItem = Vue.component('pattern-item', {
  data: function () {
    return {store}
  },
  methods: {
    select: function () {
      store.selectPattern(this.index)
    }
  },
  props: ['pattern'],
  template: `
    <div class="pa5" :style="{'background-image': 'url(' + pattern.url + ')'}">
      <router-item :text="pattern.title" :to="'/' + pattern.id"></router-item>
    </div>
  `
})

let buttonItem = Vue.component('button-item', {
  props: ['text'],
  template: `
    <a class="w-20 no-underline near-white bg-animate bg-near-black hover-bg-gray inline-flex items-center ma1 tc pa2">
      <span class="f6 center pa2 ttu tracked">{{text}}</span>
    </a>
  `
})

let routerItem = Vue.component('router-item', {
  props: ['text', 'to'],
  template: `
    <router-link :to="to" class="w-20 no-underline near-white bg-animate bg-near-black hover-bg-gray inline-flex items-center ma1 tc pa2">
      <span class="f6 center pa2 ttu tracked">{{text}}</span>
    </router-link>
  `
})

let fullscreenView = Vue.component('fullscreen-view', {
  props: ['id'],
  data: function () {
    return {pattern: store.patterns.find(x => x.id === Number(this.id))}
  },
  template: `
    <div class="dt w-100 vh-100" :style="{'background-image': 'url(' + pattern.url + ')'}">
      <div class="tc dtc v-mid">
        <router-item text="Back" to="/"></router-item>
        <button-item text="Download" :href="pattern.permalink"></button-items>
      </div>
    </div>
  `
})
