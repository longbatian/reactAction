import dva from 'dva'; 
// import MusicList from './page/musiclist'
// import { MUSIC_LIST } from "./config/musiclist";
export default {
  namespace: 'products',
  state:[],
  reducers: {
    'delete'(state, { payload: id }) {
    	// console.log(musicList)
    	// console.log(currentMussicItem)
    	// return musicList.filter(item => item !== id);
      state.musicList = state.musicList.filter(item => {
      	return item !== id;
      });
      
      return state
    },
    'modify'(state, { payload: id }) {
        state.currentMussicItem=id;
        // console.log(state.currentMussicItem)
        return state;

    }
  },
};

// return state.filter(item => item.id !== id);
 // {
 //      musicList:MUSIC_LIST,
	// 	currentMussicItem:MUSIC_LIST[1]
 //    }