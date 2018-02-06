import React, { Component } from 'react';
import styles from './../components/musiclistitem.less'
import Pubsub from 'pubsub-js';

class MusicListItem extends Component {
	playMusic(musicItem){
		Pubsub.publish('PLAY_MUSIC',musicItem);
		
	}
	deleteMusic(musicItem,e){
		// 防止点击删除按键触发li click事件
		e.stopPropagation();
		Pubsub.publish('DELETE_MUSIC',musicItem)
	}
	render(){
		let musicItem=this.props.musicItem;
		return(
			<li onClick={this.playMusic.bind(this,musicItem)} className={styles["components-listitem"]+" "+styles.row+" "+
			styles[`${this.props.focus ? 'focus' : ''}`]}>
				
				<p><span className={styles.bold}>{musicItem.title}</span>  -  {musicItem.artist}</p>
				
				<p onClick={this.deleteMusic.bind(this,musicItem)} className={styles['-col-auto']+" "+styles.delete}></p>
			</li>
			)
	}

}

export default MusicListItem