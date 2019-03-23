import React from 'react';
import { connect } from 'react-redux';

import BtnLinkV2 from '../button/btn-link-v2.js';
import * as actionType from '../../store/actions/actionType.js';
import './footer.scss';

const Footer = (props) => {
    return (
        <footer className="footer">
            <div className="row">
                <div className="col-1-of-2">
                    <div className="footer-nav">
                        <ul className="footer-nav-list">
                            <li className="footer-nav-list-item"><BtnLinkV2 text={"Home"} path="/"/></li>
                            <li className="footer-nav-list-item"><BtnLinkV2 text={"gallery"} path="/gallery" /></li>
                            <li className="footer-nav-list-item"><BtnLinkV2 text={"about"} path="/profile"/></li>
                            {
                                props.loggedIn?
                                    <li className="footer-nav-list-item" onClick={props.signout}><BtnLinkV2 text={"Sign out"} /></li>:
                                    <li className="footer-nav-list-item" onClick={props.openLoginFrom}><BtnLinkV2 text={"Login"} /></li>
                            }
                            <li className="footer-nav-list-item" onClick={props.openCart}><BtnLinkV2 text={"cart"} /></li>
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

const mapStateToProps = state => {
    return {
        loggedIn: state.account.loggedIn,
        loginFrom: state.form.loginFrom
    };
}

const mapDispatchToProps = dispatch => {
    return {
        openLoginFrom: () => dispatch({ type: actionType.OPEN_LOGIN_FORM}),
        closeLoginFrom: () => dispatch({ type: actionType.CLOSE_LOGIN_FORM}),
        signout: () => dispatch({type: actionType.SIGNOUT}),
        openCart: () => dispatch({type: actionType.OPEN_CART_PAGE})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);