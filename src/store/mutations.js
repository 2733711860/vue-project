import * as types from './mutation-types'

const mutations = {
	// 是否显示侧边目录
  [types.SET_ISSHOWMENU](state, isShowMenu) {
    state.isShowMenu = isShowMenu
  },
	
	// 书籍所有类别
	[types.SET_CATS](state, cats) {
	  state.cats = cats
	},
	
	// 排行榜类型
	[types.SET_RANKS](state, ranks) {
	  state.ranks = ranks
	},
	
	// 当前小说源Id
	[types.SET_BOOKSOURCE](state, bookSource) {
	  state.bookSource = bookSource
	},
	
	// 搜索历史
	[types.SET_HISTORYLIST](state, historyList) {
	  state.historyList = historyList
	},
	
	// 搜索历史
	[types.SET_KEEPALIVELIST](state, keepAliveList) {
	  state.keepAliveList = keepAliveList
	},
	
	// 已缓存书籍列表
	[types.SET_CACHEBOOKS](state, cacheBooks) {
	  state.cacheBooks = cacheBooks
	},
}

export default mutations
