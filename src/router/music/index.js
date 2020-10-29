export default [
	{
	  path: '/',
	  redirect: '/index'
	},
  {
    path: '/index',
		name: 'index',
    component: resolve => {
      require(['@/views/index'], resolve)
    },
		meta: {
			title: '首页'
		}
  }
]
