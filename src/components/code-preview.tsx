import { useEffect, useRef } from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import './code-preview.css';

interface PreviewProps {
  id: string;
}

const iframeScrDoc = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          const handleError = (error) => {
            const errorHTML = '<div><h4 style="color: red;">Error!</h4>'+error+'</div>';
            document.querySelector('#root').innerHTML = errorHTML;
            console.error(error);
          };
          window.addEventListener('error', (e) => {
            e.preventDefault();
            handleError(e.message);
          });
          window.addEventListener('message', (e) => {
            if(e.data.message) throw new Error(e.data.message);
            eval(e.data.code);
          }, false);
        </script>
      </body>
    </html>
  `;

const CodePreview: React.FC<PreviewProps> = ({ id }) => {
  const iframeRef = useRef<any>();
  const { code, message } = useTypedSelector((state) =>
    state.bundles[id] ? state.bundles[id] : { code: '', message: '' }
  );

  useEffect(() => {
    if (!iframeRef.current) return;

    iframeRef.current.srcdoc = iframeScrDoc;

    const timeout = setTimeout(() => {
      iframeRef.current.contentWindow.postMessage({ code, message }, '*');
    }, 50);

    return () => clearTimeout(timeout);
  }, [code, message]);

  return (
    <div className="preview-container">
      <iframe
        ref={iframeRef}
        title="preview"
        sandbox="allow-scripts"
        srcDoc={iframeScrDoc}
      />
    </div>
  );
};

export default CodePreview;
