import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../Redux/Slice/CartSlice";

function BookDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Get books from Redux store
  const book = useSelector((state) =>
    state.books.books.find((b) => b.id === id)
  );

  if (!book) {
    return <p className="text-center text-gray-500">Book not found.</p>;
  }

  const { title, authors, description, imageLinks, publisher, infoLink } =
    book.volumeInfo;

  const price = book.saleInfo?.listPrice?.amount || "129.99";

  const handleAddToCart = () => {
    const cartItem = {
      id: book.id,
      title,
      price,
      image: imageLinks?.thumbnail || "https://via.placeholder.com/150",
    };
    dispatch(addToCart(cartItem));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Book Cover */}
        <img
          src={imageLinks?.thumbnail || "https://via.placeholder.com/150"}
          alt={title}
          className="w-60 h-80 object-cover rounded-lg shadow-md"
        />

        {/* Book Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-gray-600">{authors?.join(", ") || "Unknown Author"}</p>
          <p className="text-sm text-gray-500">Published by {publisher || "Unknown Publisher"}</p>
          <p className="mt-4 text-gray-700">{description || "No description available."}</p>

          {/* Price & Actions */}
          <div className="mt-6 flex items-center gap-4">
            <span className="text-lg font-bold">${price}</span>
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Add to Cart
            </button>
            <a
              href={infoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              More Details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;
