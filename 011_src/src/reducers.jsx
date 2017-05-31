// Provicer and connect

// 我们把整个应用的reducers 保存在这里

var initialTimeState = {}


export function _time(state = initialTimeState, action) {
    console.log('_time reducer called with state ', state , ' and action ', action);

    switch (action.type) {
	    case 'GET_TIME_REQUEST':
	      return {
	        ...state,
	        frozen: true
	      }
	    case 'GET_TIME_SUCCESS':
	      return {
	        ...state,
	        time: action.result.time,
	        frozen: false
	      }
	    case 'GET_TIME_FAILURE':
	      // we could add an error message here, to be printed somewhere in our application
	      return {
	        ...state,
	        frozen: false
	      }
	    default:
	      return state
	  }
}