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

    setTimeout(() => {
      setToast(prevToast => ({ ...prevToast, visible: false }));
    }, 3000); 
  };

  return { toast, showToast };
};

export default useShowtoast;

