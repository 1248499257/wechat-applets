Component({
  // 开启插槽
  options: {
    multipleSlots: true
  },
  externalClasses:[
    'tag-class'
  ],
  properties: {
    text: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击标签触发 传递给组件
    onTap(e){
      this.triggerEvent('tapping', {
        text: this.properties.text
      }) 
    }
  }
})
