import React, {Component} from 'react';
import { connect } from 'react-redux';

import * as actionType from '../../../store/actions/actionType.js';
import BtnAn from '../../button/btn-an.js';
import BtnLink from '../../button/btn-link.js';
import Toolbar from '../../toolbar/toolbar.js';
import FormMain from "../../form/form-main.js";
import video from '../../../img/PexelsVideos1246875.mp4';
import CardList from '../../cards/cardlist.js';
import Hsecondary from '../../heading-secondary/h-secondary';
import Backdrop from "../../backdrop/backdrop.js";
import Footer from '../../footer/footer.js';
import Message from '../../message/message.js';
import './homepage.scss';

class Homepage extends Component {
    constructor() {
        super();
        this.state = {
            height: document.body.clientHeight,
            width: document.body.clientWidth
        }

        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    updateDimensions() {
        this.setState({
            height: document.body.clientHeight,
            width: document.body.clientWidth
        });
    }

    render() { 
        const errorMsg = (comp, error_msg) => {
            return(
            <div>
              <Backdrop show={true} clicked={() => this.props.closeErrorMessage(comp)} zindex={1004} />
              <Message 
                header={comp + " error"} 
                content={error_msg}
                btn_clicked={() => this.props.closeErrorMessage(comp)}
                cancel_clicked={() => this.props.closeErrorMessage(comp)}/>
            </div>
          );
        };
        console.log(this.state.width);
        return (
            <div>
                <Toolbar />
                <header className="h">
                <div className="h-box">
                    <h1 className="h-primary">
                        <span className="h-primary-m">PixWebsite</span>
                        <span className="h-primary-s">The house of the pixels</span>
                    </h1>

                    <BtnAn className="btn-an" text="Go to gallery" color='white' />
                </div>
                    
                </header>

                <main>
                    <section className="section-show-1">
                        <Hsecondary text="most popular pixel pictures" />
                        <div className="heading-margin"></div>
                        <CardList width={this.state.width} character_type="robotV1"/>
                        <BtnLink text="to see more" />
                    </section>
                    <section className="section-show-2">
                        <Hsecondary color="white" text="most popular pixel pictures" />
                        <div className="heading-margin"></div>
                        <CardList width={this.state.width} character_type="robotV2"/>
                        <BtnLink color="white" text="to see more" />
                    </section>
                    <section className="section-show-1">
                        <Hsecondary text="most popular pixel pictures" />
                        <div className="heading-margin"></div>
                        <CardList width={this.state.width} character_type="kitten"/>
                        <BtnLink text="to see more" />
                    </section>
                    <section className="section-show-end">
                        <div className="bg-video">
                            <video className="bg-video-content" autoPlay loop muted>
                                <source  src={video} type="video/mp4"></source>
                                lorem sdsaaaaaaaaaaaaaaaaaaaaaaaaa
                            </video>
                        </div>
                        <div className="form-home-signup">
                            <FormMain />
                        </div>
                        
                    </section>
                </main>
                <Footer />
                {this.props.errorSignup?errorMsg("signup", this.props.errorSignupMessage):null}
                {/*
                <section className="grid-test">
                    <div className="row">
                        <div className="col-1-of-2">hi</div>
                        <div className="col-1-of-2">hi</div>
                    </div>

                    <div className="row">
                        <div className="col-1-of-3">hi</div>
                        <div className="col-1-of-3">hi</div>
                        <div className="col-1-of-3">hi</div>
                    </div>

                    <div className="row">
                        <div className="col-1-of-3">hi</div>
                        <div className="col-2-of-3">hi</div>
                    </div>

                    <div className="row">
                        <div className="col-1-of-4">hi</div>
                        <div className="col-1-of-4">hi</div>
                        <div className="col-1-of-4">hi</div>
                        <div className="col-1-of-4">hi</div>
                    </div>

                    <div className="row">
                        <div className="col-1-of-4">hi</div>
                        <div className="col-1-of-4">hi</div>
                        <div className="col-2-of-4">hi</div>
                    </div>

                    <div className="row">
                        <div className="col-1-of-4">hi</div>
                        <div className="col-3-of-4">hi</div>
                    </div>
                </section> */}
            </div>
        );
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }
}

const mapStateToProps = state => {
    return {
        errorSignup: state.form.errorForm.signup["error"],
        errorSignupMessage: state.form.errorForm.signup.content
    };
}

const mapDispatchToProps = dispatch => {
    return {
        closeErrorMessage: (comp) => dispatch({ type: actionType.CLOSE_ERROR_MESSAGE,
                                                comp: comp})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);