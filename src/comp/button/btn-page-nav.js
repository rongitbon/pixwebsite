import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import './btn-page-nav.scss';

const BtnPageNav = (props) => {
    console.log(props);
    return (
        <NavLink
            to={props.match.path + (!isNaN(props.num)? "/" + props.num: "")}
            className={(props.current?' btn-page-nav-current':"btn-page-nav")}
        >
            <div 
                className={(props.current?' btn-page-nav-current-btn':"btn-page-nav-btn")}
                onClick={props.clicked}>
                {props.text}
            </div>
        </NavLink>
    );
}

export default withRouter(BtnPageNav);

//<div 
//            onClick={props.clicked} 
 //           className={'btn-page-nav btn-page-nav-' + props.color  
 //                   + (props.current?' btn-page-nav-current':"")}>
  //          <NavLink
   //             className={"btn-page-nav-btn"+ (props.current?' btn-page-nav-btn-current':"")}
   //             >{props.text}</NavLink>
   //     </div>