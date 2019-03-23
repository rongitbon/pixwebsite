import React from 'react';
import Toolbar from '../../toolbar/toolbar.js';
import Hsecondary from '../../heading-secondary/h-secondary';
import Footer from '../../footer/footer.js';
import "./aboutpage.scss";

const Aboutpage = () => {
    return (
        <div className="aboutpage">
            <Toolbar />
            <div className="aboutpage-content">
                <Hsecondary text="about"/>
            </div>
            <Footer />
        </div>
    );
}

export default Aboutpage;