import { useEffect, useState } from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizable.css';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ children, direction }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [resizeWidth, setResizeWidth] = useState(window.innerWidth * 0.6);

  useEffect(() => {
    let timeout: any;
    const updateWidth = () => {
      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        const resizeRatio = resizeWidth / windowWidth;
        setWindowWidth(window.innerWidth);
        setResizeWidth(window.innerWidth * resizeRatio);
      }, 100);
    };
    window.addEventListener('resize', updateWidth);
    return () => {
      if (timeout) clearTimeout(timeout);
      window.removeEventListener('resize', updateWidth);
    };
  }, [resizeWidth, windowWidth]);

  const props: ResizableBoxProps =
    direction === 'horizontal'
      ? {
          className: 'react-resizable-horizontal',
          resizeHandles: ['e'],
          width: resizeWidth,
          height: Infinity,
          maxConstraints: [windowWidth * 0.85, Infinity],
          minConstraints: [50, Infinity],
          onResizeStop: (_e, data) => {
            setResizeWidth(data.size.width);
          },
        }
      : {
          className: 'react-resizable-vertical',
          resizeHandles: ['s'],
          width: Infinity,
          height: 400,
          maxConstraints: [Infinity, Infinity],
          minConstraints: [Infinity, 24],
        };

  return <ResizableBox {...props}>{children}</ResizableBox>;
};

export default Resizable;
