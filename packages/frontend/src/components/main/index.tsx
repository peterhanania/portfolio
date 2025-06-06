import AccessibleButton from '../../accessibility/button';
import FlippingText from './FlippingText';
import animationData from './arrows.json';
import Lottie from 'react-lottie-player';

export default function ({ aria, name }: { aria: boolean; name: string }) {
  return (
    <section id="main" content-hidden={aria} data-section={name} tabIndex={-1}>
      <article
        className="container"
        style={{
          marginTop: '-10vh'
        }}
      >
        <div className={'gradient-background'}></div>
        <div className="rotating-image-wrapper">
          <img
            className="image-1"
            src="/images/rANDerecloRPErsonQuatEL/1.webp"
            alt="Peter Hanania profile memoji number 1"
            draggable={false}
            width={200}
            height={200}
          />
          <img
            className="image-2"
            src="/images/rANDerecloRPErsonQuatEL/2.webp"
            alt="Peter Hanania profile memoji number 2"
            draggable={false}
            width={200}
            height={200}
          />
          <img
            className="image-3"
            src="/images/rANDerecloRPErsonQuatEL/3.webp"
            alt="Peter Hanania profile memoji number 3"
            draggable={false}
            width={200}
            height={200}
          />
        </div>
        <div className="header-title">
          <h3
            style={{
              letterSpacing: '0.1em',
              color: 'transparent',
              WebkitTextStroke: '2px #eeeeee',
              paddingLeft: '0.35em',
              background: 'unset',
              backgroundColor: 'unset',
              animation: 'none',
              backgroundImage: 'none',
              fontSize: 'clamp(1rem, 2rem, 2.8rem)',
              translate: 'none',
              rotate: 'none',
              scale: 'none',
              opacity: 1,
              marginBottom: '2rem',
              marginTop: '1rem',
              transform: 'translate(0px, 0px)'
            }}
            className="header-title-text"
          >
            {' '}
            <span className="subtitle" style={{ marginRight: '0.3em' }}>
              Hey, my name is
            </span>
            <span>PETER HANANIA</span>
          </h3>
          <FlippingText
            words={[
              'I build things for the Web.',
              'I create meaningful experiences.',
              'I craft elegant web solutions.',
              'I build performant web apps.'
            ]}
          />
        </div>

        <div className="text-center" style={{ marginTop: '3rem' }}>
          <div className="button-container">
            <AccessibleButton
              name={'Hire Me'}
              label={'Hire Me'}
              intent="primary"
              onClick={() => {
                if (window.innerWidth <= 768) {
                  const comissions = document.querySelector('[data-section="Comissions"]');
                  if (comissions) {
                    comissions.scrollIntoView({ behavior: 'smooth' });
                  }
                } else {
                  (document.querySelector(`[aria-label="Visit Comissions"]`) as HTMLElement)?.click();
                }
              }}
            />
          </div>
        </div>

        <div className="nav-index footer">
          <div
            style={{
              position: 'absolute',
              left: '50px',
              top: '50%',
              transform: 'translateY(-50%)'
            }}
            className="lottie-container-1"
          >
            <Lottie loop play animationData={animationData} style={{ width: 200, height: 200 }} />
          </div>

          <div
            style={{
              display: 'inline-block',
              width: '180px',
              height: '1px',
              backgroundColor: '#ddd',
              verticalAlign: 'middle',
              marginRight: '15px'
            }}
            className="separator"
          ></div>

          <span
            style={{
              color: 'white',
              fontSize: '20px',
              letterSpacing: '1px'
            }}
            className="text"
          >
            EXPLORE THE SCROLL
          </span>

          <div
            style={{
              display: 'inline-block',
              width: '180px',
              height: '1px',
              backgroundColor: '#ddd',
              verticalAlign: 'middle',
              marginLeft: '15px'
            }}
            className="separator"
          ></div>

          <div
            style={{
              position: 'absolute',
              right: '50px',
              top: '50%',
              transform: 'translateY(-50%)'
            }}
            className="lottie-container-2"
          >
            <Lottie loop play animationData={animationData} style={{ width: 200, height: 200 }} />
          </div>
        </div>
      </article>
    </section>
  );
}
