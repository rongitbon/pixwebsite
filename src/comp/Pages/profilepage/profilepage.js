import React, { Component } from "react";
import { connect } from 'react-redux';

import CardsScroll from '../../cards/cardsscroll.js';
import Toolbar from '../../toolbar/toolbar.js';
import Backdrop from "../../backdrop/backdrop.js";
import Message from '../../message/message.js';
import Footer from '../../footer/footer.js';
import Loader from '../../loader/loader.js';
import * as card from  '../../../store/actions/index.js';
import * as actionType from '../../../store/actions/actionType.js';
import './profilepage.scss';
import vogggid from "../../../img/niko-photos-333391-unsplash.jpg";

class Profilepage extends Component {
    componentWillMount() {
        if (this.props.user.id) {
            this.props.getUserCards(this);
        }
        else {
            console.log("error");
        }
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

        return (
            <div className="profilepage">
                <Toolbar />
                <div className="profilepage-pos">
                    <div className="row profilepage-height" >
                        <div className="col-1-of-4">
                            <div className='profilepage-profile'>
                                <img className='profilepage-profile-img' src={vogggid}>
                                </img>
                                <h2 className='profilepage-profile-h'>
                                    bhfhgf fg
                                </h2>
                                <p className='profilepage-profile-content'>
                                    jhnkljkjil ioihukhlkjhjk  huhuhuyhu  hjk h jkh  yu hijhuhu yuy uyh ui yu yiuyui yu k y  uyu j yy   uyukhyuk hh jh k   gugh kj 
                                </p>
                            </div>
                        </div>
                        <div className="col-3-of-4  profilepage-book" style={{textAlign:this.props.loading?"center":null}}>
                        <Loader load={this.props.loading}>
                            <CardsScroll />
                        </Loader>
                        </div>
                    </div>
                </div>
                <Footer />
                {this.props.errorCardScroll?errorMsg("cardScroll", this.props.errorCardScrollMessage):null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.account.user,
        loading: state.form.loading.cardScroll,
        errorCardScroll: state.form.errorForm.cardScroll["error"],
        errorCardScrollMessage: state.form.errorForm.cardScroll.content
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getUserCards: (comp) => dispatch( card.getUserCards(
            comp.props.user.id
            )
        ),
        closeErrorMessage: (comp) => dispatch({ type: actionType.CLOSE_ERROR_MESSAGE,
            comp: comp})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profilepage);