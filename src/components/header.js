import React from 'react';
import headercss from './header.less'

let Header=React.createClass({
	render(){
		return(
			<div className={headercss['components-header']+" "+headercss.row}>

				<img src={require("../../static/images/logo.png")} width='40' alt="" className={headercss['-col-auto']}/>
				<h1 className={headercss.caption}>React Music Player</h1>				
			</div>
		)
	}
})

export default Header;