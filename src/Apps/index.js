
const req = require.context('./system', false, /\.vue$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
const apps = requireAll(req)


/**
 * 二次开发的应用在此处加入数组
 */
console.log(apps)



export default apps
