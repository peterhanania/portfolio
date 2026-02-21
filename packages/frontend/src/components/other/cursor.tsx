import { useEffect, useRef } from 'preact/hooks';

const Cursor = () => {
  const cursorRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const rafId = useRef<number>();

  useEffect(() => {
    const [c1, c2, c3] = cursorRefs.current;

    if (!c1 || !c2 || !c3) return;

    let lastX = 0;
    let lastY = 0;
    let isHovered = false;

    function updateCursorPosition() {
      if (!c1 || !c2 || !c3) return;

      c1.style.transform = `translate(${lastX}px, ${lastY}px)`;
      c2.style.transform = `translate(${lastX}px, ${lastY}px)`;
      c3.style.transform = `translate(${lastX}px, ${lastY}px)`;

      rafId.current = requestAnimationFrame(updateCursorPosition);
    }

    function handleMouseMove(event: MouseEvent) {
      lastX = event.clientX;
      lastY = event.clientY;
    }

    function handleMouseOver() {
      if (isHovered) return;
      isHovered = true;
      c2?.classList.add('hover');
      c3?.classList.add('hover');
    }

    function handleMouseOut() {
      if (!isHovered) return;
      isHovered = false;
      c2?.classList.remove('hover');
      c3?.classList.remove('hover');
    }

    // Use event delegation for hover events
    function handleMouseOverDelegated(e: MouseEvent) {
      if ((e.target as HTMLElement).classList.contains('hover')) {
        handleMouseOver();
      }
    }

    function handleMouseOutDelegated(e: MouseEvent) {
      if ((e.target as HTMLElement).classList.contains('hover')) {
        handleMouseOut();
      }
    }

    document.body.addEventListener('mouseover', handleMouseOverDelegated);
    document.body.addEventListener('mouseout', handleMouseOutDelegated);
    document.body.addEventListener('mousemove', handleMouseMove);
    rafId.current = requestAnimationFrame(updateCursorPosition);

    return () => {
      document.body.removeEventListener('mouseover', handleMouseOverDelegated);
      document.body.removeEventListener('mouseout', handleMouseOutDelegated);
      document.body.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <div>
      <div className="cursor" ref={(el) => (cursorRefs.current[0] = el)}></div>
      <div className="cursor2" ref={(el) => (cursorRefs.current[1] = el)}></div>
      <div className="cursor3" ref={(el) => (cursorRefs.current[2] = el)}></div>
    </div>
  );
};

export default Cursor;
