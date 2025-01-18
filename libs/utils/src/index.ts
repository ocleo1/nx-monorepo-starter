export { default as uuid } from './uuid';
export { default as axiosInst } from './request';

export function isSamePrefix(pathname: string, prefix: string) {
  return pathname === `/${prefix}` || pathname.startsWith(`/${prefix}/`);
}
