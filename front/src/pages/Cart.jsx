import { useContext, useState } from 'react'; // Agregamos useState
import { CartContext } from '../context/CartContext';
import { ProductContext } from '../context/ProductContext';
import PizzaTarjeta from '../components/PizzaTarjeta';
import { UserContext } from '../context/UserContext';

export const Cart = () => {
  const { cart, getTotal } = useContext(CartContext);
  const { pizzas } = useContext(ProductContext); // Consumimos el contexto de productos que provee pizzas desde la API
  const { token, simulacro } = useContext(UserContext);
  const [mensajeExito, setMensajeExito] = useState(''); // Estado para el mensaje de éxito

  // Función para obtener los detalles de las pizzas en el carrito
  const getPizzaDetails = (pizzaId) => {
    return pizzas.find((pizza) => pizza.id === pizzaId);
  };

  const ejecutarPago= () => {
    simulacro(); // Ejecutar la función simulacro
    setMensajeExito('Éxito, compra realizada...que disfrutes, vuelve pronto'); // Mostrar el mensaje de éxito
  };

  return (
    <>
      <h1>Cart - Total: ${getTotal()}</h1>

      <button 
        className="btn btn-primary" 
        onClick={ejecutarPago} // Llamamos a ejecutarPago en lugar de simulacro directamente
        disabled={!token || cart.length === 0} // Se deshabilita si no hay token o el carrito está vacío
      >
        Pagar Carro
      </button>

      {mensajeExito && <p>{mensajeExito}</p>} {/* Mostrar el mensaje si existe */}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {cart.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) : (
          cart.map((cartItem) => {
            const pizzaDetails = getPizzaDetails(cartItem.id); // Cargamos los detalles en pizzaDetails

            return (
              <PizzaTarjeta 
                key={cartItem.id} // Damos la key al componente PizzaTarjeta
                pizza={{ ...pizzaDetails, count: cartItem.quantity }} // Pasar detalles de pizza y cantidad
              />
            );
          })
        )}
      </div>
    </>
  );
}