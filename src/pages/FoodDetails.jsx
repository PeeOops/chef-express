import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const FoodDetails = () => {
    return(
        <>
            <div className="flex flex-col px-28 mt-6">
                <div className="flex flex-row items-center gap-2 cursor-pointer hover:text-amber-600">
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <p className="font-bold text-lg">Back</p>
                </div>
                
                {/* Header */}
                <div className="flex flex-row gap-8 mt-6">
                    <img src="https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg" alt="" className="w-84 rounded-md" />
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold">Spicy Arrabiata Penne</h1>
                    </div>
                </div>

                {/* Ingredients & Steps */}
                <div>

                </div>
            </div>
        </>


    )
}

export default FoodDetails