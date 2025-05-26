import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";

const Favourites = () => {

    const [savedRecipe, setSavedRecipe] = useState([]);


    // Show saved recipe lists
    useEffect(() => {
        const savedLists = JSON.parse(localStorage.getItem("recipes") || "[]");

        setSavedRecipe(savedLists);
    },[])

    // Delete saved recipe
    const handleClickDelete = (id) => {
        const updated = savedRecipe.filter(recipe => recipe.id !== id);
        localStorage.setItem("recipes", JSON.stringify(updated));
        setSavedRecipe(updated);
    };

    return(
        <>
            {/* Navbar */}
            <Navigation />
            
            {/* Content */}
            {   
                savedRecipe.length <= 0 ? 
                    <div className="grid min-h-full place-items-centerpx-6 py-24 sm:py-32 lg:px-8">
                        <div className="text-center">
                        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-red-600 sm:text-7xl">
                            Saved recipe not found
                        </h1>
                        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                            Add one!
                        </p>
                        </div>
                    </div>
                :
                savedRecipe.map((recipe) => (
                    <div key={recipe.id} role="button" className="flex flex-col md:flex-row justify-start gap-6 mx-4 md:mx-28 p-8 mt-6 bg-white rounded-md shadow-gray-600 shadow-md">
                        <img src={recipe.img} alt={recipe.title} className="w-full md:w-72 mx-auto md:mx-0 rounded-md" />
                        <div className="flex flex-col gap-2">
                            <h1 className="font-bold text-3xl  md:text-3xl">{recipe?.title ?? "-"}</h1>
                            <div>
                                <p className="text-lg"><span className="font-bold">Cuisine:</span> {recipe?.cuisine ?? "-"}</p>
                                <p className="text-lg"><span className="font-bold">Category:</span> {recipe?.category ?? "-"}</p>
                                <p className="text-lg"><span className="font-bold">Tags:</span> {recipe?.tags ?? "-"}</p>
                            </div>
                            <div className="flex flex-row gap-2">
                                <Link to={`/meals/${recipe.id}`} className="text-black p-1 font-bold rounded-sm cursor-pointer hover:text-white hover:bg-amber-600 
                                active:text-white active:bg-amber-600 border-2 border-black w-fit">View Recipe</Link>
                                <button onClick={() => handleClickDelete(recipe.id)}className="text-black p-1 font-bold rounded-sm cursor-pointer hover:text-white hover:bg-amber-600 
                                active:text-white active:bg-amber-600 border-2 border-black w-fit">Delete</button>
                            </div>                    
                        </div>
                    </div>
                ))
                
            }
            

            {/* Footer */}
            <Footer />
            
            
        </>
    )
}

export default Favourites;