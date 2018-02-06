import React,{ Component } from 'react';
import { connect } from 'dva';
import Pubsub from 'pubsub-js';

class Footer extends Component {
	constructor(props) {
		super(props);
		this.state={
			modify:false,
		}
	}
	playMusic = (musicItem) =>{
		$('#player').jPlayer('setMedia',{
			mp3:musicItem.file
		}).jPlayer('play');
		this.props.dispatch({
			      type: 'products/modify',
			      payload: musicItem,
		});
		
	}

	playNext = (type="next") =>{
		let index=this.findMusicIndex(this.props.products.currentMussicItem);
		let newIndex=null;
		let musicListLength=this.props.products.musicList.length;
		if(type==="next"){
			newIndex=(index+1)% musicListLength
		}else{
			newIndex=(index-1+ musicListLength)% musicListLength
		}
		
		
		this.playMusic(this.props.products.musicList[newIndex]);
		// console.log(this.props.products.currentMussicItem) 
		Pubsub.publish('NEXT_MUSIC');
		Pubsub.publish('PLAY_PAUSE');
	}


	findMusicIndex=(musicItem) => {
		return this.props.products.musicList.indexOf(musicItem);
	}
	componentDidMount(){
		
		// console.log(this.props.products)
		$("#player").jPlayer({
			// ready: function () {
			// 	$(this).jPlayer("setMedia", {
			// 		mp3: "http://oj4t8z2d5.bkt.clouddn.com/%E9%A3%8E%E7%BB%A7%E7%BB%AD%E5%90%B9.mp3"
			// 	}).jPlayer('play');
			// },
			supplied: "mp3",
			wmode: "window",
			useStateClassSkin: true
		});
		this.playMusic(this.props.products.currentMussicItem);
		$('#player').bind($.jPlayer.event.ended, (e) => {
			this.playNext();
			Pubsub.subscribe('PLAY_MUSIC',(msg,musicItem) =>{
				this.playMusic(musicItem);
			});
		})
		Pubsub.subscribe('PLAY_PREV',() =>{
				this.playNext('prev');
		});
		Pubsub.subscribe('PLAY_NEXT',() =>{
				this.playNext();
		});
		Pubsub.subscribe('DELETE_MUSIC',(msg,musicItem) =>{
			 // () => onDelete(musicItem)
			 // console.log(musicItem)
			this.props.dispatch({
		      type: 'products/delete',
		      payload: musicItem,
		    });
		    this.playNext();
			Pubsub.publish('LIST_NEW');
		});
		Pubsub.subscribe('PLAY_MUSIC',(msg,musicItem) =>{
			this.props.dispatch({
			      type: 'products/modify',
			      payload: musicItem,
			});            
			this.playMusic(musicItem)   
			Pubsub.publish('LIST_NEW');
		});
	}

	componentWillUnMount(){
		Pubsub.unsubscribe('DELETE_MUSIC')
		Pubsub.unsubscribe('PLAY_MUSIC');
		Pubsub.unsubscribe('NEXT_MUSIC');
		Pubsub.unsubscribe('PLAY_PREV');
		Pubsub.unsubscribe('PLAY_NEXT');
		$('#player').unbind($.jPlayer.event.ended)
	}
	render(){
		return(
			<div>lajibofangqi，longdashuai作品</div>
		)
	}
	
}
// export default Footer;
export default connect(({ products }) => ({
  products,
}))(Footer);









