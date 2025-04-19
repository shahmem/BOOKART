import React, { useState, useEffect } from "react";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  const handleRemoveFromWishlist = (bookId) => {
    const updatedWishlist = wishlist.filter((book) => book.id !== bookId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Your Wishlist</h2>
      
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {wishlist.map((book) => (
            <div key={book.id} className="bg-white p-4 rounded shadow-md">
              <img src={book.image} alt={book.title} className="h-40 mx-auto" />
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-gray-500">${book.price}</p>
              <button
                onClick={() => handleRemoveFromWishlist(book.id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
