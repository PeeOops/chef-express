import Navigation from "../components/Navigation";
import Hero from "../assets/images/hero.jpg";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const filter = searchParams.get("category") || "Beef";

    // Search
    const searchValue = searchParams.get("search") || "";

    // Pagination
    const currentPage = parseInt(searchParams.get("page") || "1");
    const itemsPerPage = 10;
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    // Category
    const [category, setCategory] = useState([]);
    const availableCategory = category?.map((meal => meal.strCategory) || []);

    // Filtered meals
    const [filteredLists, setFilteredLists] = useState([]);

    // Conditions
    const hasSearch = searchValue !== "";
    const isValidCategory = availableCategory.includes(filter);

    useEffect(() => {

        if(window.location.search === ""){
            navigate("?category=Beef&page=1");
        }

        const fetchData = async () => {
            try {
                const [categoryURL, filteredURL, searchURL] = await Promise.all([
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
                    }),
                    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`).then((res) => {
                        if(!res.ok){
                            throw new Error("Fetch data failed");
                        }
                        
                        return res.json();
                    })
                ])
                setCategory(categoryURL.meals);
                if(searchValue !== ""){
                    setFilteredLists(searchURL.meals);
                }else{
                    setFilteredLists(filteredURL.meals);
                }
                console.log(filteredLists);
                

            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    },[filter, navigate, searchValue])

    // Set category filter
    const handleClickFilter = (filter) => {
        setSearchParams({category: filter, page: 1});
    }

    // Next page
    const nextPage = () => {
        const maxPage = Math.ceil(filteredLists.length / itemsPerPage);
        if (currentPage < maxPage) {
            if (hasSearch) {
                setSearchParams({ search: searchValue, page: currentPage + 1 });
            } else if (isValidCategory) {
                setSearchParams({ category: filter, page: currentPage + 1 });
            }
        }
    };

    // Previous page
    const prevPage = () => {
        if (currentPage > 1) {
            if (hasSearch) {
                setSearchParams({ search: searchValue, page: currentPage - 1 });
            } else if (isValidCategory) {
                setSearchParams({ category: filter, page: currentPage - 1 });
            }
        }
    };
    const handleClickSubmit = (value) => {
        const search = value.charAt(0).toUpperCase() + value.slice(1);
        setSearchParams({ search, page: 1 });
    };

    return(
        <>
            {/* Navbar */}
            <Navigation onSubmit={handleClickSubmit} />
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
                    className={`whitespace-nowrap cursor-pointer border-2 border-amber-600 hover:text-white hover:border-white hover:rounded-sm p-1 ${filter === meal.strCategory ? "border-white text-white     rounded-sm" : ""} `} onClick={() => handleClickFilter(meal.strCategory)}
                    >
                    {meal.strCategory}
                    </p>
                ))}
            </div>


            {/* Count recipes */}
            <div className="mt-4 mx-24 ">
                <p>You have <span className="font-bold h-[3rem]">{filteredLists.length}</span> recipes to try</p>
            </div>

            {/* Lists */}

                {
                    hasSearch || isValidCategory ?
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4 mx-4 md:mx-24">
                            { filteredLists.slice(firstIndex,lastIndex).map((list) => (
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
                <p className="cursor-pointer hover:text-amber-600" onClick={() => prevPage()} >Prev</p>
                <p className="cursor-pointer hover:text-amber-600" onClick={() => nextPage()} >Next</p>
            </div>

            {/* Footer */}
            <Footer/>
        </>
    )
}

export default Home;