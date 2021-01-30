import { useEffect, useRef } from 'react';
import './code-preview.css';

interface PreviewProps {
  code: string;
  msg: string;
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
            if(e.data.msg) throw new Error(e.data.msg);
            eval(e.data.code);
          }, false);
        </script>
      </body>
    </html>
  `;

const CodePreview: React.FC<PreviewProps> = ({ code, msg }) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    if (!iframeRef.current) return;

    iframeRef.current.srcdoc = iframeScrDoc;

    const timeout = setTimeout(() => {
      iframeRef.current.contentWindow.postMessage({ code, msg }, '*');
    }, 50);

    return () => clearTimeout(timeout);
  }, [code, msg]);

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
