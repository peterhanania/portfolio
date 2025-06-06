import technologies from '../../../constants/technologies';
import AccessibleButton from '../../accessibility/button';
import { cloneElement } from 'preact';
import { Tooltip } from 'react-tippy';

const ExternalLinkIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="external-link-icon"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15,3 21,3 21,9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const ProjectCard = ({
  position,
  company,
  experienceThumbnail,
  stackIcons,
  website_url
}: {
  position: string;
  company: string;
  website_url: string;
  experienceThumbnail: JSX.Element;
  stackIcons: {
    element: JSX.Element;
    tooltip: string;
  }[];
}) => (
  <a className="card-wrapper hover project-card-link" target={'_blank'} tabIndex={0} href={website_url}>
    <article className="card-content">
      {experienceThumbnail}
      <div className="text-content">
        <p className="role-text">{position}</p>
        <h2 className="company-name subtitle">{company}</h2>
        <hr className="separator" />
        <div className="stackIcons-container">
          {stackIcons.map((icon) => (
            <Tooltip
              position="top"
              arrow={true}
              animation="scale"
              html={
                <div className="flex flex-col gap-2 p-2">
                  <span className="text-sm font-bold">{icon.tooltip}</span>
                </div>
              }
            >
              {cloneElement(icon.element, {
                className: 'icon',
                'aria-label': icon.tooltip,
                title: icon.tooltip
              })}
            </Tooltip>
          ))}
        </div>
      </div>
    </article>
    <div className="external-link-popup">
      <Tooltip
        position="left"
        arrow={true}
        animation="scale"
        html={
          <div className="flex flex-col gap-2 p-2">
            <span className="text-sm font-bold">Visit Project</span>
          </div>
        }
      >
        <div className="external-link-container">
          <ExternalLinkIcon />
        </div>
      </Tooltip>
    </div>
  </a>
);

const Jira = technologies.find((tech) => tech.label === 'Jira')?.icon;
const NextJS = technologies.find((tech) => tech.label === 'Next.js')?.icon;
const Pulumi = technologies.find((tech) => tech.label === 'Pulumi')?.icon;
const PostgreSQL = technologies.find((tech) => tech.label === 'PostgreSQL')?.icon;
const Framer = technologies.find((tech) => tech.label === 'Framer Motion')?.icon;
const TailwindCSS = technologies.find((tech) => tech.label === 'TailwindCSS')?.icon;
const Docker = technologies.find((tech) => tech.label === 'Docker')?.icon;
const AWS = technologies.find((tech) => tech.label === 'AWS')?.icon;

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
        fontWeight: 'bold'
      }}
      content-hidden={aria}
      data-section={name}
      tabIndex={-1}
    >
      <h1 className="subheading">What I've been working on recently</h1>
      <div className="experience-card-container">
        <ProjectCard
          position={'Founder & CTO'}
          company={'Revisir'}
          website_url="https://revisir.com"
          experienceThumbnail={
            <div
              className="image-container"
              style={{
                position: 'relative',
                minWidth: '300px'
              }}
            >
              <div
                style={{
                  display: 'contents'
                }}
              >
                <div
                  style={{
                    aspectRatio: '1 / 1',
                    flex: 'none',
                    height: '157px',
                    left: '50%',
                    overflow: 'visible',
                    position: 'absolute',
                    top: '47%',
                    transform: 'translate(-50%, -50%)',
                    width: '157px',
                    zIndex: 0
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      borderRadius: 'inherit',
                      inset: '0px'
                    }}
                  >
                    <img
                      decoding="async"
                      loading="lazy"
                      width="512"
                      height="512"
                      src="https://framerusercontent.com/images/wvbxOPNeSYDVJMPTxZO7FFe4cfk.png"
                      alt=""
                      style={{
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        borderRadius: 'inherit',
                        objectPosition: 'center center',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  filter: 'contrast(1) hue-rotate(271deg) saturate(2)',
                  flex: 'none',
                  mixBlendMode: 'overlay',
                  position: 'relative',
                  willChange: 'transform',
                  transform: 'translateY(-10vh)'
                }}
                className="video-container"
              >
                <video
                  src="/video/xCdGYDr1X6UdyIUEfIEQKJckggc.mp4"
                  loop
                  preload="auto"
                  playsInline
                  muted
                  style={{
                    cursor: 'pointer',
                    width: '100%',
                    height: '100%',
                    borderRadius: '0px',
                    display: 'block',
                    objectFit: 'scale-down',
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    objectPosition: '50% 50%'
                  }}
                  autoPlay
                />
              </div>
            </div>
          }
          stackIcons={[
            {
              element: NextJS,
              tooltip: 'Next.js'
            },
            {
              element: Pulumi,
              tooltip: 'Pulumi'
            },
            {
              element: PostgreSQL,
              tooltip: 'PostgreSQL'
            },
            {
              element: Framer,
              tooltip: 'Framer'
            },
            {
              element: TailwindCSS,
              tooltip: 'Tailwind CSS'
            },
            {
              element: Docker,
              tooltip: 'Docker'
            },
            {
              element: Jira,
              tooltip: 'Jira'
            },
            {
              element: AWS,
              tooltip: 'AWS'
            }
          ]}
        />
      </div>

      <div className={'projects_more flex-center'}>
        <p className={'subheading'}>Liking what you see?</p>
        <AccessibleButton name={'Check out my GitHub'} label={'Check out my GitHub'} intent="primary/xs" href="https://github.com/peterhanania" />
      </div>
    </section>
  );
}
