import cookie from 'cookie';

export default function ParseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
}