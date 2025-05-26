import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

const Favourites = () => {
    return(
        <>
            {/* Navbar */}
            <Navigation />
            
            {/* Content */}
            <div role="button" className="flex flex-col md:flex-row gap-6 mx-4 md:mx-28 p-8 mt-6 bg-white rounded-md shadow-gray-600 shadow-md">
                <img src="https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg" alt="" className="w-full md:w-72 mx-auto rounded-md" />
                <div className="flex flex-col gap-2">
                    <h1 className="font-bold text-3xl  md:text-3xl">Teriyaki Chicken Casserole</h1>
                    <div>
                        <p className="text-lg"><span className="font-bold">Cuisine:</span> Japan</p>
                        <p className="text-lg"><span className="font-bold">Category:</span> Chicken</p>
                        <p className="text-lg"><span className="font-bold">Tags:</span> Chicken, Meat</p>
                    </div>
                    <div className="flex flex-row gap-2">
                        <button className="text-black p-1 font-bold rounded-sm cursor-pointer hover:text-white hover:bg-amber-600 
                        active:text-white active:bg-amber-600 border-2 border-black w-fit">View Recipe</button>
                        <button className="text-black p-1 font-bold rounded-sm cursor-pointer hover:text-white hover:bg-amber-600 
                        active:text-white active:bg-amber-600 border-2 border-black w-fit">Delete</button>
                    </div>
                    
                </div>

            </div>

            {/* Footer */}
            <Footer />
            
            
        </>
    )
}

export default Favourites;