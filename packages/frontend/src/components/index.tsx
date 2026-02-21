import pkg from '../../../../package.json';
import { CURRENT_SECTION, NAVIGATION_ID, SECTIONS, themes } from '../../constants';
import elementInView, { goToSection as GoToSection, debounce, getEventPath, getSections, isMacintosh, wait } from '../../helpers';
import { useSectionStore } from '../states';
import IntroductionComponent from './about';
import ComissionsComponent from './comissions';
import ExperienceComponent from './experience';
import AboutComponent from './main';
import NavigationComponent from './navigation';
import Cursor from './other/cursor';
import ProjectsComponent from './projects';
import { useEffect, useRef, useState } from 'preact/hooks';
import { Tooltip } from 'react-tippy';

const version = pkg.version;

export default function () {
  const globalSection = useSectionStore((state) => state.section);
  const setGlobalSection = useSectionStore((state) => state.setSection);
  const [touchY, setTouchY] = useState<null | number>(null);
  const [previousTime, setPreviousTime] = useState<number>(new Date().getTime());
  const _isMaxHeight = useRef(false);
  const _isMediumScreen = useRef(false);
  const isMaxHeight = () => _isMaxHeight.current;
  const isMediumScreen = () => _isMediumScreen.current;
  const setIsMaxHeight = (val: boolean) => {
    _isMaxHeight.current = val;
  };
  const setIsMediumScreen = (val: boolean) => {
    _isMediumScreen.current = val;
  };
  const [curTheme, setCurTheme] = useState<string>(themes[0].name);
  const [starBannerDismissed, setStarBannerDismissed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('star_banner_dismissed') === 'true';
    } catch {
      return false;
    }
  });

  const dismissStarBanner = () => {
    setStarBannerDismissed(true);
    try {
      localStorage.setItem('star_banner_dismissed', 'true');
    } catch {
      // ignore
    }
  };

  const mostVisibleSection = () =>
    getSections().find((section) => {
      const sectionOffsetTop = String(section.offsetTop);
      const docElemScrollTop = document.documentElement.scrollTop;

      return Math.abs((parseInt(sectionOffsetTop) - docElemScrollTop) / 100) < 2; // 2 percent
    });

  const currentSection = () => {
    const app = document.getElementById('peterhanania_content');
    return app?.dataset[CURRENT_SECTION];
  };

  const getSection = (id?: string): Element | null => {
    if (!id) id = currentSection();
    const sectionElem = document.querySelector(`[data-section='${id}']`);

    if (!sectionElem) return null;
    return sectionElem;
  };

  /**
   * Determine if the specified section is hidden.
   * @param {string} id - the id of the section to check
   * @return {'true' | 'false'}
   */
  const isSectionHidden = (id: string): boolean => {
    calculateScreens();

    const hidden = isMaxHeight()
      ? currentSection() !== id
      : getSection(id) instanceof HTMLElement && !elementInView(getSection(id), { threshold: 0.5 });

    return hidden;
  };

  /**
   * Configurable fn to scroll to a section - accepts a node
   * Default opts: `{ smooth: true, focus: true }`.
   * Toggle the values to disable/enable smooth scrolling
   * and focusing the section on arrival respectively.
   * @return {void}
   */
  const goToSection = (...args) => {
    if (isMediumScreen()) return;

    return GoToSection((section) => {
      setGlobalSection(section);

      if (section === SECTIONS[0]) window.history.pushState(null, '', window.location.pathname);
      else window.history.pushState(null, '', `#${section}`);

      //@ts-expect-error - :)
    }, ...args);
  };

  /**
   * Recalculate position of the current section
   * then adjust based on that information.
   * @return {void}
   */
  const recalcSection = () => {
    const currentSection = getSection();
    goToSection({ node: currentSection, smooth: false });

    calculateScreens();
  };

  const calculateScreens = () => {
    setIsMaxHeight(window.matchMedia('(min-width: 768px) and (max-height: 1199px)').matches);
    setIsMediumScreen(window.matchMedia('(max-width: 768px)').matches);
  };

  /**
   * Go to the section after the current one.
   * @return {void}
   */
  const goToNextSection = () => {
    goToSection({ modifier: 'next', node: getSection() });
  };

  /**
   * Go to the section before the current one.
   * @return {void}
   */
  const goToPrevSection = () => {
    goToSection({ modifier: 'previous', node: getSection() });
  };

  /**
   * Jump to the absolute first section on the page.
   * @return {void}
   */
  const goToFirstSection = () => {
    goToSection({ node: getSection(SECTIONS[0]) });
  };

  /**
   * Jump to the absolute last section on the page.
   * @return {void}
   */
  const goToLastSection = () => {
    goToSection({ node: getSection(SECTIONS[SECTIONS.length - 1]) });
  };

  /**
   * Set current section to the most visible section upon
   * reload (if we're able to determine that), otherwise, just
   * reset the document scroll.
   * @return {number | void}
   */
  const maybeRestoreSection = () => {
    const resetScroll = () => {
      Object.assign(document.documentElement, {
        scrollTop: 0,
        scrollLeft: 0
      });
    };

    if (!mostVisibleSection()) return wait(100, resetScroll);

    goToSection({ focus: false, node: mostVisibleSection() });

    // don't enable header compact style if we're on the first section.
    if (currentSection() === SECTIONS[0]) return;
    // this.$store.commit('headerCompact', true);
  };

  /**
   * Determine if the page is being scrolled very fast
   * within the specified period of time
   * @param {number} ms
   * @return {boolean}
   */
  const scrollingLudicrouslyFast = (ms = 100) => {
    const curTime = new Date().getTime();
    const timeDiff = curTime - previousTime;
    setPreviousTime(curTime);

    return timeDiff < ms;
  };

  /**
   * Register the last horizontal touch position.
   * @param {TouchEvent} event
   * @return {void}
   */
  const handleTouchstart = (event) => {
    if (!Array.isArray(event.touches) || isMediumScreen()) return;
    setTouchY(event.touches[0].clientY);
  };

  /**
   * GO to the next or previous section based on the
   * touch move direction.
   * @param {TouchEvent} event
   * @return {void}
   */
  const handleTouchmove = (event) => {
    if (isMediumScreen() || !Array.isArray(event.changedTouches) || scrollingLudicrouslyFast()) return;

    const curTouchY = event.changedTouches[0].clientY;

    if (touchY > curTouchY) goToNextSection();
    else goToPrevSection();
  };

  /**
   * GO to the next or previous section based on
   * the mouse wheel direction.
   * @param {MouseEvent} event
   * @return {void}
   */
  const handleMouseWheel = (event) => {
    if (isMediumScreen() || scrollingLudicrouslyFast()) return;

    switch (Math.sign(event.deltaY)) {
      case 1:
        return goToNextSection();
      case -1:
        return goToPrevSection();
    }
  };

  /**
   * When the window is resized, recalculate the
   * position of the current section.
   * @return {void}
   */
  const handleResize = () => debounce(recalcSection, 200)();

  /**
   * Hijack scrolling.
   * @param {Event} event
   * @return {void}
   */
  const maybeScrollJack = (event) => {
    if (isMediumScreen() || !event) return;

    const SPACEBAR = [' ', 'Spacebar'];
    const isCommandKey = () => isMacintosh() && event.metaKey;
    const downwardKeys = ['Down', ...SPACEBAR, 'ArrowDown', 'Right', 'PageDown', 'ArrowRight'];
    const upwardKeys = ['Up', 'ArrowUp', 'Left', 'PageUp', 'ArrowLeft'];
    const isScrollableElemFocused = [window.document.body, window.document.documentElement].includes(event.target);

    const inEventPath = (predicate) =>
      getEventPath(event)
        .filter((el) => el instanceof HTMLElement)
        .some(predicate);

    const isNavFocused = inEventPath((el) => el && el.id === NAVIGATION_ID);
    const isSectionFocused = inEventPath((el) => el && el.dataset.section);
    const isFormFocused = inEventPath((el) => el && el.tagName === 'FORM');

    if (isFormFocused || scrollingLudicrouslyFast(500) || !(isNavFocused || isSectionFocused || isScrollableElemFocused)) {
      return;
    }

    if (downwardKeys.includes(event.key)) {
      event.preventDefault();
      isCommandKey() ? goToLastSection() : goToNextSection();
    } else if (upwardKeys.includes(event.key)) {
      event.preventDefault();
      isCommandKey() ? goToFirstSection() : goToPrevSection();
    } else if (event.key === 'Home') {
      event.preventDefault();
      goToFirstSection();
    } else if (event.key === 'End') {
      event.preventDefault();
      goToLastSection();
    }
  };

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (themes.find((t) => t.name === theme)) {
      setCurTheme(theme);
      document.documentElement.dataset.theme = theme;
    }

    console.log(
      `
%c  %c
%cPeter's Portfolio
%cv${version} \u2022 Made with ❤️ by Peter Hanania
`,
      'background: none;',
      'background: none;',
      'color: #888; font-size: 40px;',
      'color: #666; font-size: 20px;'
    );
    console.log(
      '%cYou seem interested in my site. Have fun looking around :) (Try not to copy too much)',
      'color: #4c77e5;font-size:15px; font-weight: bold;'
    );

    calculateScreens();

    const { documentElement } = document;

    isMediumScreen() || wait(1, maybeRestoreSection);

    window.addEventListener('resize', handleResize);
    document.addEventListener('keydown', maybeScrollJack);
    document.addEventListener('touchstart', handleTouchstart);
    document.addEventListener('touchmove', handleTouchmove, {
      passive: false
    });
    documentElement.addEventListener('wheel', handleMouseWheel, false);
    documentElement.addEventListener('mousewheel', handleMouseWheel, false);

    const initialSection = window.location.hash.slice(1);
    if (initialSection) {
      setTimeout(() => {
        goToSection({ node: getSection(initialSection), smooth: true });
      }, 400);
    }

    return () => {
      const { documentElement: docElem } = document;

      window.removeEventListener('resize', handleResize);
      document.removeEventListener('keydown', maybeScrollJack);
      docElem.removeEventListener('wheel', handleMouseWheel, false);
      docElem.removeEventListener('mousewheel', handleMouseWheel, false);
      document.removeEventListener('touchstart', handleTouchstart);
      document.removeEventListener('touchmove', handleTouchmove);
    };
  }, []);

  return (
    <>
      <NavigationComponent
        current_section={globalSection}
        scrollToTop={() => {
          if (window.innerWidth <= 768) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            (document.querySelector(`[aria-label="Visit ${SECTIONS[0]}"]`) as HTMLElement)?.click();
          }
        }}
        toggleNav={() => {
          const navOpen = document.documentElement.dataset.navOpen === 'true';
          document.documentElement.dataset.navOpen = String(!navOpen);
        }}
        current_theme={curTheme}
        set_theme={(theme) => {
          document.documentElement.dataset.theme = theme;
          localStorage.setItem('theme', theme);
          setCurTheme(theme);
        }}
      />
      <main id="peterhanania_content" tabIndex={-1}>
        <AboutComponent name={SECTIONS[0]} aria={isSectionHidden(SECTIONS[0])} />
        <IntroductionComponent current_section={globalSection} name={SECTIONS[1]} aria={isSectionHidden(SECTIONS[1])} />{' '}
        <ExperienceComponent name={SECTIONS[2]} aria={isSectionHidden(SECTIONS[2])} />{' '}
        <ProjectsComponent name={SECTIONS[3]} aria={isSectionHidden(SECTIONS[3])} />
        <ComissionsComponent name={SECTIONS[4]} aria={isSectionHidden(SECTIONS[4])} />{' '}
      </main>
      <div className={'socials'}>
        <ul>
          <li className={'hover'}>
            <Tooltip animation="scale" position="right" arrow={true} html={'Discord'}>
              {' '}
              <a href="https://discord.com/users/710465231779790849" aria-label="Discord" target="_blank" rel="noreferrer">
                <svg
                  width="64px"
                  height="64px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="currentColor"
                  aria-label="Discord Logo"
                  alt={'Discord Logo'}
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                  <g id="SVGRepo_iconCarrier">
                    {' '}
                    <path
                      d="M18.8943 4.34399C17.5183 3.71467 16.057 3.256 14.5317 3C14.3396 3.33067 14.1263 3.77866 13.977 4.13067C12.3546 3.89599 10.7439 3.89599 9.14391 4.13067C8.99457 3.77866 8.77056 3.33067 8.58922 3C7.05325 3.256 5.59191 3.71467 4.22552 4.34399C1.46286 8.41865 0.716188 12.3973 1.08952 16.3226C2.92418 17.6559 4.69486 18.4666 6.4346 19C6.86126 18.424 7.24527 17.8053 7.57594 17.1546C6.9466 16.92 6.34927 16.632 5.77327 16.2906C5.9226 16.184 6.07194 16.0667 6.21061 15.9493C9.68793 17.5387 13.4543 17.5387 16.889 15.9493C17.0383 16.0667 17.177 16.184 17.3263 16.2906C16.7503 16.632 16.153 16.92 15.5236 17.1546C15.8543 17.8053 16.2383 18.424 16.665 19C18.4036 18.4666 20.185 17.6559 22.01 16.3226C22.4687 11.7787 21.2836 7.83202 18.8943 4.34399ZM8.05593 13.9013C7.01058 13.9013 6.15725 12.952 6.15725 11.7893C6.15725 10.6267 6.98925 9.67731 8.05593 9.67731C9.11191 9.67731 9.97588 10.6267 9.95454 11.7893C9.95454 12.952 9.11191 13.9013 8.05593 13.9013ZM15.065 13.9013C14.0196 13.9013 13.1652 12.952 13.1652 11.7893C13.1652 10.6267 13.9983 9.67731 15.065 9.67731C16.121 9.67731 16.985 10.6267 16.9636 11.7893C16.9636 12.952 16.1317 13.9013 15.065 13.9013Z"
                      stroke="currentColor"
                      strokeLinejoin="round"
                    />{' '}
                  </g>
                </svg>
              </a>
            </Tooltip>
          </li>
          <li className={'hover'}>
            <Tooltip animation="scale" position="right" arrow={true} html={'GitHub'}>
              {' '}
              <a href="https://github.com/peterhanania" aria-label="GitHub" target="_blank" rel="noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-label="Github Logo"
                  alt={'Github Logo'}
                >
                  <title>GitHub</title>
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
            </Tooltip>
          </li>

          <li className={'hover'}>
            {' '}
            <Tooltip animation="scale" position="right" arrow={true} html={'LinkedIn'}>
              <a href="https://www.linkedin.com/in/peterhanania" aria-label="Linkedin" target="_blank" rel="noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-label="LinkedIn Logo"
                >
                  <title>LinkedIn</title>
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x={2} y={9} width={4} height={12} />
                  <circle cx={4} cy={4} r={2} />
                </svg>
              </a>
            </Tooltip>
          </li>
        </ul>
      </div>
      <div className={'navigation_showcase'}>
        {SECTIONS.map((section, index) => (
          <div
            tabIndex={0}
            role="button"
            aria-label={'Visit ' + section}
            key={index}
            onClick={
              globalSection === section
                ? undefined
                : () => {
                    goToSection({
                      node: getSection(section)
                    });
                  }
            }
          >
            <div className={`${globalSection === section ? 'active' : 'not-active hover'}`} />
          </div>
        ))}
      </div>
      <Cursor />
      {!starBannerDismissed && (
        <div className="star-banner" role="complementary" aria-label="Star this repository">
          <a
            href="https://github.com/peterhanania/portfolio"
            target="_blank"
            rel="noreferrer"
            className="star-banner__link"
            aria-label="Star this repository on GitHub — it means a lot"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="star-banner__icon">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span>Star this repo — it means a lot!</span>
          </a>
          <button className="star-banner__close" onClick={dismissStarBanner} aria-label="Dismiss star request">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1={18} y1={6} x2={6} y2={18} />
              <line x1={6} y1={6} x2={18} y2={18} />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
