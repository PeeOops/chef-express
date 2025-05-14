import Navigation from "../components/Navigation";
import Hero from "../assets/images/hero.jpg";

const Home = () => {
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
            <section className="relative h-[400px] w-full overflow-hidden">
                <img
                    src={Hero}
                    alt="Hero image"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="relative z-10 flex items-center justify-center h-full text-white bg-black/50">
                    <h1 className="text-4xl font-bold">Your next meal starts here</h1>
                </div>
            </section>
        </>
    )
}

export default Home;