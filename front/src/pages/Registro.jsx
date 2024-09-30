import { useState } from "react";
import useInput from "../assets/hooks/useInput";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const Registro = () => {
  const [error, setError] = useState('');
  const { register } = useContext(UserContext);

  const email = useInput("");  // Custom hook para manejar email
  const password = useInput("");  // Custom hook para manejar password
  const passwordConfirm = useInput("");

  const emailValue = email.value;
  const passwordValue = password.value;
  const passwordConfirmValue = passwordConfirm.value;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarDatos()) {
      register(emailValue, passwordValue);
      email.reset();
      password.reset();
      passwordConfirm.reset();
    }
  };

  // Función para validar el email
  function validarEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const atSymbolCount = (email.match(/@/g) || []).length;
    const finConMasPuntos = /(\.)+$/.test(email);
    const puntosSeguidos = /\.{2,}/;

    if (!emailRegex.test(email) || atSymbolCount !== 1 || finConMasPuntos || puntosSeguidos.test(email)) {
      return false;
    }
    return true;
  }

  // Función para validar los datos
  const validarDatos = () => {
    if (email.value.trim() === "" || password.value.trim() === "") {
      setError(true);
      alert("Todos los campos son obligatorios");
      return false;
    } 

    else if (!validarEmail(email.value)) {
      setError(true);
      alert("Ingrese un correo válido");
      return false;
    }
    else if (password.value.length < 6) {
      setError(true);
      alert("La contraseña debe tener al menos 6 caracteres");
      return false;
    }
    else if (password.value !== passwordConfirm.value) {
      setError(true);
      alert("La contraseñas no coinciden");
      return false;
    }

    setError(false);
    // Si el hook useInput tiene algún método para resetear valores, llámalo aquí
    email.reset();
    password.reset();
    passwordConfirm.reset();

    alert("Registrado correctamente");
    return true;
  };

  return (
    <>
      <form className="formulario" onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <div className="form-group">
          <h1>Registro</h1>
          <label>Email</label>
          <input
            type="text"
            name="email"
            className="form-control"
            placeholder="ejemplo@dominio.com"
            value={email.value}
            onChange={email.onChange}
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            name="contraseña"
            className="form-control"
            placeholder="Incluya números y letras, evite fechas clave"
            value={password.value}
            onChange={password.onChange}
          />
        </div>
        <div className="form-group">
          <label>Confirmar contraseña</label>
          <input
            type="password"
            name="confirmarpassword"
            className="form-control"
            placeholder="Repita su contraseña"
            value={passwordConfirm.value}
            onChange={passwordConfirm.onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ marginBottom: '10px', marginTop: '10px' }}>
          Enviar
        </button>
      </form>
    </>
  );
};

export default Registro;

