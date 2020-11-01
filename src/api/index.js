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
