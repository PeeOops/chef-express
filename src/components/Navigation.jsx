import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom"

const Navigation = () => {

    const location = useLocation();

    return(
        <div className="flex flex-row place-content-between items-center font-bold text-lg bg-amber-600 shadow-gray-600 shadow-md px-28 py-2">
            <ul className="flex flex-row gap-6 items-center">
                <Link to="/" className={`cursor-pointer ${location.pathname === "/" ? "text-white" : "text-black" }`}>Home</Link>
                <Link to="/favourite" className={`cursor-pointer ${location.pathname === "/favourite" ? "text-white" : "text-black" }`}>Favourites</Link>
            </ul>
            <div className="flex flex-row gap-2 items-center">
                <input type="text" className="focus:outline-none border-b-1 p-1" placeholder="Search recipes..." />
                <button className="cursor-pointer">Search</button>
            </div>
        </div>
    )
}

export default Navigation