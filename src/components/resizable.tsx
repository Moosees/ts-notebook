import { ResizableBox } from 'react-resizable';
import './resizable.css';

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizableProps> = ({ children, direction }) => {
  // const options = {
  //   resizeHandles: [direction === 'horizontal' ? 'e' : 's'],
  //   height: direction === 'horizontal' ? 400 : 400,
  //   width: direction === 'horizontal' ? 400 : 400,
  // };

  return (
    <ResizableBox resizeHandles={['s']} width={1000} height={500}>
      {children}
    </ResizableBox>
  );
};

export default Resizable;
