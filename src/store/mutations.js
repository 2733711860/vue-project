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
	[types.SET_BOOKSOURCEID](state, bookSourceId) {
	  state.bookSourceId = bookSourceId
	},
}

export default mutations
