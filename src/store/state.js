const state = {
	isShowMenu: false, // 是否显示侧边目录
	cats: null, // 书籍所有类别
	ranks: null, // 排行榜类型
	bookSourceId: null, // 当前小说源id
	historyList: [], // 搜索历史
	cacheBooks: [], // 已缓存书籍列表
	setting: { // 页面设置信息
		dayNight: 'day', // day:日间模式  night:夜间模式,
		bookSource: '', // 当前小说源(换源)
		brightness: 0.9, // 亮度
		defaultBrightness: 0.9, // 默认亮度
		fontSize: 14, // 字体大小
		defaultFontSize: 14, // 默认字体大小
		lineHeight: 30, // 25:紧凑  28:舒适  35:松散  30:默认
		defaultLineHeight: 30, // 默认行间距
		turnPageMode: 3, // 翻页模式 0:整页   1:平滑   2:点滑   3:无   4:仿真
		backgroundColor: 'rgba(236, 216, 179, 1)' // 阅读背景颜色
	},
	keepAliveList: ['book/bookRelate/detail', 'book/search'],
}

export default state
