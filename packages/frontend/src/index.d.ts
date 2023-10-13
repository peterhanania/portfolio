declare module 'react-tippy' {
  import { h } from 'preact';

  interface TooltipProps {
    title?: string;
    disabled?: boolean;
    open?: boolean;
    useContext?: boolean;
    onRequestClose?: () => void;
    position?: Position;
    trigger?: Trigger;
    tabIndex?: number;
    interactive?: boolean;
    interactiveBorder?: number;
    delay?: number;
    hideDelay?: number;
    animation?: string;
    arrow?: boolean;
    arrowSize?: Size;
    animateFill?: boolean;
    duration?: number;
    hideDuration?: number;
    distance?: number;
    offset?: number;
    hideOnClick?: boolean | 'persistent';
    multiple?: boolean;
    followCursor?: boolean;
    inertia?: boolean;
    transitionFlip?: boolean;
    popperOptions?: any;
    html?: React.ReactElement<any>;
    unmountHTMLWhenHide?: boolean;
    size?: Size;
    sticky?: boolean;
    stickyDuration?: boolean;
    beforeShown?: () => void;
    shown?: () => void;
    beforeHidden?: () => void;
    hidden?: () => void;
    theme?: Theme;
    className?: string;
    style?: React.CSSProperties;
  }

  const Tooltip: FunctionalComponent<TooltipProps>;
  export default class Tooltip {}
}
