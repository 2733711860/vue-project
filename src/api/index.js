/**
 * Created by chenyb on 22/10/18.
 * API命名配置列表
 * 命名规则：驼峰式命名方式，动词放前面，名词放后面，
 * 如:addFeatures
 * API命名变量不要太过长
 */
import { get } from './http.js'

// export const baseUrl = 'http://api.zhuishushenqi.com' // 追书神器api

export const getAllCats = () => get('/api/cats/lv2/statistics') // 获取所有分类

export const getRanks = () => get('/api/ranking/gender') // 获取排行榜类型

export const getRankBook = (rankId) => get('/api/ranking/' + rankId) // 获取排行榜小说

export const getLittleCats = () => get(`/api/cats/lv2`) // 获取分类下小类别

export const getBookByCat = (gender, type, major, minor, start, limit) => get(`/api/book/by-categories?gender=${gender}&type=${type}&major=${major}&minor=${minor}&start=${start}&limit=${limit}`) // 根据分类获取小说列表

export const getBookDetail = (bookId) => get('/api/book/' + bookId) // 获取小说信息

export const getBookSource = (bookId) => get(`/api/btoc?view=summary&book=${bookId}`) // 获取小说正版源

export const getBookSourceAll = (bookId) => get(`/api/atoc/view=summary&book=${bookId}`) // 获取小说正版源于盗版源(混合)

export const getChapters = (sourceId) => get(`/api/atoc/${sourceId}?view=chapters`) // 获取小说章节(根据小说源id)

export const getChapterContent = (link) => get(`/content/chapter/${link}`) // 获取小说章节内容

export const search = (query) => get(`/api/book/fuzzy-search?query=${query}`) // 模糊搜索

export const getHotWords = () => get(`/api/book/search-hotwords`) // 获取搜索热词

export const autoComplete = (query) => get(`/api/book/auto-complete?query=${query}`) // 搜索自动补充





// export const baseUrl = 'http://localhost:8080'
export const baseUrl = 'https://www.fastmock.site/mock/f5b0436d25760cd9e4b88fdf3de4d459/api'

export const getBookList = params => get(`${baseUrl}/book/getBook`, params) // 获取书籍

export const getBookChapter = params => get(`${baseUrl}/book/chapter`, params) // 获取章节

export const getBookContent = params => get(`${baseUrl}/book/content`, params) // 获取正文
