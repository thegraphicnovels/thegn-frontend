import { useState } from 'react';

const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const onChange = event => {
    const newValue = event.target.value;
    let willUpdate = true;
    if (typeof validator === 'function') {
      willUpdate = validator(newValue);
    }
    if (willUpdate) {
      setValue(newValue);
    }
  };
  return { value, onChange };
};

export default useInput;
