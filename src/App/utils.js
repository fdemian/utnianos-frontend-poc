const IS_MOBILE = 'isMobile';

export const setIsMobile = (isMobile) => {
  localStorage.setItem(IS_MOBILE, isMobile);
}

export const getIsMobile = () => {
  const isMobile = localStorage.getItem(IS_MOBILE);
  return Boolean(isMobile);
}
