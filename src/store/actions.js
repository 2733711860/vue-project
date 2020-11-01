import * as types from './mutation-types'

// 是否显示侧边目录
export const setIsShowMenu = function({ commit }, isShowMenu) {
  commit(types.SET_ISSHOWMENU, isShowMenu)
}

// 书籍所有类别
export const setCats = function({ commit }, cats) {
  commit(types.SET_CATS, cats)
}

// 排行榜类型
export const setRanks = function({ commit }, ranks) {
  commit(types.SET_RANKS, ranks)
}

// 当前小说源Id
export const setBookSourceId = function({ commit }, bookSourceId) {
  commit(types.SET_BOOKSOURCEID, bookSourceId)
}
