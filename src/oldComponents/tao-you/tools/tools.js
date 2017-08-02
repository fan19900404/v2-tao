export const startGame = (context, game = {}) => {
  try {
    if (!context) {
      return;
    }
    if (+game.type === 2) {

      // 如果是app 跳转详情页
      context.$router.go({
        name: 'TaoYouGameCenterGameDetails',
        params: {
          id: game.gameID
        }
      });
    } else if (+game.type === 1) {

      //如果是h5游戏 直接进入游戏
      context.$router.go({
        name: 'TaoYouPlayMyGame',
        params: {
          id: game.gameID
        },
        query: {
          d: game.direction,
          gameUrl: game.gameUrl,
          gameName: game.gameName,
          from: 1
        },
        replace: true
      })
    }
  } catch (ex) {
    alert(ex);
    if (console && console.error) {
    	console.error(ex);
     }
  }
};