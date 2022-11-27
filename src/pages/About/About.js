import React from "react";
import ScrollToTop from "react-scroll-to-top";
import BottomBar from "../../components/Main/BottomBar/BottomBar";
import BottomNavBar from "../../components/Main/BottomBar/BottomNavBar";
import NavBar from "../../components/Main/TopBar/NavBar";
import PrimaryBar from "../../components/Main/TopBar/PrimaryBar";
import SecondaryBar from "../../components/Main/TopBar/SecondaryBar";

const About = () => {
    return(
    <React.Fragment>
        <div style={{backgroundImage:"img/aboutus.jpeg"}}>

        <ScrollToTop />
        <div className="container-fluid">
        <div className="row bg-secondary py-1 px-xl-5">
            <PrimaryBar />
        </div>
        <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
            <SecondaryBar />
        </div>
    </div>

    <div className="container-fluid bg-dark mb-30">
        <NavBar />
    </div>

        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}} className="About-us-info">
           
            <ul style={{listStyle:'none'}}>
                <li>
                <h1 style={{color:'white'}}>About Us</h1>
            <h4 style={{color:'#FFD333'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 


            </h4>
            <p style={{color:'whitesmoke'}}>
          Donec molestie interdum enim. Quisque feugiat ligula et interdum pretium. Quisque luctus nibh ut consectetur facilisis. Aenean euismod lacus ex, et aliquet ligula lobortis vel. Donec ligula eros, posuere aliquet libero vitae, blandit congue quam. Duis varius metus vel finibus sagittis. Cras erat lorem, eleifend nec libero quis, rhoncus dapibus nulla. Maecenas porta diam eros, ut facilisis lacus sollicitudin a. Cras tincidunt mi ut leo vehicula ullamcorper.
          </p>
                </li>
                <li>
            <h1 style={{color:'white'}}>How It Started</h1>
            <h4 style={{color:'#FFD333'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 


            </h4>
          <p style={{color:'whitesmoke'}}>
          Donec molestie interdum enim. Quisque feugiat ligula et interdum pretium. Quisque luctus nibh ut consectetur facilisis. Aenean euismod lacus ex, et aliquet ligula lobortis vel. Donec ligula eros, posuere aliquet libero vitae, blandit congue quam. Duis varius metus vel finibus sagittis. Cras erat lorem, eleifend nec libero quis, rhoncus dapibus nulla. Maecenas porta diam eros, ut facilisis lacus sollicitudin a. Cras tincidunt mi ut leo vehicula ullamcorper.
          </p>

                </li>
                <li>
            <h1 style={{color:'white'}}>How It Is Going</h1>
            <h4 style={{color:'#FFD333'}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 


            </h4>
          <p style={{color:'whitesmoke'}}>
          Donec molestie interdum enim. Quisque feugiat ligula et interdum pretium. Quisque luctus nibh ut consectetur facilisis. Aenean euismod lacus ex, et aliquet ligula lobortis vel. Donec ligula eros, posuere aliquet libero vitae, blandit congue quam. Duis varius metus vel finibus sagittis. Cras erat lorem, eleifend nec libero quis, rhoncus dapibus nulla. Maecenas porta diam eros, ut facilisis lacus sollicitudin a. Cras tincidunt mi ut leo vehicula ullamcorper.
          </p>

                </li>
            </ul>
          
        </div>
    <div className="container-fluid bg-dark text-secondary mt-5 pt-5">
        <BottomBar />
        <BottomNavBar />
    </div>
        </div>
    </React.Fragment>
    );
};

export default About;