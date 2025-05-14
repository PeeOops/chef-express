import Navigation from "../components/Navigation";

const Favourites = () => {
    return(
        <>
            {/* Title */}
            <div className="flex flex-col justify-center items-center my-4">
                <h1 className="text-4xl font-bold">ChefExpress</h1>
                <p className="text-lg">Explore - Cook - Enjoy</p>
            </div>
            {/* Navbar */}
            <Navigation />
        </>
    )
}

export default Favourites;