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
    <div class="mv4">
      <span v-for="c in contact" class="measure-narrow ma2 pa0 f6">
        <a class="link near-white bg-near-black pv2 ph4 dim" :href="c.url">{{c.title}}</a>
      </span>
    </div>
  `
})

const app = new Vue({
  el: '#app',
  data: {}
})