
const req = require.context('./system', true, /\.vue$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
const apps = requireAll(req)


/**
 * 二次开发的应用在此处加入数组
 */
console.log("二次开发应用添加到该数组",apps)



export default apps
