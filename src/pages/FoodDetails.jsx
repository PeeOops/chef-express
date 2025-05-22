import { faYoutube } from "@fortawesome/free-brands-svg-icons"
import { faArrowLeft, faBookmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Footer from "../components/Footer"
import Navigation from "../components/Navigation"

const FoodDetails = () => {
    return(
        <>
            {/* Navbar */}
            <Navigation />

            {/* Content */}
            <div className="flex flex-col gap-6 mx-2 md:mx-28 p-8 mt-6 bg-white rounded-md shadow-gray-600 shadow-md">
                {/* Header */}
                <div className="flex flex-col md:flex-row gap-8 w-fit">
                    <img src="https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg" alt="Spicy Arrabiata Penne" className="w-84 rounded-md shadow-gray-600 shadow-md" />
                    <div className="flex flex-col gap-2 w-fit">
                        <h1 className="text-4xl font-bold">Spicy Arrabiata Penne</h1>
                        <p className="text-lg text-amber-600 font-bold"># 52771</p>
                        <div className="flex flex-row items-center border-2 border-black gap-2 p-1 rounded-md w-fit cursor-pointer hover:text-amber-600 hover:border-amber-600 text-lg">
                            <FontAwesomeIcon icon={faBookmark} />
                            <p className="font-bold">Save Recipe</p>
                        </div>
                        <div className="text-lg">
                            <p><span className="font-bold">Cuisine:</span> Italian</p>
                            <p><span className="font-bold">Category:</span> Vegetarian</p>
                            <p><span className="font-bold">Youtube Link:</span> <a href="https://www.youtube.com/watch?v=1IszT_guI08" target="_blank"><FontAwesomeIcon icon={faYoutube} className="text-red-600" /></a></p>
                            <p><span className="font-bold">Tags:</span> Pasta, Curry</p>
                        </div>
                        
                    </div>

                </div>

                {/* Ingredients & Steps */}
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold">Ingredients</h1>
                        <ul className="pl-4 text-md list-disc">
                            <li className="border-b-1 border-dashed border-amber-600">1 pound - penne rigate</li>
                            <li className="border-b-1 border-dashed border-amber-600">1/4 cup - olive oil</li>
                            <li className="border-b-1 border-dashed border-amber-600">3 cloves - garlic</li>
                            <li className="border-b-1 border-dashed border-amber-600">1 tin - chopped tomatoes</li>
                            <li className="border-b-1 border-dashed border-amber-600">1/2 teaspoon - red chilli flakes</li>
                            <li className="border-b-1 border-dashed border-amber-600">1/2 teaspoon - italian seasoning</li>
                            <li className="border-b-1 border-dashed border-amber-600">6 leaves - basil</li>
                            <li className="border-b-1 border-dashed border-amber-600">sprinkling - Parmiggiano-Reggiano</li>
                        </ul>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold">Instructions</h1>
                        <ul className="pl-4 text-md list-decimal">
                            <li className="border-b-1 border-dashed border-amber-600">Bring a large pot of water to a boil</li>
                            <li className="border-b-1 border-dashed border-amber-600">Add kosher salt to the boiling water, then add the pasta. Cook according to the package instructions, about 9 minutes</li>
                            <li className="border-b-1 border-dashed border-amber-600">In a large skillet over medium-high heat, add the olive oil and heat until the oil starts to shimmer</li>
                            <li className="border-b-1 border-dashed border-amber-600">Add the garlic and cook, stirring, until fragrant, 1 to 2 minutes</li>
                            <li className="border-b-1 border-dashed border-amber-600">Add the chopped tomatoes, red chile flakes, Italian seasoning and salt and pepper to taste</li>
                            <li className="border-b-1 border-dashed border-amber-600">Bring to a boil and cook for 5 minutes</li>
                            <li className="border-b-1 border-dashed border-amber-600">Remove from the heat and add the chopped basil</li>
                            <li className="border-b-1 border-dashed border-amber-600">Drain the pasta and add it to the sauce</li>
                            <li className="border-b-1 border-dashed border-amber-600">Garnish with Parmigiano-Reggiano flakes and more basil and serve warm</li>
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