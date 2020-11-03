/* 
	获取小说篇封面url
 */
export function getCoverUrl (url) {
	if (url.search(/agent/i) === -1) {
		return 'http://api.zhuishushenqi.com' + url;
	} else {
		return decodeURIComponent(url.replace(/\/agent\//, ''));
	}
}

/* 
	返回小说
 */
export function getBook (book) {
	return {
		bookId: book._id,
		bookName: book.title,
		bookAuthor: book.author,
		bookType: book.cat ? book.cat : (book.majorCate + ',' + book.minorCate),
		bookRate: book.rating ? book.rating : '6.0', // 评分
		bookDesc: book.shortIntro ? book.shortIntro : book.longIntro, // 简介
		latelyFollower: book.latelyFollower, // 人气
		retentionRatio: book.retentionRatio, // 留存率
		bookImg: getCoverUrl(book.cover), // 封面
		wordCount: book.wordCount ? wordCount2Str(book.wordCount) : '0', // 字数
		lastChapter: book.lastChapter ? book.lastChapter : '', // 最新章节
		chaptersCount: book.chaptersCount ? book.chaptersCount : 0, // 章节数
		isSerial: book.isSerial ? book.isSerial : true, // 是否连载
		updatedTime: book.updated ? book.updated : new Date() // 更新时间
	}
}

/* 
	将字数带上单位 如12345 转化为1.2万字
 */
export function wordCount2Str (wordCount) {
  if (Array.from(String(wordCount)).length > 4) {
    let arr = Array.from(String(wordCount));
    arr.length -= 4;
    wordCount = arr.join('') + '万';
  }
  if (wordCount<=0){
    wordCount= 0 ;
  }
  return wordCount + '字';
}

export class Book {
  constructor({title, content}) {
    this.title = title;
    this.content = content;
  }
}

export function bookChaptersBody (books) { // 字符串解析
	if (books) {
		let c = /[\u4E00-\u9FA5\uF900-\uFA2D]/g
		let _book = JSON.stringify(books).replace(/^"|"$/g, '')
		if (c.test(_book)) {
			_book = '<p>' + _book.replace(/\s*/g, '').replace(/\\n/g, '</p><p>').replace(/\\r/g, '') + '</p>'
			return _book
		} else {
			return 'vip章节，请购买或者换源阅读！' // 换源功能已经实现
		}
	}
}

export function _nromalBook (title, content) { // 构建book类
	let book = new Book({
		title: title,
		content: bookChaptersBody(content)
	});
	return book
}