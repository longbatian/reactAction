import dva from 'dva';
import MUSIC_LIST from "./config/musiclist";
// import './index.css';

// 1. Initialize
// const app = dva({MusicList});
const app = dva({
   initialState: {
     products:{
      	musicList:MUSIC_LIST,
		currentMussicItem:MUSIC_LIST[0],
    } ,
   },
 });

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));
app.model(require('./models/products'));
// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
