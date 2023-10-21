import pkg from '../../../../../package.json';
import { useEffect } from 'preact/hooks';

const version = pkg.version;
const links = [
  {
    name: 'Experience'
  },
  {
    name: 'Comissions'
  },
  {
    name: 'Projects'
  }
];

export default function ({ current_section, scrollToTop, toggleNav }: { current_section: string; scrollToTop: () => void; toggleNav: () => void }) {
  useEffect(() => {
    const menu = document.querySelector('.mi');
    const menuItems = document.querySelectorAll('.nav-li');
    const body = document.body;

    if (!menu || !menuItems || !body) return;

    menu.addEventListener('click', () => {
      toggleNav();
    });

    menuItems.forEach((item) => {
      item.addEventListener('mouseover', () => {
        const music = document.getElementById('hau') as HTMLAudioElement;
        music.play();
      });

      item.addEventListener('mouseout', () => {
        const music = document.getElementById('hau') as HTMLAudioElement;
        music.pause();
        music.currentTime = 0;
      });
    });

    return () => {
      menu.removeEventListener('click', () => {
        toggleNav();
      });

      menuItems.forEach((item) => {
        item.removeEventListener('mouseover', () => {
          const music = document.getElementById('hau') as HTMLAudioElement;
          music.play();
        });

        item.removeEventListener('mouseout', () => {
          const music = document.getElementById('hau') as HTMLAudioElement;
          music.pause();
          music.currentTime = 0;
        });
      });
    };
  }, []);

  return (
    <>
      <audio id="hau" src="audio/audio.ogg" preload="auto"></audio>
      <div className="nav">
        <div className="nav-c">
          <ul className="nav__list">
            {links.map((link) => (
              <li
                onClick={() => {
                  if (current_section !== link.name) {
                    toggleNav();

                    if (window.innerWidth <= 768) {
                      const linkSection = document.querySelector(`[data-section="${link.name}"]`);
                      if (linkSection) {
                        linkSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    } else {
                      (document.querySelector(`[aria-label="Visit ${link.name}"]`) as HTMLElement)?.click();
                    }
                  }
                }}
                className={'nav-li ' + (current_section === link.name ? 'active' : '')}
              >
                <a
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  href={`/${link.name}`}
                  className="hover"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <footer>
            <p className={'subheading'}>
              v{version} — made with <span>❤️</span> by{' '}
              <a href={'https://github.com/peterhanania'} target={'_blank'} rel={'noopener noreferrer'}>
                Peter Hanania
              </a>
            </p>
            <p className={'subheading'}>© Peter {new Date().getFullYear()}. All rights reserved.</p>
          </footer>
        </div>
      </div>
      <nav>
        <div role="button" tabIndex={0} aria-label="Visit Menu" onClick={scrollToTop}>
          <svg
            width={106}
            height={112}
            viewBox="0 0 106 112"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={'hover'}
            aria-label="Visit Menu Icon"
          >
            <g clipPath="url(#clip0_366_81)">
              <path d="M27 82.1111C27 80.3929 28.3929 79 30.1111 79H58V81C58 98.1208 44.1208 112 27 112V82.1111Z" fill="white" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 0H74.8889C92.0711 0 106 13.9289 106 31.1111V32.9863L106 39.379V41.2542C106 58.4364 92.0709 72.3653 74.8887 72.3653H27.0887V70.4901C27.0887 53.3226 40.9938 39.4028 58.1558 39.379H75.4793C75.4843 39.379 75.4893 39.379 75.4943 39.379H76.0845V39.3218C77.5604 39.0389 78.6757 37.741 78.6757 36.1827C78.6757 34.6243 77.5604 33.3264 76.0845 33.0435V32.9863L31.1111 32.9863C13.9289 32.9863 0 19.0574 0 1.87521V0Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_366_81">
                <rect width={106} height={112} fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>

        <div className="h-wr">
          <div className="h-wr-r opacity-hover-effect">
            <div className="mi hover" role="button" tabIndex={0} aria-label="Toggle Navigation">
              <span className="m-i m-i-left" />
              <span className="m-i" />
              <span className="m-i m-i-right" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
