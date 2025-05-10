import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../Redux/Slice/BookSlice";
import { addToCart } from "../Redux/Slice/CartSlice";
import { Link } from "react-router-dom";

function BookCard() {
  const dispatch = useDispatch();
  const { books, loading, error, category } = useSelector(
    (state) => state.books
  );

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  useEffect(() => {
    if (category) {
      dispatch(fetchBooks(category));
    }
  }, [category, dispatch]);

  const handleAddToCart = (book) => {
    const cartItem = {
      id: book.id,
      title: book.volumeInfo.title,
      price: book.saleInfo?.listPrice?.amount || 129.99,
      image: book.volumeInfo.imageLinks?.thumbnail,
    };
    dispatch(addToCart(cartItem));
    alert("Added to Cart")
  };

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setWishlist(JSON.parse(localStorage.getItem("wishlist")) || []);
  }, []);

  const handleToggleWishlist = (book) => {
    let updatedWishlist = [...wishlist];

    const isBookInWishlist = wishlist.some((item) => item.id === book.id);

    if (isBookInWishlist) {
      updatedWishlist = wishlist.filter((item) => item.id !== book.id);
    } else {
      updatedWishlist.push({
        id: book.id,
        title: book.volumeInfo.title,
        price: book.saleInfo?.listPrice?.amount || 129.99,
        image: book.volumeInfo.imageLinks?.thumbnail,
      });
    }

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  // PAGINATION LOGIC
  const totalPages = Math.ceil(books.length / booksPerPage);
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <div className="w-full py-6">
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="grid grid-cols-2 h-[75rem] place-content-between n md:grid-cols-5 p-3 md:p-7 gap-4">
            {currentBooks.length > 0 ? (
              currentBooks.map((book, index) => {
                const isBookInWishlist = wishlist.some(
                  (item) => item.id === book.id
                );

                return (
                  <div
                    key={index}
                    className="bg-white flex flex-col justify-between dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 scale-95 hover:scale-100 hover:shadow-lg"
                  >
                    <div className="relative h-auto overflow-hidden">
                    <button
                      onClick={() => handleToggleWishlist(book)}
                      className="bg-gray-400 absolute right-2 top-1.5 text-white z-20 px-3 py-2 rounded-full hover:bg-gray-500 transition duration-200"
                    >
                      {isBookInWishlist ? "❤️" : "🤍"}
                    </button>
                      <img
                        src={
                          book.volumeInfo.imageLinks?.thumbnail ||
                          "https://via.placeholder.com/150"
                        }
                        alt={book.volumeInfo?.title || "No title available"}
                        className="w-full h-76 overflow-hidden shadow-lg object-fit"
                      />
                    </div>

                    {/* Wishlist Toggle Button */}
                    

                    <p className="text-gray-600 line-clamp-2 font-semibold p-1.5 px-3 dark:text-gray-300 ">
                      {book.volumeInfo?.title || ""}
                    </p>

                    <div className="p-4">
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        {book.volumeInfo?.authors
                          ? book.volumeInfo.authors[0]
                          : "Unknown Author"}
                      </p>

                      <div className="flex items-center justify-between mt-4">
                        <span className="text-lg font-bold text-gray-800 dark:text-white">
                          {book.saleInfo?.listPrice?.amount
                            ? `$${book.saleInfo.listPrice.amount}`
                            : "$129.99"}
                        </span>
                        <button
                          onClick={() => handleAddToCart(book)}
                          className="bg-blue-600 cursor-pointer text-white px-3 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                        >
                          Add
                        </button>
                      </div>

                      <Link
                        to={`/book/${book.id}`}
                        className="text-blue-500 text-sm underline mt-2 block"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-600 dark:text-gray-300">
                No books found.
              </p>
            )}
          </div>

          {/* PAGINATION BUTTONS */}
          <div className="flex justify-center items-center my-6 gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-gray-300 text-sm font-semibold cursor-pointer dark:bg-gray-700 px-4 py-2 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-lg font-bold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="bg-gray-300 text-sm font-semibold cursor-pointer dark:bg-gray-700 px-4 py-2 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default BookCard;
