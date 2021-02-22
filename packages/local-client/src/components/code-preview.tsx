import { useEffect, useRef } from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import './code-preview.css';

interface PreviewProps {
  id: string;
}

const iframeScrDoc = `
    <html>
      <head>
        <style>
          body {color: #eee;}
        </style>
      </head>
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
  const { code, message, isWorking } = useTypedSelector((state) =>
    state.bundles[id]
      ? state.bundles[id]
      : { code: '', message: '', isWorking: true }
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
      {isWorking && (
        <div className="progress-container">
          <button className="button is-loading is-danger is-outlined is-large is-rounded" />
        </div>
      )}
    </div>
  );
};

export default CodePreview;
