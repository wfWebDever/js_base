function _clear_space(str: string): string {
  return str.replace(/^\s+|\s+$/g,'');
}
console.info('----',_clear_space(" test sds "),'---');
console.info(111);