/**
 * 增强store功能
 */


/**
 * 从右到左依次执行函数,最右边的函数可以有多个参数
 * @param funcs  要处理的函数
 * @returns {Function}  返回一个函数,例如: compose(f, g, h)表示(...args) => f(g(h(...args)))
 */
function compose(...funcs) {
    if ( funcs.length == 0 )
        return arg => arg

    if (funcs.length == 1)
        return funcs[0]

    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}