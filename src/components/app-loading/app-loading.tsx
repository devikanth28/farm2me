
const AppLoading = () => {

    return (
        <div className="displaygird pause-loading">
            <img src={process.env.PUBLIC_URL +'/assests/images/loader-animated-loading.png'} alt="" width="200" className="loader-animated" />
            <img src={process.env.PUBLIC_URL + '/assests/images/loader-animated-logo.png'} alt="" width="80" className="loader-logo" />
        </div>
    );
};

export default AppLoading;
