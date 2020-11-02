const sess = window.sessionStorage

export const mixin = {
	beforeRouteLeave(to, from ,next) {
		const toRoute = to.path
		const fromRoute = from.path
		const h = JSON.parse(sess.getItem(toRoute))
		if (h && h.history) {
			this.$destroy()
			next()
		} else {
			next()
		}
		next()
	},
	
	beforeRouteEnter (to, from ,next) {
		if (to.meta.keepAlive) {
			const toRoute = to.path
			const fromRoute = from.path
			const h = JSON.parse(sess.getItem(toRoute))
			if (h && h.history) {
				h.history = false
				sess.removeItem(toRoute)
			} else {
				sess.setItem(fromRoute || '/', JSON.stringify({
					history: true
				}))
			}
		}
		next()
	}
}
