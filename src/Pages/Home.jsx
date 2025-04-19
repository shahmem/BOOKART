import React, { useEffect, useState } from 'react'
import Navbar from '../CommonComponents/Navbar';
import BookCard from './BookCard';
import Aside from '../CommonComponents/Aside';

function Home() {
    const [theme, setTheme] = useState(() => {
   
        const savedTheme = localStorage.getItem("theme");
        return savedTheme ? savedTheme : "light";
      });
    
      useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
      }, [theme]);
    
      const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
      };
   
    
  return (
    <>
    <Navbar  theme={theme} toggleTheme={toggleTheme}  />
        <div className=' flex bg-white dark:bg-gray-900 dark:text-white'>
          <BookCard />

        </div>
    </>
  )
}

export default Home