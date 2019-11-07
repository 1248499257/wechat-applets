//import 的时候不能使用相对路径要使用绝对路径
import { ClassicModel } from '../../models/classic.js'
import { LikeModel } from '../../models/like.js'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({
  data: {
    classicData: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   * 4xx 的状态码 不会执行fail
   */
  onLoad: function (options) {
    classicModel.getLatest( res =>{
      //数据更新 storage
      this.setData({
        classicData : res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },

  //喜欢不喜欢
  onLike: function (event){
    let behavior = event.detail.behavior  
    likeModel.like(behavior, this.data.classicData.id, this.data.classicData.type) 
  },

  //点击左右改变
  onLeft(){
    this._updateClassic('next')
  },
  onRight(){
    this._updateClassic('previous')
  },

  _updateClassic(nextOrPrevious){
    let index = this.data.classicData.index
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classicData: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },

  _getLikeStatus(artID, category){
    likeModel.getClassicLikeStatus(artID, category, (res)=>{
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  }
})