export default [
	{
	  path: '/',
	  redirect: '/home'
	},
  {
    path: '/home',
		name: 'home',
    component: resolve => {
      require(['@/views/book/home'], resolve)
    },
		meta: {
			title: '首页'
		}
  }
]
