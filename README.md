# Desafio_Final_Pizza_JWT Enrique Paillavil

1. En el UserContext, implementa los métodos para hacer login y register, consumiendo
las rutas /api/auth/login y /api/auth/register respectivamente. Estas rutas te
devolverán un token JWT y un email que debes almacenar sus respectivos estados.
(2 puntos)


2. En el UserContext, implementa un método para hacer logout, este método debe
eliminar el token y el email del estado. (1 punto)

3. En el UserContext, implementa un método para obtener el perfil del usuario
autenticado, consumiendo la ruta /api/auth/me. (1 punto)

4. Tanto la página de Login como la de Register, deben implementar los métodos
creados en UserContext para acceder al sistema. (2 puntos)

5. En la página profile, muestra el email del usuario autenticado y un botón para cerrar
sesión. (1 punto)

6. El botón logout del navbar debe cerrar la sesión del usuario. (1 punto)

7. En la página de Cart.jsx, implementa el método para enviar el carrito de compras al
backend, consumiendo la ruta /api/checkouts. (1 punto)

8. En la página de Cart.jsx, muestra un mensaje de éxito cuando se haya realizado la
compra. (1 punto)
