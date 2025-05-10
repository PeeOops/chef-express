const Navigation = () => {
    return(
        <div className="flex flex-row place-content-between items-center font-bold text-lg bg-amber-400 px-24 py-2">
            <ul className="flex flex-row gap-6 items-center">
                <li className="cursor-pointer">Home</li>
                <li className="cursor-pointer">Favourites</li>
            </ul>
            <div className="flex flex-row gap-2 items-center">
                <input type="text" className="focus:outline-none border-b-1 p-1" placeholder="Search recipes..." />
                <button className="cursor-pointer">Search</button>
            </div>
        </div>
    )
}

export default Navigation