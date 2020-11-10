/**
 * Created by chenyb on 22/10/18.
 * API命名配置列表
 * 命名规则：驼峰式命名方式，动词放前面，名词放后面，
 * 如:addFeatures
 * API命名变量不要太过长
 */
import { get } from './http.js'

// export const baseUrl = 'http://localhost:8080'
export const baseUrl = 'https://www.fastmock.site/mock/f5b0436d25760cd9e4b88fdf3de4d459/api'

export const getBookList = params => get(`${baseUrl}/book/getBook`, params) // 获取书籍

export const getBookChapter = params => get(`${baseUrl}/book/chapter`, params) // 获取章节

export const getBookContent = params => get(`${baseUrl}/book/content`, params) // 获取正文

export const getSearchHotKey = params => get(`${baseUrl}/book/searchHotWord`, params) // 获取搜索关键字
