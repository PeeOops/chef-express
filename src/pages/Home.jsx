import Navigation from "../components/Navigation";
import Hero from "../assets/images/hero.jpg";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Home = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const filter = searchParams.get("category") || "Beef";
    const availableCategory = category.map((meal => meal.strCategory));
    const [filteredLists, setFilteredLists] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoryURL, filteredURL] = await Promise.all([
                    fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list").then((res) => {
                        if(!res.ok){
                            throw new Error("Fetch data failed")
                        }
                        return res.json();
                    }),
                    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${filter}`).then((res) => {
                        if(!res.ok){
                            throw new Error("Fetch data failed");
                        }

                        return res.json();
                    })
                ])
                setCategory(categoryURL.meals);
                setFilteredLists(filteredURL.meals);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    },[filter])

    // Set category filter
    const handleClickFilter = (filter) => {
        setSearchParams({category: filter});
    }

    return(
        <>
            {/* Title */}
            <div className="flex flex-col justify-center items-center my-4">
                <h1 className="text-4xl font-bold">ChefExpress</h1>
                <p className="text-lg">Explore - Cook - Enjoy</p>
            </div>
            {/* Navbar */}
            <Navigation />
            {/* Hero */}
            <section className="relative h-[400px] w-full overflow-hidden mt-4">
                <img
                    src={Hero}
                    alt="Hero image"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="relative z-10 flex items-center justify-center h-full text-white bg-black/50">
                    <h1 className="text-4xl font-bold">Your next meal starts here</h1>
                </div>
            </section>
            {/* Filters */}
            <div className="flex overflow-x-auto space-x-3 mt-4 mx-4 md:mx-24 p-2 bg-amber-600 shadow-gray-600 shadow-md rounded-md font-bold scrollbar-hide">
                {category.map((meal) => (
                    <p
                    key={meal.strCategory}
                    className={`whitespace-nowrap cursor-pointer border-2 border-amber-600 hover:border-white hover:rounded-sm p-1 ${filter === meal.strCategory ? "border-white rounded-sm" : ""} `} onClick={() => handleClickFilter(meal.strCategory)}
                    >
                    {meal.strCategory}
                    </p>
                ))}
            </div>


            {/* Count recipes */}
            <div className="mt-4 mx-24 ">
                <p>You have <span className="font-bold h-[3rem]">21,766</span> recipes to try</p>
            </div>

            {/* Lists */}

                {
                    availableCategory.find((category) => searchParams.get("category") === category) ?
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4 mx-4 md:mx-24">
                            { filteredLists.map((list) => (
                                <div key={list.idMeal} className="flex flex-col items-center justify-center bg-white shadow-gray-600 shadow-md rounded-sm p-2 w-full">
                                    <img src={`${list.strMealThumb}`} className="w-3/4 rounded-sm" alt={list.strMeal} />
                                    <p className="font-bold h-[3rem] text-center">{list.strMeal}</p>
                                </div>
                            ))}
                        </div>
                    :

                    <div className="grid min-h-full place-items-centerpx-6 py-24 sm:py-32 lg:px-8">
                        <div className="text-center">
                        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-red-600 sm:text-7xl">
                            Category not found
                        </h1>
                        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                            Sorry, we couldn’t find what you’re looking for.
                        </p>
                        </div>
                    </div>
                }
   

            {/* Pagination */}
            <div className="flex flex-row place-content-between items-center font-bold mt-4 mx-24">
                <p>Prev</p>
                <p>Next</p>
            </div>

            {/* Footer */}
            <Footer/>
        </>
    )
}

export default Home;