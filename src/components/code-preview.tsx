import { useEffect, useRef } from 'react';
import './code-preview.css';

interface PreviewProps {
  code: string;
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
            console.log({e})
            handleError(e.message);
          });
          window.addEventListener('message', (e) => {
            eval(e.data);
          }, false);
        </script>
      </body>
    </html>
  `;

const CodePreview: React.FC<PreviewProps> = ({ code }) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    if (!iframeRef.current) return;

    iframeRef.current.srcdoc = iframeScrDoc;

    const timeout = setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, '*');
    }, 50);

    return () => clearTimeout(timeout);
  }, [code]);

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
