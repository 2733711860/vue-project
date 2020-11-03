export default [
	{
	  path: '/',
	  redirect: '/book'
	},
  {
    path: '/book',
    component: resolve => { require(['@/views/book/index.vue'], resolve) },
    redirect: '/book/home',
    children: [
    	{
	      path: '/book/home',
	      component: resolve => {
		      require(['@/views/book/home/index.vue'], resolve)
		    },
				redirect: '/book/home/index',
				children: [
					{
						path: '/book/home/index',
						name: 'book/home/index',
						component: resolve => {
						  require(['@/views/book/home/children/index.vue'], resolve)
						},
						meta: {
							title: '书城',
							showTop: true,
							rank: 1
						}
					}, {
						path: '/book/home/rank',
						name: 'book/home/rank',
						component: resolve => {
						  require(['@/views/book/home/children/rank.vue'], resolve)
						},
						meta: {
							title: '榜单',
							showTop: true,
							rank: 1
						}
					}, {
						path: '/book/home/classify',
						name: 'book/home/classify',
						component: resolve => {
						  require(['@/views/book/home/children/classify.vue'], resolve)
						},
						meta: {
							title: '分类',
							showTop: true,
							rank: 1
						}
					}
				]
	    }, {
	      path: '/book/bookRelate',
	      component: resolve => {
		      require(['@/views/book/bookRelate/index.vue'], resolve)
		    },
				redirect: '/book/bookRelate/detail',
				children: [
					{
						path: '/book/bookRelate/detail',
						name: 'book/bookRelate/detail',
						component: resolve => {
						  require(['@/views/book/bookRelate/children/detail.vue'], resolve)
						},
						meta: {
							title: '书名',
							keepAlive: true,
							rank: 3
						}
					}, {
						path: '/book/bookRelate/bookTxt',
						name: 'book/bookRelate/bookTxt',
						component: resolve => {
						  require(['@/views/book/bookRelate/children/bookTxt.vue'], resolve)
						},
						meta: {
							title: '书籍文本',
							rank: 4
						}
					}
				]
	    }, {
	      path: '/book/center',
	      name: 'book/center',
	      component: resolve => {
		      require(['@/views/book/center/index.vue'], resolve)
		    },
		    meta: {
		    	title: '我的',
					showTop: true,
					rank: 1
		    }
	    }, {
	      path: '/book/shelf',
	      name: 'book/shelf',
	      component: resolve => {
		      require(['@/views/book/shelf/index.vue'], resolve)
		    },
		    meta: {
		    	title: '书架',
					showTop: true,
					rank: 1
		    }
	    }, {
	      path: '/book/search',
	      name: 'book/search',
	      component: resolve => {
		      require(['@/views/book/search/index.vue'], resolve)
		    },
		    meta: {
		    	title: '搜索',
					showTop: false,
					keepAlive: true,
					rank: 2
		    }
	    }
    ]
  }
]
