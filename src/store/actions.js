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
export const setBookSource = function({ commit }, bookSource) {
  commit(types.SET_BOOKSOURCE, bookSource)
}

// 搜索历史
export const setHistory = function({ commit, state }, history) {
	if (history.deleteType) {
		commit(types.SET_HISTORYLIST, [])
		return
	}
	let copyList = [...state.historyList] // 拷贝一份
	let haveIndex = copyList.findIndex(val => val.word == history)
	let isHave = haveIndex == -1 ? false : true // 历史中是否有这个记录
	if (isHave) { // 有这个记录则删除它
		copyList.splice(haveIndex, 1)
	}
	if (copyList.length == 20) { // 最多保存20条历史记录
		copyList.pop()
	}
	copyList.unshift({word: history})
	commit(types.SET_HISTORYLIST, copyList)
}

// 已缓存书籍列表
export const setCacheBooks = function({ commit, state }, books) {
	let copyBooks = [...state.cacheBooks] // 拷贝一份
	let thisBook = copyBooks.find(item => item.bookSourceId == books.bookSourceId) // 当前操作的书籍
	if (!thisBook) { // 新书(进入详情页)
		thisBook = {
			bookId: books.bookId,
			bookSourceId: books.bookSourceId,
			bookName: books.bookName,
			bookImg: books.bookImg,
			isOnShelf: books.isOnShelf ? books.isOnShelf : '0', // 0:未放入书架，1:已放入
			chapters: [],
			currentChapterIndex: 0,
			hasReadChapterList: []
		}
		copyBooks.push(thisBook)
	} else {
		console.log('有本书')
		if (books.newReadChapter) { // 如果是缓存章节
			thisBook.hasReadChapterList.push(books.newReadChapter)
		}
		thisBook.bookId = books.bookId ? books.bookId : thisBook.bookId
		thisBook.bookSourceId = books.bookSourceId ? books.bookSourceId : thisBook.bookSourceId
		thisBook.bookName = books.bookName ? books.bookName : thisBook.bookName
		thisBook.bookImg = books.bookImg ? books.bookImg : thisBook.bookImg
		thisBook.isOnShelf = books.isOnShelf ? books.isOnShelf : thisBook.isOnShelf
		thisBook.chapters = books.chapters ? books.chapters : thisBook.chapters
		thisBook.currentChapterIndex = books.currentChapterIndex ? books.currentChapterIndex : thisBook.currentChapterIndex
		let thisIndex = copyBooks.findIndex(item => item.bookSourceId = books.bookSourceId)
		copyBooks.splice(thisIndex, 1, thisBook) // 删除之前的，并把现在的插入进去
	}
	commit(types.SET_CACHEBOOKS, copyBooks)
}

// cacheBooks[
// 	{
// 		bookId: '',
// 		bookSourceId: '',
// 		bookName: '',
// 		bookImg: '', // 书籍封面
// 		isOnShelf: false, // 是否放入书架
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
