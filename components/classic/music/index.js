import { classicBeh } from '../classic-beh.js'

const mMgr = wx.getBackgroundAudioManager()

Component({
  behaviors: [classicBeh],
  properties: {
    src: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    pauseSrc:'images/player@pause.png',
    playSrc: 'images/player@play.png',
    playing: false
  },
  attached(){
    this._recoverStatus()
    this._monitorSwitch()
  },
  detached(){
    //wx:if vs hidden
    // mMgr.stop()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay(){
      //图片切换
      if(!this.data.playing){
        this.setData({
          playing: true
        })
        //音乐播放
        mMgr.src = this.properties.src
        mMgr.title = '1'
      }else{
        this.setData({
          playing: false
        })
        mMgr.pause()
        mMgr.title = '1'
      }
    },
    //判断状态 切换的时候正在播放的不会停止还可以播放其它
    _recoverStatus(){
      if(mMgr.paused){
        this.setData({
          playing: false
        })
        return
      }
      if(mMgr.src == this.properties.src){
        this.setData({
          playing: true
        })
      }
    },

    _monitorSwitch(){
      mMgr.onPlay(()=>{
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})
