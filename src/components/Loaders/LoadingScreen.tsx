import Logo from "../Logo";

function LoadingScreen() {
    return (
        <div className="loader">
            <Logo />
            <div className="line mt-5">
                <div className="inner"></div>
            </div>
        </div>
    )
}

export default LoadingScreen;