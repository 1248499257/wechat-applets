import {
  BookModel
} from '../../models/book.js'
import {
  random
} from '../../util/commen.js'

const bookModel = new BookModel()

Page({
  data: {
    books: [],
    searching: false,
    more: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    bookModel.getHotList().then(res => {
      this.setData({
        books: res
      })
    })
  },
  onSearching() {
    this.setData({
      searching: true
    })
  },
  onCancel() {
    this.setData({
      searching: false
    })
  },
  //监听滚动到底部的事件
  onReachBottom() {
    this.setData({
      more: random(16)
    })
  }
})