
import Navbar from "../components/Navbar";import React from 'react';
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

const Profile = () => {
  const { getUser, user, logOut} = useContext(UserContext);

  useEffect(() => {
    getUser();
  }, []);

  return (
    
      
      <div>
        {user ? (
          <>
          <p>Email: {user.email}</p>
          <p>Id: {user.id}</p>

          <button 
              type="button" 
              className="btn btn-primary" 
              style={{ marginBottom: '10px', marginTop: '10px' }} 
              onClick={logOut}  // Llamada a logOut al hacer clic
            >
              Cerrar sesión
            </button>
        
          </>


        ) : (
          <p>Please login to view your profile.</p>
        )}
      </div>
    
  );
};
export default Profile;
// export default function Profile() {
//   return (
  
//           <div className="perfil-container">           
//             <p>mail usuario: email@gmail.com</p>
//             <button className=' btn btn-danger botoncito'>Cerrar sesión</button> 
//          </div>
//   );
//}
