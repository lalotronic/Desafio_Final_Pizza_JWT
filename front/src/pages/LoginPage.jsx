import { useState } from "react";
import useInput from "../assets/hooks/useInput";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

const Loginpage = () => {
  const [error, setError] = useState(false);

  const { login } = useContext(UserContext);
  const email = useInput("");  // Custom hook para manejar email
  const password = useInput("");  // Custom hook para manejar password

  const emailValue = email.value;
  const passwordValue = password.value;

  // Función que evita recarga y llama a login
  const handleSubmit = (e) => {
    e.preventDefault();  // Previene la recarga
    if (validarDatos()) {
      login(emailValue, passwordValue);  // Llama a login si los datos son válidos
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
    else if (!email.value.includes('@') || !email.value.includes('.')) {
      setError(true);
      alert('Falta un arroba "@" o punto "." en tu email');
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

    setError(false);
    // Si el hook useInput tiene algún método para resetear valores, llámalo aquí
    email.reset();
    password.reset();
    alert("Bienvenido a Pizza Mamma Mia");
    return true;
  };

  return (
    <>
      <form className="formulario" onSubmit={handleSubmit}>
        {error ? <p>Todos los campos son obligatorios</p> : null}
        <div className="form-group">
          <h1>Login</h1>
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
            type="password"  // Cambiado a "password" por seguridad
            name="password"
            className="form-control"
            placeholder="Deben ser al menos 6 letras o números"
            value={password.value}
            onChange={password.onChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginBottom: "10px", marginTop: "10px" }}
        >
          Login
        </button>
      </form>
    </>
  );
};

export default Loginpage;