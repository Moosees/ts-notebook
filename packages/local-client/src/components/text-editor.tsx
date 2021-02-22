import Editor from '@uiw/react-md-editor';
import { useEffect, useRef, useState } from 'react';
import { useTypedAction } from '../hooks/use-typed-action';
import { Cell } from '../redux';
import './text-editor.css';

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const { updateCell } = useTypedAction();

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
    <div
      onClick={() => setIsEditing(true)}
      ref={ref}
      className="md-editor-container card"
    >
      {isEditing ? (
        <Editor
          value={cell.content}
          onChange={(v) => updateCell(cell.id, v || '')}
        />
      ) : (
        <div className="card-content">
          <Editor.Markdown source={cell.content || '*Click to edit...*'} />
        </div>
      )}
    </div>
  );
};

export default TextEditor;
