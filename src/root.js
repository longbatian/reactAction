import React , { Component }  from 'react';
import Header from './components/header'
import Player from './page/player'
import MusicList from './page/musiclist'
import { MUSIC_LIST } from "./config/musiclist";
import { connect } from 'dva';
// import Shiyan from "./shiyan";
import Pubsub from 'pubsub-js';


class Roots extends Component {
	constructor(args) {
		super(args);
		this.state={
			modify:false,
		}
	}
	show = () =>{
		this.setState({modify:true})
	}
	componentDidMount(){
		Pubsub.subscribe('NEXT_MUSIC',() =>{
			this.show();
		});

	}
	componentWillUnMount(){
		Pubsub.unsubscribe('NEXT_MUSIC')
	}
	render(){
		
		let produ=this.props.products;
		// console.log(this.props.products.currentMussicItem)
		return(
		 <Player
		         cuerrentMusicItem={produ.currentMussicItem}
		       />
			)
		}

	// methods
}
// const Roots = ({ dispatch, products }) => {
// 	let produ={products};
//   function handleDelete(id) {
    	 
//     	// console.log(produ.products.musicList)
//     	console.log(produ.products.currentMussicItem.title)
//   }
//   function componentDidMount (){
			
		
// 	}
// 	componentDidMount()
//   return (
     
//   );
// };
 // <Player
 //        cuerrentMusicItem={produ.products.currentMussicItem}
 //      />
// let duration=null;





export default connect(({ products }) => ({
  products,
}))(Roots);

