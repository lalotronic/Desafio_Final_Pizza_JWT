// src/context/UserContext.jsx
// import React, { createContext, useState } from 'react';

// export const UserContext = createContext();

// const UserProvider = ({ children }) => {
//   const [token, setToken] = useState(true); // Estado inicial del token

//   const logout = () => {
//     setToken(false); // Cambiar el estado del token a false al hacer logout
//   };

//   return (
//     <UserContext.Provider value={{ token, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserProvider;
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate();

//checkout del carrito
  const simulacro = async () => {
    const response = await fetch("http://localhost:5000/api/checkouts", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
        cart: carrito,
        }),
        });
    let data = await response.json();
    alert(data?.error || data.message);
    };
//logout elmina token y el email del estado
  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/login");
  };
// Recuperamos la información del usuario autenticado utilizando el token
  const getUser = async () => {
    if (token) {
      const response = await fetch("http://localhost:5000/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUser(data);
    }
  };
  //Registramos un nuevo usuario enviando su email y contraseña
  const register = async (email, password) => {
        const response = await fetch("http://localhost:5000/api/auth/register", { 
          method: "POST",
          headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify({
          email: email,
          password: password,
          }),
          });
          const data = await response.json();
          alert(data?.error || "Registration successful!");
          localStorage.setItem("token", data.token);
          setToken(data.token);
          navigate("/");
    };
//Autenticamos a un usuario con su email y contraseña.
  const login = async (emailValue, passwordValue) => {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
      }),
    });
    const data = await response.json();
    alert(data?.error || "Authentication successful!");
    localStorage.setItem("token", data.token);
    setToken(data.token);
    navigate("/");
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, token, register, getUser, logOut, simulacro }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;