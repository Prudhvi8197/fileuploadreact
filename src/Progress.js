import { useEffect, useRef, useState } from "react";

export default function ProgressComponent() {
  const ref = useRef();
  const [file, setFile] = useState([]);
  const [activeId, setActiveId] = useState(0);
  const [title, setTitle] = useState("");

  const onComplete = useRef((id) => {
    setActiveId(id + 1);
  }, []);

  return (
    <div className="App">
      <div className="input-details">
        <input
          type="file"
          id="input"
          ref={ref}
          multiple={true}
          style={{ display: "block", padding: "5px" }}
        />
        <div style={{ display: "block", padding: "15px" }}>
          <label
            htmlFor="title"
            style={{ fontStyle: "italic", padding: "5px" }}
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <button
          className="button"
          style={{ display: "block" }}
          onClick={() => {
            const files = [...ref.current.files];
            const withTitle = files.map(({ name }) => ({
              name,
              title
            }));
            setFile((oldFile) => [...oldFile, ...withTitle]);
          }}
        >
          Submit
        </button>
        <br />
      </div>
      <div className="progress-stat">
        <div className="uploading-stat">
          <Progress
            fileName={file[activeId]?.name}
            title={file[activeId]?.title}
            onComplete={onComplete.current}
            id={activeId}
          />
        </div>
        <div className="queue-stat">
          {[...file].splice(activeId + 1, file.length).map(({ name }) => (
            <Queue fileName={name} id={activeId} title={title} />
          ))}
        </div>
        <div className="completion-stat">
          {[...file].splice(0, activeId).map(({ name, title }) => (
            <CompletedProgress fileName={name} id={activeId} title={title} />
          ))}
        </div>
      </div>
    </div>
  );
}

const Progress = ({ fileName, onComplete, id, title }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!fileName) return;

    const timerId = setInterval(() => {
      setProgress((p) => p + 1);
    }, 100);

    return () => clearInterval(timerId);
  }, [fileName]);

  const isUploaded = progress === 100;

  useEffect(() => {
    if (!isUploaded) return;
    setProgress(0);
    onComplete(id);
  }, [isUploaded, onComplete, id]);

  if (!fileName) return null;

  return (
    <div className="progress">
      <label htmlFor="file">
        Uploading fileName: {fileName}: title: {title}
      </label>
      <progress id="file" value={progress} max="100">
        {progress}%
      </progress>
    </div>
  );
};

const Queue = ({ fileName, onComplete, id, title }) => {
  return (
    <div className="progress">
      <label htmlFor="file">
        In Queue fileName: {fileName} title: {title}
      </label>
      <progress id="file" max="100"></progress>
    </div>
  );
};

const CompletedProgress = ({ fileName, title }) => {
  return (
    <div className="progress">
      <label htmlFor="file">
        Uploaded fileName:{fileName} title: {title}
      </label>
    </div>
  );
};
