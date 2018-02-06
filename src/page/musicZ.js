import React, { Component } from 'react';
import MusicListItem from './../components/musiclistitem'
import { connect } from 'dva';
import Pubsub from 'pubsub-js';
import PropTypes from 'prop-types';
import MusicList from './musiclist'

let listEle=null;
class Musicz extends Component {

	 showList = () => {
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
			
		}
	componentDidMount(){
		Pubsub.subscribe('DELETE_MUSIC',(msg,musicItem) =>{
			 // () => onDelete(musicItem)
			 // console.log(this.props.dispatch)
			 this.props.dispatch({
		      type: 'products/delete',
		      payload: musicItem,
		    });
			(this.showList)();

		});
		Pubsub.subscribe('PLAY_MUSIC',(msg,musicItem) =>{

		});
	}
	componentWillUnMount(){
		Pubsub.unsubscribe("DELETE_MUSIC")
		Pubsub.unsubscribe("PLAY_MUSIC")
	}
	render(){
		
			(this.showList)()
		return(
			<ul>
				<MusicList listEle={listEle}/>
			</ul>
			)
	}
}

// MusicList.propTypes = {
//   // onDelete: PropTypes.func.isRequired,
//   products: PropTypes.array.isRequired,
// };

// export default MusicList;



export default connect(({ products }) => ({
  products,
}))(Musicz);