const state = {
	isShowMenu: false, // 是否显示侧边目录
	cats: null, // 书籍所有类别
	ranks: null, // 排行榜类型
	bookSource: { // 当前小说源
		bookSourceId: null,
		bookSourceName: null
	},
	historyList: [], // 搜索历史
	cacheBooks: [], // 已缓存书籍列表
	keepAliveList: ['book/bookRelate/detail', 'book/search']
}

export default state
