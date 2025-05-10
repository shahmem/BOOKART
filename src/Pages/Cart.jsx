import { useSelector, useDispatch } from "react-redux";
import { addToCart, decreaseQuantity, increaseQuantity, removeFromCart } from "../Redux/Slice/CartSlice";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log(cart);


  return (
    <div className="h-screen bg-gray-100 scroll-auto">
      <h2 className="text-2xl font-semibold p-4">Your Cart</h2>
      <div className="container gap-3 p-4 grid grid-cols-4 m-6">
        {cart.length === 0 ? (
          <p>Cart is empty.</p>
        ) : (
          cart.map((book) => (
            <div
              key={book.id}
              className="flex flex-col bg-white justify-between items-center shadow-xl rounded-lg p-2 mb-2"
            >
              <img src={book.image} alt="" />
              <p>{book.title} </p>
              <p>${book.price}</p>
              <div className="flex gap-2.5 my-2 items-center rounded">
                <button onClick={() => dispatch(decreaseQuantity(book.id))} className="px-3  bg-gray-400 text-white shadow font-bold hover:bg-gray-500 rounded-sm">-</button>
                <p className="font-semibold text-sm">{book.quantity}</p>
                <button onClick={() => dispatch(increaseQuantity(book.id))}  className=" px-3 bg-gray-400  text-white shadow font-bold hover:bg-gray-500 rounded-sm">+</button>
              </div>
              <button
                className="bg-red-600 self-end mr-4 my-2.5 hover:bg-red-500 rounded-lg  text-xs font-semibold text-white px-2.5 p-1.5"
                onClick={() => dispatch(removeFromCart(book.id))}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Cart;
