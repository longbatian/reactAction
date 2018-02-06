import React, { Component } from 'react';
import MusicListItem from './../components/musiclistitem'
import { connect } from 'dva';
import Pubsub from 'pubsub-js';
import PropTypes from 'prop-types';
let listEle=null;
// const MusicList = ({ dispatch, products }) => {
// 		let list=products;
		
// 		Pubsub.subscribe('DELETE_MUSIC',(msg,musicItem) =>{
// 			 // () => onDelete(musicItem)
// 			 // console.log(musicItem)
// 			 dispatch({
// 		      type: 'products/delete',
// 		      payload: musicItem,
// 		    });
// 			 this.forceUpdate();
// 		});
// 		Pubsub.subscribe('PLAY_MUSIC',(msg,musicItem) =>{

// 		});
// 		// Pubsub.unsubscribe('DELETE_MUSIC')
// 		// Pubsub.unsubscribe('PLAY_MUSIC')
		
// 			render:{
// 				console.log(list)
// 				listEle=list.musicList.map((item) => {
// 					return (
// 						<MusicListItem 
// 							focus={item===list.currentMussicItem}
// 							key={item.id}
// 							musicItem={item}
// 						>
// 							{item.title}
// 						</MusicListItem>
// 					)
// 				})
// 				return(
// 				<ul>
// 	 				{listEle}
// 	 			</ul>
// 			)
// 		}
		
	
// }

class MusicList extends Component {
	constructor(props) {
	    super(props),
	    this.state = {
	      updated:false,
	      modify:false,
	    }
	  }
	  undated= () => {
	  	this.setState({
	  		updated:!this.state.updated
	  	})
	  }
	 componentDidMount(){
	 	Pubsub.subscribe('LIST_NEW',() =>{
				this.undated();
		});
	 }
	 componentWillUnmout() {
 			Pubsub.unsubscribe('LIST_NEW');
	}
	render(){
		let listEle=null;
		// console.log(this.props.products)
		listEle=this.props.products.musicList.map((item) => {
			return (
				<MusicListItem 
				focus={item===this.props.products.currentMussicItem}
				key={item.id}

				musicItem={item}
				>
				{item.title}
			</MusicListItem>
			)
		})
		return(
			<ul>
				{listEle}
			</ul>
			)
	}
}

// export default MusicList;



export default connect(({ products }) => ({
  products,
}))(MusicList);