<template>
  <div class="row">
    <div class="col-12">
      <form class="uk-search uk-search-default">
        <span class="uk-search-icon-flip" uk-search-icon></span>
        <input class="uk-search-input" type="search" v-model="value" :placeholder="placeholder">
      
  </form>
    </div>
  </div>
</template>
<script>
import Fuse from 'fuse.js'
export default {
  name: 'VueFuse',
  data () {
    return {
      fuse: null,
      value: '',
      result: []
    }
  },
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    search: {
      type: String,
      default: ''
    },
    eventName: {
      type: String,
      default: 'fuseResultsUpdated'
    },
    inputChangeEventName: {
      type: String,
      default: 'fuseInputChanged'
    },
    defaultAll: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array
    },
    caseSensitive: {
      type: Boolean,
      default: false
    },
    includeScore: {
      type: Boolean,
      default: false
    },
    includeMatches: {
      type: Boolean,
      default: false
    },
    tokenize: {
      type: Boolean,
      default: false
    },
    matchAllTokens: {
      type: Boolean,
      default: false
    },
    findAllMatches: {
      type: Boolean,
      default: true
    },
    id: {
      type: String,
      default: ''
    },
    shouldSort: {
      type: Boolean,
      default: true
    },
    threshold: {
      type: Number,
      default: 0.4
    },
    location: {
      type: Number,
      default: 0
    },
    distance: {
      type: Number,
      default: 20
    },
    maxPatternLength: {
      type: Number,
      default: 32
    },
    minMatchCharLength: {
      type: Number,
      default: 4
    },
    keys: {
      type: Array
    }
  },
  computed: {
    options () {
      var options = {
        caseSensitive: this.caseSensitive,
        includeScore: this.includeScore,
        includeMatches: this.includeMatches,
        tokenize: this.tokenize,
        matchAllTokens: this.matchAllTokens,
        findAllMatches: this.findAllMatches,
        shouldSort: this.shouldSort,
        threshold: this.threshold,
        location: this.location,
        distance: this.distance,
        maxPatternLength: this.maxPatternLength,
        minMatchCharLength: this.minMatchCharLength,
        keys: this.keys
      }
      if (this.id !== '') {
        options.id = this.id
      }
      return options
    }
  },
  watch: {
    list () {
      this.fuse.list = this.list
      this.fuseSearch()
    },
    search () {
      this.value = this.search
    },
    value () {
      this.$parent.$emit(this.inputChangeEventName, this.value)
      this.$emit(this.inputChangeEventName, this.value)
      this.fuseSearch()
    },
    result () {
      this.$emit(this.eventName, this.result)
      this.$parent.$emit(this.eventName, this.result)
    }
  },
  methods: {
    initFuse () {
      this.fuse = new Fuse(this.list, this.options)
      if (this.defaultAll) {
        this.result = this.list
      }
      if (this.search) {
        this.value = this.search
      }
    },
    fuseSearch () {
      if (this.value.trim() === '') {
        if (this.defaultAll) {
          this.result = this.list
        } else {
          this.result = []
        }
      } else {
        this.result = this.fuse.search(this.value.trim())
      }
    }
  },
  /**
  * Vue 1.x
  */
  ready () {
    this.initFuse()
  },
  /**
  * Vue 2.x
  */
  mounted () {
    this.initFuse()
  }
}
</script>

<style>


</style>
