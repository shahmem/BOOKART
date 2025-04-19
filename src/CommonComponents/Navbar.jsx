import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../Redux/Slice/BookSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";

function Navbar({ theme, toggleTheme }) {
  const dispatch = useDispatch();
  const { category, searchTerm, sortOrder } = useSelector(
    (state) => state.books
  );
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [selectedSortOrder, setSelectedSortOrder] = useState(sortOrder);
  const [sortOpen, setSortOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  const categories = ["Humor", "Fiction", "Psychology", "Drama", "Pets"];

  const handleSortChange = (sortOrder) => {
    setSelectedSortOrder(sortOrder); // Update local state
    setSortOpen(false); // Close dropdown after selection
    dispatch(fetchBooks({ sortOrder })); // Dispatch action to update books
  };
  const handleCatChange = (category) => {
    setSelectedCategory(category); // Update local state
    setCatOpen(false); // Close dropdown after selection
    dispatch(fetchBooks({ category })); // Dispatch action to update books
  };
  // Function to fetch books when filters change
  const fetchFilteredBooks = () => {
    dispatch(
      fetchBooks({
        category: selectedCategory,
        searchTerm: localSearch,
        sortOrder: selectedSortOrder,
      })
    );
  };

  // Debounce search input to prevent frequent API calls
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchFilteredBooks();
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [localSearch, selectedCategory, selectedSortOrder]);

  return (
    <>
      <div className="dark:bg-black dark:text-white pt-5 ">
        <h2 className="text-[2.8rem] text-center font-semibold font-serif">
          Bookart
        </h2>

        <div className="flex justify-between bg-slate-100 dark:bg-black mt-7 border-t-[1px] px-3">
          <div className="flex space-x-3">
            <div className="p-2 text-sm">
              <p
                className="p-1 bg-gray-50 px-3 dark:bg-gray-800 rounded-md w-36 cursor-pointer focus:outline-none"
                value={selectedSortOrder}
                onClick={() => {
                  setSortOpen(!sortOpen);
                }}
              >
                {selectedSortOrder
                  ? selectedSortOrder === "priceLowHigh"
                    ? "Price: Low to High"
                    : selectedSortOrder === "priceHighLow"
                    ? "Price: High to Low"
                    : "Newest Arrivals"
                  : "Sort By"}
                <FontAwesomeIcon className="ml-2.5" icon={faAngleDown} />
              </p>
              {sortOpen && (
                <div className="flex absolute p-1 z-10 dark:bg-gray-800 bg-gray-50  rounded-md w-36 flex-col mt-2 gap-1">
                  <p
                    className="p-1 cursor-pointer dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
                    onClick={() => handleSortChange("priceLowHigh")}
                  >
                    Price: Low to High
                  </p>
                  <p
                    className="p-1 cursor-pointer dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
                    onClick={() => handleSortChange("priceHighLow")}
                  >
                    Price: High to Low
                  </p>
                  <p
                    className="p-1 cursor-pointer dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
                    onClick={() => handleSortChange("newest")}
                  >
                    Newest Arrivals
                  </p>
                </div>
              )}
            </div>
            <div className="p-2 text-sm ">
              <p
                value=""
                className="p-1 cursor-pointer px-3 bg-gray-50 dark:bg-gray-800 rounded-md focus:outline-none"
                onChange={(e) => setSelectedCategory(e.target.value)}
                onClick={() => {
                  setCatOpen(!catOpen);
                }}
              >
                {selectedCategory ? category : "All Categories"}
                <FontAwesomeIcon className="ml-5" icon={faAngleDown} />
              </p>
              {catOpen && (
                <div className="mt-2 absolute  z-20 space-y-1 dark:bg-gray-800 bg-gray-50 rounded-lg p-1">
                  {categories.map((cat) => (
                    <p
                      key={cat}
                      value={cat}
                      className="p-1 pr-9 rounded-lg cursor-pointer dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800"
                      onClick={() => {
                        handleCatChange(`${cat}`);
                      }}
                    >
                      {cat}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="p-2">
            <input
              className="bg-gray-50 pl-3 p-1 w-full dark:bg-gray-900 rounded-md placeholder:text-sm"
              type="text"
              placeholder="Search books..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
           <Link to="/wishlist" className=" h-min mt-2 p-1 px-3 border-gray-300 font-semibold rounded-2xl border-[1px] dark:text-white">
            wishlist❤️
          </Link> 
           <Link to="/cart" className=" h-min mt-2 p-1 px-3 border-gray-300 font-semibold rounded-2xl border-[1px] dark:text-white">
            Cart
          </Link> 
          </div>
          
          <div>
            <button
              className={`p-1  text-xl mt-1 max-w-full dark:text-white transition`}
              onClick={toggleTheme}
            >
              {theme === "light" ? (
                <FontAwesomeIcon icon={faMoon} />
              ) : (
                <FontAwesomeIcon icon={faSun} />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
