// 通过 bluebird 库来实现 promise

import Promise from 'bluebird'

export function getTime(delay) {
	return {
		types: ['GET_TIME_REQUEST', 'GET_TIME_SUCCESS', 'GET_TIME_FAILURE'],
		promise: () => {
			return new Promise((resolve, reject) => {
				//通过延时模拟一个服务端请求
				setTimeout(() => {
					const d = new Date()
					const ms = ('000' + d.getMilliseconds()).slice(-3)

					resolve({
			            time: `${d.toString().match(/\d{2}:\d{2}:\d{2}/)[0]}.${ms}`
					})
				}, delay)
			})
		}
	}
}