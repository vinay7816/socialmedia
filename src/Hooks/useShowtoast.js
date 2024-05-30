import { useState } from 'react';

const useShowToast = () => {
  const [toastVisible, setToastVisible] = useState(false);
  const showToast = (title, description, status) => {
    console.log(title, description, status)
    setToastVisible(true);

    return (
      {toastVisible} &&  // Directly render if toastVisible is true
      <div className={`toast`} role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-header">
          <strong className="me-auto">{title}</strong>
          <button type="button" className="btn-close" onClick={() => setToastVisible(false)} aria-label="Close"></button>
        </div>
        <div className="toast-body">
          {description}
        </div>
      </div>
    )
  
};


  return { showToast};
};

export default useShowToast;
