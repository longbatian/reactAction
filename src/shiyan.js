import React from 'react';
import { connect } from 'dva';
class Products extends React.Component {
	handleDelete= () =>{
		console.log(this.props.cuerrentMusicItem.title)
	}
	render(){
		return(
 			<div>
 			<h2 onClick={this.handleDelete}>List of Products</h2>
 			</div>
			)
	}
}					
// const Products = ({ dispatch, products }) => {
//   function handleDelete(id) {
//     	let produ={products}
//     	console.log({products}.products.musicList)
//   }
//   return (
//     <div>
//       <h2 onClick={handleDelete}>List of Products</h2>
      
//     </div>
//   );
// };
// <ProductList onDelete={handleDelete} products={products} />
export default Products;
// export default connect(({ products }) => ({
//   products,
// }))(Products);