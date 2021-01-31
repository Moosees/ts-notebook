import Editor from '@uiw/react-md-editor';
import { useEffect, useRef, useState } from 'react';
import './text-editor.css';

const TextEditor: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (ref.current && e.target && ref.current.contains(e.target as Node))
        return;

      setIsEditing(false);
    };

    document.addEventListener('click', clickOutside, { capture: true });
    return () =>
      document.removeEventListener('click', clickOutside, { capture: true });
  }, []);

  return (
    <div onClick={() => setIsEditing(true)} ref={ref}>
      {isEditing ? (
        <Editor value="" />
      ) : (
        <Editor.Markdown source={'# Header'} />
      )}
    </div>
  );
};

export default TextEditor;
