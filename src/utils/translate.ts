import { getVendorPrefixedName } from './prefixes';
import { camelCase } from './camel-case';

// browser detection and prefixing tools
const transform = typeof window !== 'undefined' ? getVendorPrefixedName('transform') : undefined;
const backfaceVisibility = typeof window !== 'undefined' ? getVendorPrefixedName('backfaceVisibility') : undefined;
const hasCSSTransforms = typeof window !== 'undefined' ? !!getVendorPrefixedName('transform') : undefined;
const hasCSS3DTransforms = typeof window !== 'undefined' ? !!getVendorPrefixedName('perspective') : undefined;
const ua = typeof window !== 'undefined' ? window.navigator.userAgent : 'Chrome';

export function translateXY(styles: any, x: number, y: number, z: number = 0) {
  if (typeof transform !== 'undefined' && hasCSSTransforms) {
    if (hasCSS3DTransforms) {
      styles[transform] = `translate3d(${x}px, ${y}px, ${z}px)`;
      styles[backfaceVisibility] = 'hidden';
    } else {
      styles[camelCase(transform)] = `translate(${x}px, ${y}px, ${z}px)`;
    }
  } else {
    styles.top = `${y}px`;
    styles.left = `${x}px`;
  }
}
