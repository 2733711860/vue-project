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

// 当前小说Id
export const setBookSourceId = function({ commit }, bookSourceId) {
  commit(types.SET_BOOKSOURCEID, bookSourceId)
}

// 搜索历史
export const setHistory = function({ commit, state }, history) {
	if (history.deleteType) {
		commit(types.SET_HISTORYLIST, [])
		return
	}
	let copyList = [...state.historyList] // 拷贝一份
	let haveIndex = copyList.findIndex(val => val.bookName == history)
	let isHave = haveIndex == -1 ? false : true // 历史中是否有这个记录
	if (isHave) { // 有这个记录则删除它
		copyList.splice(haveIndex, 1)
	}
	if (copyList.length == 20) { // 最多保存20条历史记录
		copyList.pop()
	}
	copyList.unshift({bookName: history})
	commit(types.SET_HISTORYLIST, copyList)
}

// 已缓存书籍列表
export const setCacheBooks = function({ commit, state }, books) {
	let copyBooks = [...state.cacheBooks] // 拷贝一份
	let thisBook = copyBooks.find(item => item.bookId == books.bookId) // 当前操作的书籍
	if (!thisBook) { // 新书(进入详情页)
		thisBook = Object.assign({}, books, {
			isOnShelf: books.isOnShelf ? books.isOnShelf : '0', // 0:未放入书架，1:已放入
			chapters: books.chapters ? books.chapters : [],
			currentChapterIndex: 0,
			cacheStartOrigin: -1,
			cacheStart: -1,
			cacheEnd: -1,
			cacheState: '2', // 1：正在缓存，2：缓存暂停，3：缓存完成
			hasReadChapterList: []
		})
		copyBooks.push(thisBook)
	} else {
		copyBooks.forEach(item => {
			if (item.bookId == books.bookId) {
				if (books.newReadChapter) { // 如果是缓存章节
					item.hasReadChapterList.push(books.newReadChapter)
					item.hasReadChapterList.sort((a, b) => {
						return a.chapterIndex < b.chapterIndex ? '-1' : '1'
					})
				}
				item.chaptersCount = books.chaptersCount ? books.chaptersCount : item.chaptersCount
				item.isOnShelf = books.isOnShelf ? books.isOnShelf : item.isOnShelf
				item.chapters = books.chapters ? books.chapters : item.chapters
				item.cacheStartOrigin = (books.cacheStartOrigin || books.cacheStartOrigin == 0) ? books.cacheStartOrigin : item.cacheStartOrigin
				item.cacheStart = (books.cacheStart || books.cacheStart == 0) ? books.cacheStart : item.cacheStart
				item.cacheEnd = (books.cacheEnd || books.cacheEnd == 0) ? books.cacheEnd : item.cacheEnd,
				item.cacheState = books.cacheState ? books.cacheState : item.cacheState
				item.currentChapterIndex = (books.currentChapterIndex || books.currentChapterIndex == 0) ? books.currentChapterIndex : item.currentChapterIndex
			}
		})
	}
	commit(types.SET_CACHEBOOKS, copyBooks)
}

// 不加入书架，则删除当前书籍
export const deleteCasheBooks = ({ commit, state }, bookId) => {
	let copyBooks = [...state.cacheBooks] // 拷贝一份
	let thisIndex = copyBooks.findIndex(item => item.bookId == bookId) // 当前操作的书籍
	copyBooks.splice(thisIndex, 1)
	commit(types.SET_CACHEBOOKS, copyBooks)
}

// cacheBooks[
// 	{
// 		bookId: '',
// 		bookName: '',
// 		bookImg: '', // 书籍封面
// 		isOnShelf: false, // 是否放入书架
//    updatedTime: '', // 最近更新时间
//		lastChapter: '', // 最新章节
// 		chapters: [], // 章节列表
// 		currentChapterIndex: -1, // 当前阅读章节索引
// 		newReadChapter: { // 新缓存的章节
//			chapterIndex: '', // 本章节索引
// 			chapterName: '',
// 			chapterLink: '', // 章节链接
// 			chapterContent: '' // 章节内容
// 		}
// 	}
// ]

// 页面设置信息
export const setSetting = function({ commit, state }, settings) {
	let copySetting = state.setting // 拷贝一份
	copySetting.brightness = settings.brightness ? settings.brightness : copySetting.brightness
	copySetting.fontSize = settings.fontSize ? settings.fontSize : copySetting.fontSize
	copySetting.lineHeight = settings.lineHeight ? settings.lineHeight : copySetting.lineHeight
	copySetting.turnPageMode = (settings.turnPageMode || settings.turnPageMode == 0) ? settings.turnPageMode : copySetting.turnPageMode
	copySetting.backgroundColor = settings.backgroundColor ? settings.backgroundColor : copySetting.backgroundColor
	copySetting.dayNight = settings.dayNight ? settings.dayNight : copySetting.dayNight
	copySetting.bookSource = settings.bookSource ? settings.bookSource : copySetting.bookSource
  commit(types.SET_SETTING, copySetting)
}

// setting{
// 	dayNight: 'day', // day:日间模式  night:夜间模式,
// 	bookSource: '', // 当前小说源(换源)
// 	light: 1, // 亮度
// 	fontSize: 14, // 字体大小
// 	tightness: '4', // 1:紧凑  2:舒适  3:松散  4:默认
// 	turnPageMode: '3', // 翻页模式 0:整页   1:平滑   2:点滑   3:无   4:仿真
// 	readBg: 'rgb(238, 230, 221)' // 阅读背景颜色
// }
