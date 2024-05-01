import { useState } from 'react';
import RouteConstant from '../../constants/route.constants';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const AppFooter = () => {
    const [openContactUs, setOpenContactUs] = useState<number | null>(null);
    const navigateToExternalLink = (externalLink: string) => {
        window.open(externalLink, '_blank')
    };

    const containerStyle = {
        width: '100%',
        height: '65px',
    };

    const toggleSection = (contactUsIndex: number) => {
        setOpenContactUs(openContactUs === contactUsIndex ? null : contactUsIndex);
    };

    const contactUses = [
        { name: ' Bangalore office', title: 'Desri Naturals Pvt ltd', address: "#3, N P Complex, Opp Shree Madduramma Temple,Nagarabhavi Circle, Bangalore ", phoneNumber: "+91 86607 78953 / 99725 58111", location: { lat: 13.039400, lng: 77.622850 } },
        { name: ' Mysore office', title: 'Desri Naturals Pvt ltd', address: "Shop # 10, J S S College Doctor’s Quarters Complex, Adjacent to Karnataka Bank,  Ramanuja Road, Mysore 570004 ", phoneNumber: "+91 81058 63435", location: { lat: 12.308440, lng: 76.653930 } },
        { name: ' Mfg Plant 1', title: 'Desri Naturals Pvt ltd', address: "Behind Govt School Adaganahalli Village, K R Nagar, Mysore", phoneNumber: "99458 11771 / 95133 32525 / 99723 74918", location: { lat: 12.4346871, lng: 76.3401472 } },
        { name: ' Mfg Plant 2', title: 'Desri Naturals Pvt ltd', address: "Rajanapalya, Magadi Taluk, Ramanagar", phoneNumber: "95133 32525 / 99458 11771 / 99723 74918", location: { lat: 12.9837658, lng: 77.3248077 } },
    ];

    return (
        <div className="pt-6 px-6 footer text-white">
            <div className=''>
                <div className='text-dim'>For any information call us at <span className='fa fa-phone'></span> 7 8 9 10 11 554</div> <br />
                <div className='text-dim'>Contact us and we will be more than happy to assist you</div><br />
            </div>
            <div className="grid justify-content-between text-white">
                <div className='col-12 md:col-4'>
                    <h5 className='text-white'>Contact us</h5>
                    <hr className='py-2' />

                    {contactUses.map((contactUs, index) => (

                        <div key={index} >
                            <div className="collapase-header" onClick={() => (toggleSection(index))}>
                                <span className='fa fa-house-chimney icon'></span>{contactUs.name}  <span className={openContactUs == index ? 'fa fa-minus' : 'fa fa-plus'} ></span></div>
                            {openContactUs == index &&
                                <>
                                    <div className='collapase-content grid py-3' >
                                        <div className='contactus-footer-map col-3 xs:col-12'>
                                            <LoadScript googleMapsApiKey="AIzaSyDL9J82iDhcUWdQiuIvBYa0t5asrtz3Swk">
                                                <GoogleMap
                                                    mapContainerStyle={containerStyle}
                                                    center={contactUs.location}
                                                    zoom={10}
                                                >
                                                    <Marker position={contactUs.location}></Marker>
                                                </GoogleMap>
                                            </LoadScript>
                                        </div>
                                        <div className='contact-details col-9 xs:col-12' >
                                            <div className='contact-details-title'></div>
                                            {contactUs.address} <br />
                                            <br />
                                            {contactUs.phoneNumber}
                                        </div>
                                    </div>
                                    <hr className='contact-hr-divider' />
                                </>
                            }

                        </div>
                    ))}
                </div>
                <div className='col-12 md:col-4 information'>
                    <h5 className='text-white'>Information</h5>
                    <hr className='py-2' />
                    <div className='information-link'
                        onClick={() => {
                            navigateToExternalLink(RouteConstant.aboutUs);
                        }}>About Us</div>
                    <div className='information-link'
                        onClick={() => {
                            navigateToExternalLink(RouteConstant.privacyPolicy);
                        }}>Privacy Policy</div>
                    <div className='information-link'
                        onClick={() => {
                            navigateToExternalLink(RouteConstant.termsAndConditions);
                        }}>Terms and Conditions</div>
                    <div className='information-link'
                        onClick={() => {
                            navigateToExternalLink(RouteConstant.returnPolicy);
                        }}
                    >Return Policy</div>

                </div>
                <div className='col-12 md:col-4 social-icons'>
                    <h5 className='text-white'>Keep connected</h5>
                    <hr className='py-2' />
                    <div className='social-link'
                        onClick={() => {
                            navigateToExternalLink("https://www.facebook.com/DesiriBullDrivenGhanaOils");
                        }}
                    ><span className='fa-brands fa-facebook-f'></span>
                        Facebook
                    </div>
                    <div className='social-link'
                        onClick={() => {
                            navigateToExternalLink("https://wa.me/7891011554");
                        }}><span className='fa-brands fa-whatsapp'></span>Whatsapp</div>
                    <div className='social-link'
                        onClick={() => {
                            navigateToExternalLink("https://www.youtube.com/channel/UC7b0vLUUzM4osAul1odBspg");
                        }}><span className='fa-brands fa-youtube'></span>Youtube</div>
                    <div className='social-link'
                        onClick={() => {
                            navigateToExternalLink("https://www.instagram.com/desiri_naturals/");
                        }}><span className='fa-brands fa-instagram'></span>Instagram</div>
                    <div className='social-link'
                        onClick={() => {
                            navigateToExternalLink("https://twitter.com/DesiriNaturals");
                        }}><span className='fa-brands fa-x-twitter'></span>Twitter X</div>

                </div>


            </div>
            <div className='flex flex-column align-items-center text-dim py-2'>
                &copy; farm2me.in {new Date().getFullYear()} - All Rights Reserved
            </div>
        </div>
    );
};

export default AppFooter;
