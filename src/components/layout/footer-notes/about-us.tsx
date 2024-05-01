import AppFooter from "../AppFooter";

const AboutUs = () => {
    return (
        <>
            <div className="grid">
                <div className="col-12">
                    <div className="card docs">
                        <h4>About us:</h4>
                        <p>“Farm2Me” is dream child of three corporate professionals. After working 20+ years in corporate, three techies decided to say "Good Bye" to highly paying corporate jobs and ventured to extract the Edible Oil through age old traditional methods.
                            Farm2Me venture emerged just not to extract the edible oils but also engaged in resolving many social problems. Farm2Me vision is to have “Chemical Free Food Plate”.</p>

                        <p>To know more about Farm2Me’s work and project we request to visit our website <a href={process.env.REACT_APP_URL}>farm2Me.com</a> or visit our plants or stores where in address mentioned in Contact us page.</p>
                    </div>
                </div>
            </div>
            <AppFooter />
        </>
    );
};

export default AboutUs;
