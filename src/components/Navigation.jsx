import { Link } from "react-router-dom"

const Navigation = () => {
    return(
        <>
            {/* Title */}
            <div className="flex flex-col justify-center items-center my-4">
                <Link to="/?category=Beef&page=1" className="text-4xl font-bold">ChefExpress</Link>
                <p className="text-lg">Explore - Cook - Enjoy</p>
            </div>
            <div className="font-bold text-lg bg-amber-600 shadow-gray-600 shadow-md px-6 md:px-28 py-2">
                <ul className="flex flex-col md:flex-row gap-2 md:gap-6 items-start md:items-center">
                    <Link to="/?category=Beef&page=1" className={`cursor-pointer ${location.pathname === "/" ? "text-white" : "text-black" }`}>Home</Link>
                    <span className="border-1 md:border-0 w-full md:w-auto"></span>
                    <Link to="/favourite" className={`cursor-pointer ${location.pathname === "/favourite" ? "text-white" : "text-black" }`}>Favourites</Link>
                </ul>
            </div>
        </>

    )
}

export default Navigation