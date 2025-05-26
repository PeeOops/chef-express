import { faYoutube } from "@fortawesome/free-brands-svg-icons"
import { faBookmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Footer from "../components/Footer"
import Navigation from "../components/Navigation"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

const FoodDetails = () => {

    const { id } = useParams();
    const [loading, setLoading] = useState(true)
    const [mealDetails, setMealDetails] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [isSaved,setIsSaved] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchMealDetails = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                if (!response.ok) {
                    throw new Error("Fetch data failed");
                }
                const data = await response.json();
                setMealDetails(data.meals[0]);

                // Ingredients
                const ingredientsArray = [];
                for(let i = 1; i <= 20; i++){
                    const listOfIngredients = data.meals[0]["strIngredient" + i];
                    const listOfMeasurements = data.meals[0]["strMeasure" + i];
                    if(listOfIngredients && listOfIngredients.trim() !== "" && listOfMeasurements && listOfMeasurements.trim() !== ""){
                        ingredientsArray.push({"ingredient" : listOfIngredients, "measurements" : listOfMeasurements});
                    }
                }
                setIngredients(ingredientsArray);

                // Instructions
                const instructionsReg = data.meals[0].strInstructions.replace(/\r?\n/g, ' ').replace(/\b\d+\.\s/g, '').split('. ').map(instruction => instruction.trim()).filter(instruction => instruction !== "");
                setInstructions(instructionsReg);

            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMealDetails();


    }, [id]);

    useEffect(() => {
        const savedLists = JSON.parse(localStorage.getItem("recipes") || "[]");
        const exists = savedLists.some((item) => item.id === mealDetails.idMeal);

        if(exists){
            setIsSaved(true);
        }

    }, [mealDetails])

    // Save recipe

    const handleClickSaveRecipe = () => {
        const savedLists = JSON.parse(localStorage.getItem("recipes") || "[]");

        const newRecipe = {
            id: mealDetails.idMeal,
            title: mealDetails.strMeal,
            cuisine: mealDetails.strArea,
            category: mealDetails.strCategory,
            tags: mealDetails.strTags,
            img: mealDetails.strMealThumb
        }

        const exists = savedLists.some(list => list.id === newRecipe.id);
        if(exists){
            alert("You have added this recipe");
            return;
        }

        savedLists.push(newRecipe);

        localStorage.setItem("recipes", JSON.stringify(savedLists));
        
        setIsSaved(true);
    }

    return(
        <>
            {/* Navbar */}
            <Navigation />

            {/* Content */}
            <div className="flex flex-col gap-6 mx-2 md:mx-28 p-8 mt-6 bg-white rounded-md shadow-gray-600 shadow-md">
                {/* Header */}
                <div className="flex flex-col md:flex-row gap-8 w-fit">
                    <img src={mealDetails.strMealThumb} alt={mealDetails.strMeal} className="w-84 rounded-md shadow-gray-600 shadow-md" />
                    <div className="flex flex-col gap-2 w-fit">
                        <h1 className="text-4xl font-bold">{mealDetails?.strMeal || "-"}</h1>
                        <p className="text-lg text-amber-600 font-bold"># {mealDetails?.idMeal || "-"}</p>
                        <div role="button" className="flex flex-row items-center border-2 border-black gap-2 p-1 rounded-md w-fit cursor-pointer hover:text-amber-600 hover:border-amber-600 active:text-amber-600 active:border-amber-600 text-lg">
                            <FontAwesomeIcon icon={faBookmark} />
                            {
                                isSaved ? 
                                <p onClick={() => handleClickSaveRecipe()} className="font-bold">Saved</p> :
                                <p onClick={() => handleClickSaveRecipe()} className="font-bold">Save Recipe</p>
                            }
                        </div>
                        <div className="text-lg">
                            <p><span className="font-bold">Cuisine:</span> {mealDetails?.strArea || "-"}</p>
                            <p><span className="font-bold">Category:</span> {mealDetails?.strCategory || "-"}</p>
                            <p><span className="font-bold">Youtube Link:</span> <a href={mealDetails?.strYoutube} target="_blank"><FontAwesomeIcon icon={faYoutube} className="text-red-600" /></a></p>
                            <p><span className="font-bold">Tags:</span> {mealDetails?.strTags || "-"}</p>
                        </div>
                        
                    </div>

                </div>

                {/* Ingredients & Instructions */}
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold">Ingredients</h1>
                        <ul className="pl-4 text-md list-disc">
                            {
                                ingredients.map((ingredient) => (
                                    <div key={ingredient.ingredient} className="flex flex-row items-center gap-1 border-b-1 border-dashed border-amber-600 last:border-b-0">
                                        <li>{ingredient.measurements}</li>
                                        <span>-</span>
                                        <p>{ingredient.ingredient}</p>
                                    </div>
                                ))
                                
                            }
                            
                        </ul>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold">Instructions</h1>
                        <ul className="flex flex-col pl-4 text-md list-decimal">
                            {   
                                instructions.map((instruction) => (
                                    <li key={instruction} className="border-b-1 border-dashed border-amber-600 last:border-b-0">{instruction}</li>
                                ))
                                
                            }
                        </ul>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </>


    )
}

export default FoodDetails