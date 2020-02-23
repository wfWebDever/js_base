function checkIEVer () {
  const browser = window.navigator.appName
  const bVersion = navigator.appVersion
  let trimVersion
  if (bVersion.indexOf(';') >= 0 && bVersion.split(';').length > 0) {
    const version = bVersion.split(';')
    trimVersion = version[1].replace(/[ ]/g, '')
  }
  if (browser === 'Microsoft Internet Explorer' && trimVersion &&
    trimVersion === 'MSIE9.0') {
    return 'IE9'
  }
  return ''
}

checkIEVer()
// 随着浏览器版本的演进和win7系统微软的不支持 所有IE的低版本浏览器都不需要兼容了。
