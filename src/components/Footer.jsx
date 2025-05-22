const Footer = () => {
    return(
        <div className="flex flex-row place-content-between items-center bg-amber-600 font-bold mt-4 px-8 md:px-24 py-2">
            <div className="flex flex-col items-center">
                <img src="/logo.png" alt="" className="w-10" />
                <p>ChefExpress</p>
            </div>
            <p>Copyright &copy; <span className="text-white">PeeDegrees</span></p>
        </div>
    )
}

export default Footer;