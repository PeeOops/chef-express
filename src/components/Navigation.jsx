import { Link } from "react-router-dom"

const Navigation = () => {
    return(
        <>
            {/* Title */}
            <div className="flex flex-col justify-center items-center my-4">
                <h1 className="text-4xl font-bold">ChefExpress</h1>
                <p className="text-lg">Explore - Cook - Enjoy</p>
            </div>
            <div className="flex flex-row place-content-between items-center font-bold text-lg bg-amber-600 shadow-gray-600 shadow-md px-28 py-2">
                <ul className="flex flex-row gap-6 items-center">
                    <Link to="/?category=Beef&page=1" className={`cursor-pointer ${location.pathname === "/" ? "text-white" : "text-black" }`}>Home</Link>
                    <Link to="/favourite" className={`cursor-pointer ${location.pathname === "/favourite" ? "text-white" : "text-black" }`}>Favourites</Link>
                </ul>
            </div>
        </>

    )
}

export default Navigation