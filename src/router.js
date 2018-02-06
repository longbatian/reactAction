import React from 'react';
import PropTypes from 'prop-types';
import Header from './components/header'


import Root from './root'
import MusicList from './page/musiclist'
import Footer from "./footer"
import { connect } from 'dva';
// import dva,{ connect } from 'dva';

import { Router, Route, Switch ,Link , IndexRouter } from 'dva/router';
// import Pubsub from 'pubsub-js';



function RouterConfig({ history}) {
	// console.log(history)
	// $("#player").jPlayer({
	// 		ready: function () {
	// 			$(this).jPlayer("setMedia", {
	// 				mp3: "http://oj4t8z2d5.bkt.clouddn.com/%E9%A3%8E%E7%BB%A7%E7%BB%AD%E5%90%B9.mp3"
	// 			}).jPlayer('play');
	// 		},
	// 		supplied: "mp3",
	// 		wmode: "window",
	// 		useStateClassSkin: true
	// 	});
	
  return (
    <Router history={history}>
        <div>
          <Header/>
          <Route exact path="/" component={Root}/>
          <Route path="/list" component={MusicList}/>
          <Footer/>
        </div>
      </Router>
  );
}

export default RouterConfig;
