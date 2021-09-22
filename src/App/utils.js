const IS_MOBILE = 'isMobile';

export const setIsMobile = (isMobile) => {
  localStorage.setItem(IS_MOBILE, isMobile);
}

export const getIsMobile = () => {
  return localStorage.getItem(IS_MOBILE);
}
