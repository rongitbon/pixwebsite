import React from 'react';
import './footer.scss';
import BtnLinkV2 from '../button/btn-link-v2.js';

const Footer = (props) => {
    return (
        <footer className="footer">
            <div className="row">
                <div className="col-1-of-2">
                    <div className="footer-nav">
                        <ul className="footer-nav-list">
                            <li className="footer-nav-list-item"><BtnLinkV2 text={"dasdsa"} /></li>
                            <li className="footer-nav-list-item"><BtnLinkV2 text={"dasdsa"} /></li>
                            <li className="footer-nav-list-item"><BtnLinkV2 text={"dasdsa"} /></li>
                            <li className="footer-nav-list-item"><BtnLinkV2 text={"dasdsa"} /></li>
                            <li className="footer-nav-list-item"><BtnLinkV2 text={"dasdsa"} /></li>
                        </ul>
                    </div>
                </div>
                <div className="col-1-of-2">
                    <p className="footer-copyright">
                        This is a concept site<br/>
                        The products on this site are not for sale and anyone can get them for free<br/>
                        The images of this site were taken from <BtnLinkV2 text={"https://robohash.org/"} href={"https://robohash.org/"} /> and <BtnLinkV2 text={"https://unsplash.com/"} href={"https://unsplash.com/"} />
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;