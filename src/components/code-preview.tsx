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
          window.addEventListener('message', (e) => {
            try {
              eval(e.data);
            } catch (error) {
              const errorHTML = '<div><h4 style="color: red;">Runtime Error!</h4>'+error+'</div>';
              document.querySelector('#root').innerHTML = errorHTML;
              console.error(error);
            }
          }, false)
        </script>
      </body>
    </html>
  `;

const CodePreview: React.FC<PreviewProps> = ({ code }) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    if (!iframeRef.current) return;
    // iframeRef.current.srcdoc = iframeScrDoc;
    iframeRef.current.contentWindow.postMessage(code, '*');
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
