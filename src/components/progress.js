import React from 'react';
import progress from './progress.less'
import Pubsub from 'pubsub-js';
let Progress=React.createClass({
	getDefaultProps(){
		return {
			barColor:"red"
		}
	},
	changeProgress(e) {
		let progressBar=this.refs.progressBar;
		let progress=(e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
		// console.log(progress)
		this.props.onProgressChange && this.props.onProgressChange(progress);
		Pubsub.publish('PLAY_PAUSE');
	},
	render(){
		return(
			<div className={progress['components-progress']}
				onClick={this.changeProgress}
				ref="progressBar"
			>
				<div className={progress.progress} 
				style={{width:`${this.props.progress}%`,background:`${this.props.barColor}`}}></div>
				
			</div>
		)
	}
})

export default Progress;