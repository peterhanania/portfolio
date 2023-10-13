import { useEffect, useState } from 'preact/hooks';

export default function ({ aria, name, current_section }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (current_section !== 'About') return;

    function checkVisibility() {
      const element = document.querySelector('.headline-container');
      if (element) {
        const rect = element.getBoundingClientRect();
        setVisible(
          rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <=
              (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <=
              (window.innerWidth || document.documentElement.clientWidth)
        );
      }
    }

    window.addEventListener('scroll', checkVisibility);

    const headlineSpans = document.querySelectorAll('.headline-text span');

    if (visible) {
      headlineSpans.forEach((span, index) => {
        setTimeout(() => {
          (span as HTMLElement).style.opacity = '1';
        }, index * 200);
      });
    }

    function countUp(elementId, endValue, duration) {
      let start = 0;
      const element = document.getElementById(elementId);
      if (!element) return;
      const intervalTime = duration / Math.abs(endValue - start);
      const timer = setInterval(() => {
        if (start >= endValue) {
          clearInterval(timer);
        }
        element.innerHTML = String(start);
        start++;
      }, intervalTime);
    }

    countUp('experience', 5, 500);
    countUp('projects', 25, 500);

    return () => {
      window.removeEventListener('scroll', checkVisibility);
    };
  }, [current_section, visible]);

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        fontSize: '2rem',
        color: 'transparent',
        fontWeight: 'bold'
      }}
      content-hidden={aria}
      data-section={name}
      tabIndex={-1}
    >
      <h1 className="subheading">About Me</h1>
      <p className="headline-container headline-text">
        <span>I'm</span>
        <span>a</span>
        <span class="underline">passionate</span>
        <span class="underline">full-stack</span>
        <span class="underline">web</span>
        <span class="underline">developer</span>
        <span>committed</span>
        <span>to</span>
        <span>building</span>
        <span class="underline">innovative</span>
        <span>and</span>
        <span class="underline">creative</span>
        <span>websites</span>
      </p>
      <div className="statistics">
        <div className="group">
          <span className="number" id="experience">
            5
          </span>
          <span className="text">YEARS EXPERIENCE</span>
        </div>
        <div className="group">
          <span className="number" id="projects">
            25+
          </span>
          <span className="text">PROJECTS COMPLETED</span>
        </div>
      </div>
    </section>
  );
}
