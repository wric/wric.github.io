const heading = Vue.component('heading', {
  props: ['text'],
  methods: {
    splitWords: (s) => (s.split(' '))
  },
  template: `
    <h1 class="w-100 mw7 w5-ns playfair">
      <div v-for="w in splitWords(text)">{{w}}<br /></div>
    </h1>
  `
})

const entry = Vue.component('entry', {
  props: ['name', 'url'],
  template: `
    <div>
      <a v-if="url" :href="url" class="link near-black underline-hover dim playfair b ma0 pa0 mb1">{{name}}</a>
      <p v-else class="playfair b ma0 pa0 mb1">{{name}}</p>
    </div>
  `
})

const description = Vue.component('description', {
  props: ['desc'],
  template: `
    <div>
      <p class="measure-narrow helvetica ma0 pa0 mb2 f6">{{desc}}</p>	
    </div>
  `
})

const contact = Vue.component('contact', {
  data: () => (
    {
      contact: [
        {'title': 'Email', 'url': ''},
        {'title': 'Github', 'url': 'https://github.com/wric'}
      ]
    }
  ),
  created() {
    // <!--
    // Email obfuscator script 2.1 by Tim Williams, University of Arizona
    // Random encryption key feature by Andrew Moulden, Site Engineering Ltd
    // This code is freeware provided these four comment lines remain intact
    // A wizard to generate this code is at http://www.jottings.com/obfuscator/
    let coded = 'yX201XNb.NcUqQNZ@b3Qck.UC3'
    let key = 'CteqrWSxKUZRI6ML1P3i2lafw4g0XVNTjYFOoHEhAnJ8zcdkQvypbGm9sB5uD7'
    let shift = coded.length
    let link = ''
    for (i = 0; i < coded.length; i++) {
      if (key.indexOf(coded.charAt(i)) == -1) {
        ltr = coded.charAt(i)
        link += (ltr)
      } else {
        ltr = (key.indexOf(coded.charAt(i)) - shift + key.length) % key.length
        link += (key.charAt(ltr))
      }
    }
    this.contact[0].url = 'mailto:' + link
  },
  template: `
    <div>
      <span v-for="c in contact" class="measure-narrow helvetica ma0 pa0 mr2 f6">
        <a class="link near-black underline-hover dim" :href="c.url">{{c.title}}</a>
      </span>
    </div>
  `
})

const app = new Vue({
  el: '#app',
  data: {
    projects: []
    ,
    contact: [
      {'title': 'Email', 'url': ''},
      {'title': 'Github', 'url': 'https://github.com/wric'}
    ]
  },
  created() {
    fetch('./projects.json')
      .then(res => res.json())
      .then(o => {this.projects = o.projects})
      .catch(e => console.log(e))
  }
})