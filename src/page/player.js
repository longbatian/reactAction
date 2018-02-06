// import React from 'react';
import React, { Component } from 'react';
import Progress from '../components/progress'
import styles from './player.less'
import { Link } from 'react-router-dom';
import icons from './../static/css/common.css'
import Pubsub from 'pubsub-js';

let duration=null;

class Player extends Component{
	
// let Player = React.createClass({
	// getInitialState(){
	// 	return{
	// 		progress:'-'
	// 	}
	// },
	constructor(props) {
		super(props);
		this.state = {
			progress:0,
			volume:0,
			isPlay:true,
			modify:false,
			leftTime:'',
		};
		
	}
	
	componentDidMount(){

		$("#player").bind($.jPlayer.event.timeupdate, (e) => {
				duration=e.jPlayer.status.duration;
				this.setState({
					volume:e.jPlayer.options.volume*100,
					progress: e.jPlayer.status.currentPercentAbsolute,
					leftTime:this.formatTime(duration * (1-e.jPlayer.status.currentPercentAbsolute/100))
				});
		});
		Pubsub.subscribe('PLAY_PAUSE',() =>{
			this.playPause()
		});

	}
	playPause = () => {
		this.setState({
			isPlay:this.state.isPlay ? 'false' : 'true'
		})
	}
	componentWillUnmout() {
		
		$("#player").unbind($.jPlayer.event.timeupdate);
		Pubsub.unsubscribe('PLAY_PAUSE')

	}
	progressChangeHandler(progress){
		$('#player').jPlayer('play',duration*progress)
	}
	changeVolumeHanler(progress){
		$('#player').jPlayer('volume',progress)
	}
	playNext = () => {
		Pubsub.publish('PLAY_NEXT');
	}
	playPrev = () => {
		Pubsub.publish('PLAY_PREV');
	}
	formatTime = (time) => {
		time=Math.floor(time);
		let miniutes = Math.floor(time/60);
		let seconds=Math.floor(time%60);
		seconds = seconds < 10 ? `0${seconds}` : seconds;
		return `${miniutes}:${seconds}`;
	}
	play = () => {
		if(this.state.isPlay){
			$('#player').jPlayer('pause');
		}else{
			$('#player').jPlayer('play');
		}
		this.setState({

			isPlay:!this.state.isPlay
		})
	}

	render(){
		// console.log(this.props)
		return(
			<div className={styles['player-page']}>
				<h1 className={styles.caption}><Link to="/list">我的私人音乐坊&gt;</Link> </h1>
                <div className={icons.mt20+" "+icons.row}>
                	<div className={styles["controll-wrapper"]}>
                		<h2 className={styles["music-title"]}>
                		{this.props.cuerrentMusicItem.title}</h2>
                		<h3 className={styles["music-artist"]+" "+styles.mt10}>
                		{this.props.cuerrentMusicItem.artist}</h3>
                		<div className={icons.row+" "+icons.mt20}>
                			<div
                			 className={styles["left-time"]+" "+icons["-col-auto"]}>
                				-{this.state.leftTime}
                			</div>
                			<div className={styles["volume-container"]}>
                				<i className={icons["icon-volume"]+" "+icons.rt+" "+icons.icon} 
                				style={{top: 5, left: -5}}></i>
                				<div className={styles["volume-wrapper"]}>
					                <Progress
										progress={this.state.volume}
										onProgressChange={this.changeVolumeHanler}
										barColor='#aaa'
					                >
					                </Progress>
                				</div>
                			</div>
                		</div>
                		<div style={{height: 10, lineHeight: '10px'}}>
			                <Progress
								progress={this.state.progress}
					onProgressChange={this.progressChangeHandler}
			                >
			                </Progress>
                		</div>
                		<div className={styles.mt35+" "+icons.row}> 
                			<div>
	                			<i className={icons.icon+" "+icons.prev} onClick={this.playPrev}></i>
	                			<i 
	                			className={icons.icon +" "+styles.ml20+" "+
	                			icons[`${this.state.isPlay ? 'pause' : 'play'}`]}
	                			onClick={this.play}
	                			></i>
	                			<i className={icons.icon+" "+icons.next+" "+styles.ml20} 
	                			onClick={this.playNext}></i>
                			</div>
                			<div className={icons["-col-auto"]}>
                				<i className={icons.icon+" "+icons.xunhuan} ></i>
                			</div>
                		</div>
                	</div>
                	<div className={icons["-col-auto"]+" "+styles.cover}>
                		<img src={this.props.cuerrentMusicItem.cover} 
                		alt={this.props.cuerrentMusicItem.artist}/>
                	</div>
                </div>		
			</div>
		)
	}
}
// )
export default Player;

