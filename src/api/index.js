/**
 * API命名配置列表
 * 命名规则：驼峰式命名方式，动词放前面，名词放后面，
 * 如:addFeatures
 * API命名变量不要太过长
 */
import { get } from './http.js'

// export const baseUrl = 'http://localhost:8080/book' // 风雨小说网PC端
// export const baseUrl = 'http://localhost:8080/reader' // 风雨小说网移动端
export const baseUrl = 'http://121.41.79.10/reader' // 风雨小说网移动端
// export const baseUrl = 'https://www.fastmock.site/mock/f5b0436d25760cd9e4b88fdf3de4d459/api'


export const getBookByAuthor = params => get(`${baseUrl}/search/authorbook`, params) // 根据作者查询书籍

export const getBookByRandom = params => get(`${baseUrl}/search/randombook`, params) // 随机获取几本书籍

export const getBookByRank = params => get(`${baseUrl}/search/rankbook`, params) // 获取排行榜书籍

export const getBookByType = params => get(`${baseUrl}/search/typebook`, params) // 根据分类获取书籍

export const getBookByWord = params => get(`${baseUrl}/search/wordbook`, params) // 根据关键字查询书籍

export const getHotWord = params => get(`${baseUrl}/search/hotWord`, params) // 获取搜索热词

export const getBookDetail = params => get(`${baseUrl}/crawldetail`, params) // 获取书籍详情

export const getBookChapter = params => get(`${baseUrl}/crawlchapter`, params) // 获取章节

export const getBookContent = params => get(`${baseUrl}/crawlcontent`, params) // 获取正文

export const crawlBookTosql = params => get(`${baseUrl}/crawlbook`, params) // 爬取书籍到数据库

export const crawlDetailsTosql = params => get(`${baseUrl}/crawlbook`, params) // 从数据库获取bookId，批量爬取书籍详情并保存到数据库（阅读器用不到）


// export const getBookList = params => get(`${baseUrl}/getBook`, params) // 获取书籍

// export const getBookChapter = params => get(`${baseUrl}/chapter`, params) // 获取章节

// export const getBookContent = params => get(`${baseUrl}/content`, params) // 获取正文

// export const getSearchHotKey = params => get(`${baseUrl}/searchHotWord`, params) // 获取搜索关键字
