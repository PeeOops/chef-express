import Navigation from "../components/Navigation";
import Hero from "../assets/images/hero.jpg";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const filter = searchParams.get("category") || "Beef";

    // Search
    const [inputValue, setInputValue] = useState("");
    const searchValue = searchParams.get("search") || "";

    // Pagination
    const currentPage = parseInt(searchParams.get("page") || "1");
    const [itemsPerPage, setItemsPerPage] = useState(10);
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

        // Dynamic responsive item list
        const updateItemPerPage = () => {
            const width = window.innerWidth;

            if (width >= 1280) {
                setItemsPerPage(10); // xl
            } else if (width >= 768) {
                setItemsPerPage(9); // md
            } else {
                setItemsPerPage(6); // sm or smaller
            }
        }

        // Default route
        if(window.location.search === ""){
            navigate("?category=Beef&page=1");
        }

        // Fetch data
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
                    setFilteredLists(searchURL.meals || []);
                }else{
                    setFilteredLists(filteredURL.meals || []);
                }
                

            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        }
        updateItemPerPage();
        fetchData();

        // Update on resize
        window.addEventListener("resize", updateItemPerPage);

        // Cleanup
        return () => window.removeEventListener("resize", updateItemPerPage);
        
    },[filter, navigate, searchValue, setSearchParams, itemsPerPage])


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

    // Search
    const handleChangeSearch = (e) => {
        setInputValue(e.target.value);
    }


    const handleClickSearch = () => {
        const search = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
        setSearchParams({ search, page: 1 });
        setInputValue("");
    };

    return(
        <>
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
                    <h1 className="text-2xl md:text-4xl font-bold">Your next meal starts here</h1>
                </div>
            </section>
            {/* Filters */}
            <div className="flex overflow-x-auto space-x-3 mt-4 mx-4 md:mx-24 p-2 bg-amber-600 shadow-gray-600 shadow-md rounded-md font-bold scrollbar-hide">
                {category.map((meal) => (
                    <p role="button"
                    key={meal.strCategory}
                    className={`whitespace-nowrap cursor-pointer border-2 border-amber-600 hover:text-white hover:border-white hover:rounded-sm p-1 ${filter === meal.strCategory ? "border-white text-white     rounded-sm" : ""} `} onClick={() => handleClickFilter(meal.strCategory)}
                    >
                    {meal.strCategory}
                    </p>
                ))}
            </div>


            {/* Count recipes */}
            <div className="flex flex-row justify-between items-center mt-4 mx-6 md:mx-24 ">
                <p>You have <span className="font-bold h-[3rem]">{filteredLists.length}</span> recipes to try</p>
                <div className="flex flex-row gap-2 items-center font-bold">
                    <input type="text" className="focus:outline-none border-b-1 p-1" placeholder="Search recipes..." onChange={handleChangeSearch} onKeyDown={(e) => e.key === "Enter" && handleClickSearch()} value={inputValue} />
                    <button className="cursor-pointer" onClick={() => handleClickSearch()} >Search</button>
                </div>
            </div>

            {/* Lists */}

                {   
                    loading ? 
                        <div className="grid min-h-full place-items-centerpx-6 py-24 sm:py-32 lg:px-8">
                            <div className="text-center">
                                <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-red-600 sm:text-7xl">
                                    Loading...
                                </h1>
                            </div>
                        </div>
                    :
                    (hasSearch || isValidCategory) && filteredLists.length > 0 ?
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4 mx-4 md:mx-24">
                            { filteredLists.slice(firstIndex,lastIndex).map((list) => (
                                <Link to={`meals/${list.idMeal}`} key={list.idMeal} className="flex flex-col items-center place-content-center bg-white hover:bg-amber-600 hover:text-white active:bg-amber-600 active:text-white shadow-gray-600 shadow-md rounded-sm p-2 w-3/4 md:w-full mx-auto cursor-pointer">
                                    <img src={`${list.strMealThumb}`} className="w-3/4 rounded-sm" alt={list.strMeal} />
                                    <p className="font-bold h-[3rem] md:h-[5rem] text-center">{list.strMeal}</p>
                                </Link>
                            ))}
                        </div>
                    :

                    <div className="grid min-h-full place-items-centerpx-6 py-24 sm:py-32 lg:px-8">
                        <div className="text-center">
                        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance text-red-600 sm:text-7xl">
                            Meals not found
                        </h1>
                        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                            Sorry, we couldn’t find what you’re looking for.
                        </p>
                        </div>
                    </div>
                }
   

            {/* Pagination */}
            <div className="flex flex-row place-content-between items-center font-bold mt-4 mx-24">
                <button className={`cursor-pointer hover:text-amber-600 active:text-amber-600 ${currentPage === 1 ? "invisible" : "visible"}`} onClick={() => prevPage()} >Prev</button>
                <button className={`cursor-pointer hover:text-amber-600 active:text-amber-6004 ${currentPage === Math.ceil(filteredLists.length / itemsPerPage) ? "invisible" : "visible"}`} onClick={() => nextPage()} >Next</button>
            </div>

            {/* Footer */}
            <Footer/>
        </>
    )
}

export default Home;