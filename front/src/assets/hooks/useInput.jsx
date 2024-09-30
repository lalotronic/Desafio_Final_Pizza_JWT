import { useState } from "react";

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  // Maneja el cambio en el input
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // Función para resetear el valor
  const reset = (newValue = initialValue) => {
    setValue(newValue); // Restablece el valor al inicial o al que se pase
  };

  return {
    value,
    onChange: handleChange,
    reset, // Devuelve la función reset para poder usarla
  };
};

export default useInput;