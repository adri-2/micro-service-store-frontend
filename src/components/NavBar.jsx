import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="flex flex-col gap-4 px-8  bg-primary font-medium shadow-xl h-24 w-full text-md text-secondary capitalize">
      <div className="flex  gap-x-6  w-full text-md text-secondary capitalize">
        <a href="#">Dashboard</a>
        <Link to="/orders">Commandes</Link>
        <Link to="/categories">Produits</Link>
        <Link to="/categories">Categories</Link>
      </div>
      <div className="">
        <button className="btn-secondary cursor-pointer">Nouveau</button>
      </div>
    </div>
  );
}

export default NavBar;
