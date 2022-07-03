function get_query_url_param(url_search, name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let r = url_search.match(reg)
  if (r) {
    return (r && r[2]) || ''
  } else {
    return ''
  }
}

let url_search = window.location.search
if (url_search) {
  let insidelink = get_query_url_param(url_search.substr(1), 'insidelink')
  //console.info(insidelink);
  let from = get_query_url_param(url_search.substr(1), 'from')
  //console.info(from);
}
