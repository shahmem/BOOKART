import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../Redux/Slice/BookSlice";

function Aside() {
  const dispatch = useDispatch();
  const { category, searchTerm, sortOrder } = useSelector((state) => state.books);
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [selectedSortOrder, setSelectedSortOrder] = useState(sortOrder);
  const [sortOpen ,setSortOpen]=useState(false)
  const [catOpen ,setCatOpen]=useState(false)

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
    dispatch(fetchBooks({ category: selectedCategory, searchTerm: localSearch, sortOrder: selectedSortOrder }));
  };

  // Debounce search input to prevent frequent API calls
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchFilteredBooks();
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [localSearch, selectedCategory, selectedSortOrder]);

  return (
    <div className="flex flex-col fixed right-0 gap-2 w-[22vw] dark:bg-gray-700 dark:text-gray-700 bg-gray-300">
      <div className="p-2 pt-4">
        <input
          className="bg-gray-50  p-1 w-full rounded-md placeholder:text-sm"
          type="text"
          placeholder="Search books..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </div>
      <div className="p-2 text-sm">
        <p
          className="p-1 bg-gray-50 rounded-md w-full cursor-pointer focus:outline-none"
          value={selectedSortOrder}
          onClick={()=>{setSortOpen(!sortOpen)}}
        >
             {selectedSortOrder ? 
          (selectedSortOrder === "priceLowHigh" ? "Price: Low to High" :
           selectedSortOrder === "priceHighLow" ? "Price: High to Low" :
           "Newest Arrivals")
          : "Sort By"}
        </p>
        {sortOpen &&
        <div className="flex flex-col mt-2 gap-1.5">
          <p
            className="p-1 cursor-pointer hover:bg-gray-200"
            onClick={() => handleSortChange("priceLowHigh")}
          >
            Price: Low to High
          </p>
          <p
            className="p-1 cursor-pointer hover:bg-gray-200"
            onClick={() => handleSortChange("priceHighLow")}
          >
            Price: High to Low
          </p>
          <p
            className="p-1 cursor-pointer hover:bg-gray-200"
            onClick={() => handleSortChange("newest")}
          >
            Newest Arrivals
          </p>
        </div> }
          
        
      </div>
      <div className="p-2 text-sm">
          <p value=""
          className="p-1 cursor-pointer bg-gray-50 rounded-md w-full focus:outline-none"
          onChange={(e) => setSelectedCategory(e.target.value)}
          onClick={()=>{setCatOpen(!catOpen)}}
          >
             {selectedCategory ? category : "All Categories"}

          </p>
          {catOpen && 
          <div className="mt-2">
          {categories.map((cat) => (
            <p
             key={cat} 
             value={cat}
             className="p-1 cursor-pointer hover:bg-gray-200"
            onClick={()=>{handleCatChange(`${cat}`)}}
            >
              {cat}
            </p>
          ))}
          </div>
          
          }
          
      </div>
    </div>
  );
}

export default Aside;
