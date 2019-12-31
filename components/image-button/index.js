// components/image-button/index.js
Component({
  options:{
    multipleSlots: true
  },
  properties: {
    openType: String
  },

  data: {

  },

  methods: {
    onGetUserInfo(e){
      this.triggerEvent('getuserinfo', e.detail, {})
    }
  }
})
