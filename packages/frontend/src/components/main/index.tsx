import AccessibleButton from '../../accessibility/button';

export default function ({ aria, name }: { aria: boolean; name: string }) {
  return (
    <section id="main" content-hidden={aria} data-section={name} tabIndex={-1}>
      <article className="container">
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
          <p className="subtitle">Hi, I'm Peter Hanania</p>
          <h1>I build things for the Web.</h1>
        </div>
        <div className="description-container">
          <p className="subtitle">
            I am a Full-Stack developer living in Canada working remotely with
            the whole world.
          </p>
        </div>
        <div className="text-center">
          <div className="button-container">
            <AccessibleButton
              name={'Hire Me'}
              label={'Hire Me'}
              intent="primary"
              onClick={
                ()=>{
                  if(window.innerWidth <= 768){
                   
                    const comissions = document.querySelector('[data-section="Comissions"]');
                    if(comissions){
                      comissions.scrollIntoView({behavior: "smooth"});
                    }

                  }
                  else {
                     (document.querySelector(
                   `[aria-label="Visit Comissions"]`
                   ) as HTMLElement
                   )?.click();
                  }
                }
              }
            />
          </div>
        </div>
      </article>
    </section>
  );
}
