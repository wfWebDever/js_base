// 获取cookie
function getCookie(cookieName: string): string {
  const allcookies = document.cookie;
  let cookiePos = allcookies.indexOf(cookieName);
  let value = "";
  if (cookiePos !== -1) {
    cookiePos += cookieName.length + 1;
    let cookiEnd = allcookies.indexOf(";", cookiePos);
    if (cookiEnd === -1) {
      cookiEnd = allcookies.length;
    }
    value = allcookies.substring(cookiePos, cookiEnd);
  }
  return value;
  
}

// 删除cookie
function delCookie(name: string): any {
  const exp = new Date();
  exp.setTime(exp.getTime() - 1);
  const cookie = getCookie(name);
  if (cookie != null) {
    document.cookie = name + "=" + null + ";expires=" + exp.toUTCString() + ";domain=" + "test.com";
  }
}
