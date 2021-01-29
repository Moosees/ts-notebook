import { useMemo } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizable.css';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ children, direction }) => {
  const props: ResizableBoxProps = useMemo(
    () =>
      direction === 'horizontal'
        ? {
            className: 'react-resizable-horizontal',
            resizeHandles: ['e'],
            width: window.innerWidth * 0.6,
            height: Infinity,
            maxConstraints: [window.innerWidth * 0.8, Infinity],
            minConstraints: [100, Infinity],
          }
        : {
            className: 'react-resizable-vertical',
            resizeHandles: ['s'],
            width: Infinity,
            height: 500,
            maxConstraints: [Infinity, window.innerHeight * 0.8],
            minConstraints: [Infinity, 24],
          },
    [direction]
  );

  return <ResizableBox {...props}>{children}</ResizableBox>;
};

export default Resizable;
