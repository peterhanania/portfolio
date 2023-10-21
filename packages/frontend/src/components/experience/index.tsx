import technologies from '../../../constants/technologies';
import AccessibleButton from '../../accessibility/button';
import { cloneElement } from 'preact';
import { Tooltip } from 'react-tippy';

export default function ({ aria, name }: { aria: boolean; name: string }) {
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        fontSize: '2rem',
        color: 'white',
        fontWeight: 'bold',
        position: 'relative'
      }}
      content-hidden={aria}
      data-section={name}
      tabIndex={-1}
    >
      <h1 className="subheading">My Experience</h1>
      <article className="language-container">
        <div>
          <p className="light-text">Here is a little bit about </p>
          <span className="subtitle">languages and technologies, that I am currently using.</span>
        </div>
        <div>
          <p className="light-text">Mastering</p>
          <p className="subtitle">Next.js</p>
        </div>
        <div>
          <p className="light-text">Expert in</p>
          <p className="subtitle">NestJS</p>
        </div>
        <div>
          <p className="light-text">Exploring</p>
          <p className="subtitle">Java</p>
        </div>
        <div>
          <p className="light-text">Learning</p>
          <p className="subtitle">Go</p>
        </div>
        <div>
          <p className="light-text">Passionate about</p>
          <p className="subtitle">Redis</p>
        </div>
        <div>
          <p className="light-text">Devoted to</p>
          <p className="subtitle">PostgreSQL</p>
        </div>
        <div>
          <p className="light-text">Enthusiast of</p>
          <p className="subtitle">Typescript</p>
        </div>

        <div>
          <AccessibleButton
            name={'Check out my GitHub'}
            label={'Check out my GitHub'}
            intent="primary/small"
            href="https://github.com/peterhanania"
          />
        </div>
      </article>
      <div className={'technologies_wrapper'}>
        <h1 className="subheading">Technologies I use</h1>
        <div className={'technologies'}>
          {technologies.map((technology, index) => (
            <div key={index}>
              <Tooltip
                position="top"
                arrow={true}
                animation="scale"
                html={
                  <div className="flex flex-col gap-2 p-2">
                    <span className="text-sm font-bold">{technology.label}</span>
                  </div>
                }
              >
                <div>
                  {cloneElement(technology.icon, {
                    className: 'icon',
                    'aria-label': technology.label,
                    title: technology.label
                  })}
                </div>
              </Tooltip>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
