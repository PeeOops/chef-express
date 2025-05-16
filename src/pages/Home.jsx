import Navigation from "../components/Navigation";
import Hero from "../assets/images/hero.jpg";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

const Home = () => {

    const [category, setCategory] = useState([]);
    const [filter, setFilter] = useState("Beef");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoryURL] = await Promise.all([
                    fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list").then((res) => {
                        if(!res.ok){
                            throw new Error("Fetch data failed")
                        }
                        return res.json();
                    }),
                ])
                setCategory(categoryURL.meals);
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    },[])

    const handleClickFilter = (filter) => {
        setFilter(filter);
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4 mx-4 md:mx-24">
                 <div className="flex flex-col items-center justify-center bg-white shadow-gray-600 shadow-md rounded-sm p-2 w-full">
                    <img src="https://www.themealdb.com/images/media/meals/1548772327.jpg" alt="Baked salmon with fennel & tomatoes" className="w-3/4 rounded-sm" />
                    <p className="font-bold h-[3rem] text-center">Baked salmon with fennel & tomatoes</p>
                </div>
            
                <div className="flex flex-col items-center justify-center bg-white shadow-gray-600 shadow-md rounded-sm p-2 w-full">
                    <img src="https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg" alt="Cajun spiced fish tacos" className="w-3/4 rounded-sm" />
                    <p className="font-bold h-[3rem] text-center">Cajun spiced fish tacos</p>
                </div>

                <div className="flex flex-col items-center justify-center bg-white shadow-gray-600 shadow-md rounded-sm p-2 w-full">
                    <img src="https://www.themealdb.com/images/media/meals/1520084413.jpg" alt="Escovitch Fish" className="w-3/4 rounded-sm" />
                    <p className="font-bold h-[3rem] text-center">Escovitch Fish</p>
                </div>

                <div className="flex flex-col items-center justify-center bg-white shadow-gray-600 shadow-md rounded-sm p-2 w-full">
                    <img src="https://www.themealdb.com/images/media/meals/a15wsa1614349126.jpg" alt="Fish fofos" className="w-3/4 rounded-sm" />
                    <p className="font-bold h-[3rem] text-center">Fish fofos</p>
                </div>

                <div className="flex flex-col items-center justify-center bg-white shadow-gray-600 shadow-md rounded-sm p-2 w-full">
                    <img src="https://www.themealdb.com/images/media/meals/ysxwuq1487323065.jpg" alt="Fish pie" className="w-3/4 rounded-sm" />
                    <p className="font-bold h-[3rem] text-center">Fish pie</p>
                </div>

                <div className="flex flex-col items-center justify-center bg-white shadow-gray-600 shadow-md rounded-sm p-2 w-full">
                    <img src="https://www.themealdb.com/images/media/meals/7n8su21699013057.jpg" alt="Fish Soup (Ukha)" className="w-3/4 rounded-sm" />
                    <p className="font-bold h-[3rem] text-center">Fish Soup (Ukha)</p>
                </div>

                <div className="flex flex-col items-center justify-center bg-white shadow-gray-600 shadow-md rounded-sm p-2 w-full">
                    <img src="https://www.themealdb.com/images/media/meals/vptqpw1511798500.jpg" alt="Fish Stew with Rouille" className="w-3/4 rounded-sm" />
                    <p className="font-bold h-[3rem] text-center">Fish Stew with Rouille</p>
                </div>

                <div className="flex flex-col items-center justify-center bg-white shadow-gray-600 shadow-md rounded-sm p-2 w-full">
                    <img src="https://www.themealdb.com/images/media/meals/wuvryu1468232995.jpg" alt="Garides Saganaki" className="w-3/4 rounded-sm" />
                    <p className="font-bold h-[3rem] text-center">Garides Saganaki</p>
                </div>

                <div className="flex flex-col items-center justify-center bg-white shadow-gray-600 shadow-md rounded-sm p-2 w-full">
                    <img src="https://www.themealdb.com/images/media/meals/lpd4wy1614347943.jpg" alt="Grilled Portuguese sardines" className="w-3/4 rounded-sm" />
                    <p className="font-bold h-[3rem] text-center">Grilled Portuguese sardines</p>
                </div>

                <div className="flex flex-col items-center justify-center bg-white shadow-gray-600 shadow-md rounded-sm p-2 w-full">
                    <img src="https://www.themealdb.com/images/media/meals/xxyupu1468262513.jpg" alt="Honey Teriyaki Salmon" className="w-3/4 rounded-sm" />
                    <p className="font-bold h-[3rem] text-center">Honey Teriyaki Salmon</p>
                </div>

                <div className="flex flex-col items-center justify-center bg-white shadow-gray-600 shadow-md rounded-sm p-2 w-full">
                    <img src="https://www.themealdb.com/images/media/meals/utxqpt1511639216.jpg" alt="Kedgeree" className="w-3/4 rounded-sm" />
                    <p className="font-bold h-[3rem] text-center">Kedgeree</p>
                </div>

                <div className="flex flex-col items-center justify-center bg-white shadow-gray-600 shadow-md rounded-sm p-2 w-full">
                    <img src="https://www.themealdb.com/images/media/meals/1525873040.jpg" alt="Kung Po Prawns" className="w-3/4 rounded-sm" />
                    <p className="font-bold h-[3rem] text-center">Kung Po Prawns</p>
                </div>
            </div>

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