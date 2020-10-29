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
	      name: 'book/home',
	      component: resolve => {
		      require(['@/views/book/home/index.vue'], resolve)
		    },
		    meta: {
		    	title: '书城'
		    }
	    }, {
	      path: '/book/rank',
	      name: 'book/rank',
	      component: resolve => {
		      require(['@/views/book/rank/index.vue'], resolve)
		    },
		    meta: {
		    	title: '榜单'
		    }
	    }, {
	      path: '/book/classify',
	      name: 'book/classify',
	      component: resolve => {
		      require(['@/views/book/classify/index.vue'], resolve)
		    },
		    meta: {
		    	title: '分类'
		    }
	    }, {
	      path: '/book/center',
	      name: 'book/center',
	      component: resolve => {
		      require(['@/views/book/center/index.vue'], resolve)
		    },
		    meta: {
		    	title: '我的'
		    }
	    }
    ]
  }
]
