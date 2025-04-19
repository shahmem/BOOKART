import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6">
    <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
      <div className="text-center md:text-left">
        <h2 className="md:text-xl text-lg font-semibold">Bookart</h2>
        <p className="text-sm text-gray-400">Your trusted source for the latest news</p>
      </div>
      
      <nav className="my-4 md:my-0">
        <ul className="flex flex-col md:flex-row items-center text-center md:space-x-6">
          <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white">World</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white">Politics</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white">Business</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white">Technology</a></li>
        </ul>
      </nav>
      
      <div className="text-center md:text-right">
        <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} NewsHub. All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer