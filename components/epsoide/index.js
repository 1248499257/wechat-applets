Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //不要在属性中修改自身的值
    index: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    year: 0,
    month: '',
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
  },

  attached(){
    //小程序会把 proerties 和 data 合成一个对象
    //不要把data里面的数据定义成 Number ，它是一个函数
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()

    this.setData({
      year: year,
      month: this.data.months[month]
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
