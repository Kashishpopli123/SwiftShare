import { useState, useEffect, useRef } from 'react';
import './App.css';
import { uploadFile } from './services/api';

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const fileInputRef = useRef();
  const linkRef = useRef();

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        setLoading(true);
        setError('');
        try {
          const data = new FormData();
          data.append("name", file.name);
          data.append("file", file);

          const response = await uploadFile(data);
          if (response && response.path) {
            setResult(response.path);
          } else {
            setError('Upload failed: No path returned');
          }
        } catch (err) {
          console.error('Upload error:', err);
          setError('Upload failed: ' + (err.message || 'Unknown error'));
        } finally {
          setLoading(false);
        }
      }
    }
    getImage();
  }, [file])

  const onUploadClick = () => {
    fileInputRef.current.click();
  }

  const copyToClipboard = () => {
    linkRef.current.select();
    document.execCommand('copy');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className='main-wrapper'>
      <div className='container'>
        <div className='left-column'>
          <h1>SwiftShare</h1>
          <p className='tagline'>Lightning-fast file sharing at your fingertips!</p>
          <div className='animation-container'>
            <div className='file-icon'></div>
            <div className='arrow-icon'></div>
            <div className='cloud-icon'></div>
          </div>
        </div>
        <div className='right-column'>
          <div className='upload-box'>
            <h2>Upload Your File</h2>
            <div className='upload-area' onClick={onUploadClick}>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
              {file ? (
                <p className='file-name'>{file.name}</p>
              ) : (
                <p>Drag & Drop or Click to Upload</p>
              )}
            </div>
            <button onClick={onUploadClick} disabled={loading} className='upload-btn'>
              {loading ? 'Uploading...' : 'Upload File'}
            </button>
            {error && <p className='error-message'>{error}</p>}
            {result && (
              <div className='result-area'>
                <p>Your file is ready! Share this link:</p>
                <div className='share-link-container'>
                  <input
                    type="text"
                    value={result}
                    readOnly
                    ref={linkRef}
                    className='share-link-input'
                  />
                  <button onClick={copyToClipboard} className='copy-btn'>
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <a href={result} target='_blank' rel="noopener noreferrer" className='download-link'>
                  Download File
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;