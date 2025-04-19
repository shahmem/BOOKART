import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../Redux/Slice/CartSlice";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log(cart);

  return (
    <>
      <h2 className="text-2xl font-semibold m-4">Your Cart</h2>
      <div className="container gap-3 p-4 grid grid-cols-4 m-6">
        {cart.length === 0 ? (
          <p>Cart is empty.</p>
        ) : (
          cart.map((book) => (
            <div
              key={book.id}
              className="flex flex-col justify-between items-center border p-2 mb-2"
            >
              <img src={book.image} alt="" />
              <p>{book.title} </p>
              <p>${book.price}</p>
              <button
                className="bg-red-500 text-white px-2 py-1"
                onClick={() => dispatch(removeFromCart(book.id))}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Cart;
