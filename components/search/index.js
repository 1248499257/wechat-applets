// components/search/index.js
import {
  KeywordModel
} from '../../models/keyword.js'
import {
  BookModel
} from '../../models/book.js'
import {
  pagationBev
} from '../behaviors/pagination.js'


const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  behaviors: [pagationBev],
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    word: '',
    loading: false,
    loadingCenter: false
  },
  attached() {
    keywordModel.getHot().then(data => {
      this.setData({
        historyWords: keywordModel.getHistory(),
        hotWords: data.hot
      })
    })
  },
  methods: {
    onCancel() {
      this.triggerEvent('cancel', {})
      this.initialize()
    },

    onConfirm(e) {
      this._showLoadingCenter()
      this._showResult()
      const word = e.detail.value || e.detail.text
      bookModel.search(0, word).then(res => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        keywordModel.addToHistory(word)
        this._hideLoadingCenter()
        this.setData({
          word
        })
      })
    },

    onDelete(e) {
      this._closeResult()
      this.initialize()
    },

    loadMore() {
      if (!this.data.word) {
        return
      }
      if (this.isLocked()) {
        return
      }
      if (this.hasMore()) {
        this.locked()
        bookModel.search(this.getCurrentStart(), this.data.word).then(res => {
          this.setMoreData(res.books)
          this.unLocked()
        }, () => {
          this.unLocked()
        })
      }
    },

    _showResult() {
      this.setData({
        searching: true
      })
    },

    _closeResult() {
      this.setData({
        searching: false,
        word: ''
      })
    },

    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },

    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    }
  }
})