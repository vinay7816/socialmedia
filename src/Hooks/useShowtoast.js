import { useState } from 'react';

const useShowtoast = () => {
  const [toast, setToast] = useState({
    visible: false,
    title: '',
    description: '',
    status: ''
  });

  const showToast = (title, description, status) => {
    console.log(title, description, status);
    setToast({
      visible: true,
      title,
      description,
      status
    });

    // Automatically hide the toast after a certain time
    setTimeout(() => {
      setToast({ ...toast, visible: false });
    }, 3000); // Hide after 3 seconds
  };

  return { toast, showToast };
};

export default useShowtoast;
