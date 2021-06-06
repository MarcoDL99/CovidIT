export const USE_PROXY = true;

export const URL_BASE = USE_PROXY ? 'api' : 'http://localhost:8080/covidit/api';

export const ITALIA = "Italia";

export const URL = {
  FAQ: URL_BASE + '/faq',
  CONTATTI: URL_BASE + '/contatti',
  TERRITORIO: URL_BASE + '/territorio',
  PROVINCE: URL_BASE + '/province'
};
