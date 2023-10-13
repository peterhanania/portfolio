import { useEffect } from 'preact/hooks';

const Cursor = () => {
  useEffect(() => {
    const c1 = document.getElementById('c1');
    const c2 = document.getElementById('c2');
    const c3 = document.getElementById('c3');

    if (!c1 || !c2 || !c3) {
      return; // Exit if the elements are not found
    }

    function handleMouseMove(event) {
      const { clientX, clientY } = event;
      c1.style.left = `${clientX}px`;
      c1.style.top = `${clientY}px`;

      c2.style.left = `${clientX}px`;
      c2.style.top = `${clientY}px`;

      c3.style.left = `${clientX}px`;
      c3.style.top = `${clientY}px`;
    }

    function handleMouseOver() {
      c2.classList.add('hover');
      c3.classList.add('hover');
    }

    function handleMouseOut() {
      c2.classList.remove('hover');
      c3.classList.remove('hover');
    }

    document.body.addEventListener('mousemove', handleMouseMove);

    const hoverElements = document.querySelectorAll('.hover');
    hoverElements.forEach((element) => {
      element.addEventListener('mouseover', handleMouseOver);
      element.addEventListener('mouseout', handleMouseOut);
    });


    return () => {
      document.body.removeEventListener('mousemove', handleMouseMove);
      hoverElements.forEach((element) => {
        element.removeEventListener('mouseover', handleMouseOver);
        element.removeEventListener('mouseout', handleMouseOut);
      });
    };
  }, []);

  return (
    <div>
      <div className="cursor" id="c1"></div>
      <div className="cursor2" id="c2"></div>
      <div className="cursor3" id="c3"></div>
    </div>
  );
};

export default Cursor;
