import AccessibleButton from '../../accessibility/button';

const services = [
  'Web Hosting',
  'Domain Management',
  'Coding Consultation',
  'VPS Setup',
  'Frontend Development',
  'Backend Development',
  'Mobile App Development',
  'Database Management',
  'SEO Optimization'
];

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
      <h1 className="subheading">Hire Me</h1>
      <div className="comissions_section">
        <h2 className="light-text text-header-comissions">Ready to build your next big thing?</h2>
        <p className="text-subheader-comissions">With passion and expertise, I turn ideas into reality. Let's innovate together.</p>
        <div className={'flex-center'}>
          <div className="hire-container">
            {services.map((service, index) => (
              <div key={index}>
                <p className="subtitle">{service}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={'contact-container'}>
          <div>
            <h2>Discord</h2>
            <p>peterhanania</p>
            <AccessibleButton
              name={'Hit me up on Discord'}
              label={'Hit me up on Discord'}
              intent="primary/xs"
              href="https://discord.com/users/710465231779790849"
            />
          </div>
          <div>
            <h2>Email</h2>
            <p>peter@peterhanania.com</p>
            <AccessibleButton name={'Send me an email'} label={'Send me an email'} intent="primary/xs" href="mailto:peter@peterhanania.com" />
          </div>
          <div>
            <h2>LinkedIn</h2>
            <p>in/peterhanania</p>
            <AccessibleButton
              name={'Connect with me'}
              label={'Connect with me on LinkedIn'}
              intent="primary/xs"
              href="https://www.linkedin.com/in/peterhanania/"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
