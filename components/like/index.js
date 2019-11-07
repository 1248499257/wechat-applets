Component({
  properties: {
    //属性
    like: {
      type: Boolean
    },
    count: {
      type: Number
    }
  },

  data: {
    //利用三元表达式切换图片和数字
    //组件的封装性（数据是内部还是开放）开放性 粒度（哪些功能得封装在组件里面）
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png'
  },

  methods: {
    onLike(event){
      let like = this.properties.like
      let count = this.properties.count

      count = like? count-1 : count+1
      //数据更新
      this.setData({
        count: count,
        like: !like
      })

      //自定义事件 激活
      let behavior = this.properties.like? 'like' : 'cancel'
      this.triggerEvent('like',{
        behavior: behavior
      },{})
    }
  }
})
