// next, action在008_middleware那一节里我们讲过哦
// (next) => (action) => {} 这是es6的写法,具体请了解es6

export default function promiseMiddleware() {
	return (next) => (action) => {
		const {promise, types, ...rest} = action

		if (!promise) {
			return next(action)
		}

		const [REQUEST, SUCCESS, FAILURE] = types

		next({...rest, type: REQUEST})

		return promise().then(
			(result) => {
				next({...rest, result, type: SUCCESS})
			},
			(error) => {
				next({...rest, error, type: FAILURE})
			}
		)
	}
}