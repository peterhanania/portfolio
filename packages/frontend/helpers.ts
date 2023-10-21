import { CURRENT_SECTION, NAVIGATION_ID, SECTION_SELECTOR } from './constants';

export function wait(timeout = 0, cb: () => unknown): number | void {
  if (typeof cb !== 'function') return;
  return window.setTimeout(cb, timeout);
}

export function debounce<T extends () => void>(fn: T, ms = 0): () => ReturnType<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>): ReturnType<T> {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
    return undefined as ReturnType<T>;
  } as () => ReturnType<T>;
}

export function getEventPath(event: Event & { path?: EventTarget[] }): (EventTarget | null)[] {
  if (!(event instanceof Event)) return [];

  return (
    (Array.isArray(event.path) && event.path) ||
    (typeof event.composedPath == 'function' && event.composedPath()) ||
    (function fallback() {
      const path = [];
      let target = event.target;

      while (target !== window && (target as HTMLElement).parentNode !== null) {
        path.push(target);
        target = (target as HTMLElement).parentNode;
      }

      path.push(document, window);

      return path;
    })()
  );
}

export const isMacintosh = () => typeof window !== 'undefined' && navigator.platform.indexOf('Mac') > -1;

export function goToSection(setSection, opts) {
  let { node } = opts;
  const { modifier, smooth = true, focus = true } = opts;
  if (!node) return;

  const sections = getSections();

  const app = document.getElementById('peterhanania_content');
  const HTML = document.documentElement;

  const getSectionId = () => node.dataset.section;
  const curSectionIndex = sections.findIndex(({ dataset }: HTMLElement) => dataset.section === getSectionId());

  const findSection = (idx = 0) => sections[curSectionIndex + idx];

  // determine what section to go to based on the modifier.
  if (modifier == 'next') {
    node = findSection(1);
  } else if (modifier == 'previous') {
    node = findSection(-1);
  }

  if (!node) return;
  setTimeout(() => {
    // Add a `scrolled` className so we know not to
    // animate all the items in the section again.
    node.classList.add('scrolled');
  }, 1000);

  if (smooth) smoothScroll(node.offsetTop);
  else scrollTo(0, node.offsetTop);

  setTimeout(() => {
    app.dataset[CURRENT_SECTION] = getSectionId();
    HTML.dataset[CURRENT_SECTION] = getSectionId();
    setSection(getSectionId());

    if (focus) {
      const navigationEl = document.getElementById(NAVIGATION_ID);
      const nodeToFocus = !getFirstFocusableNode(node) ? getFirstFocusableNode(navigationEl) : node;

      if (nodeToFocus === null) return;
      nodeToFocus.focus();
    }
  }, 200);
}

export const getSections = (): HTMLElement[] => Array.from(document.querySelectorAll(SECTION_SELECTOR)) as HTMLElement[];

function smoothScroll(scrollTargetY, speed = 1000) {
  let currentTime = 0;
  const scrollY = pageYOffset || document.documentElement.scrollTop;
  const derivedSpeed = isMotionReduced() ? speed * 3 : speed;

  // min time .1, max time .8 seconds
  const time = Math.max(0.1, Math.min(Math.abs(scrollY - scrollTargetY) / derivedSpeed, 0.8));

  // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
  const easeInOutCubic = (pos) => {
    if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 3);
    return 0.5 * (Math.pow(pos - 2, 3) + 2);
  };

  function runAnimation() {
    currentTime += 1 / 60;

    const p = currentTime / time;
    const t = easeInOutCubic(p);

    if (p < 1) {
      requestAnimationFrame(runAnimation);

      scrollTo(0, scrollY + (scrollTargetY - scrollY) * t);
    } else {
      scrollTo(0, scrollTargetY);
    }
  }

  runAnimation();
}

export function getFirstFocusableNode(target: HTMLElement = document.documentElement): HTMLElement | null {
  if (!(target instanceof HTMLElement)) return null;
  const [firstFocusableNode] = getFocusableNodes(target);
  return firstFocusableNode || null;
}

function slice(collection) {
  return Array.prototype.slice.apply(collection);
}

export function getFocusableNodes(target: HTMLElement = document.documentElement): HTMLElement[] | never[] {
  if (!(target instanceof HTMLElement)) return [];
  const potentialCandidates: HTMLElement[] = slice(
    target.querySelectorAll(
      [
        '*[tabindex]',
        'a[href]:not([hidden])',
        'area[href]:not([hidden])',
        'button:not(:disabled):not([hidden])',
        'embed:not([hidden])',
        'iframe:not([hidden])',
        'audio[controls]:not([hidden])',
        'video[controls]:not([hidden])',
        'input:not([type="hidden"]):not(:disabled):not([hidden])',
        'object:not([hidden])',
        'select:not(:disabled):not([hidden])',
        'textarea:not(:disabled):not([hidden])',
        '*[contenteditable]:not([contenteditable="false"]):not([hidden])'
      ].join()
    )
  );

  return potentialCandidates.filter((elem) => elem instanceof HTMLElement && window.getComputedStyle(elem).display !== 'none');
}

function isMotionReduced() {
  return matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export interface Offset {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export interface ElementInViewOptions {
  threshold?: number;
  offset?: Offset;
}

export default function elementInView(element: Element, options?: ElementInViewOptions): boolean {
  if (!element) return false;

  const { top, right, bottom, left, width, height } = element.getBoundingClientRect();

  options = {
    threshold: 0,
    offset: { top: 0, right: 0, bottom: 0, left: 0 },
    ...options
  };

  const intersection = {
    t: bottom,
    r: window.innerWidth - left,
    b: window.innerHeight - top,
    l: right
  };

  const threshold = {
    x: options.threshold * width,
    y: options.threshold * height
  };

  return (
    intersection.t > (options.offset.top || 0) + threshold.y &&
    intersection.r > (options.offset.right || 0) + threshold.x &&
    intersection.b > (options.offset.bottom || 0) + threshold.y &&
    intersection.l > (options.offset.left || 0) + threshold.x
  );
}
