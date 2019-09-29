new Vue({
  el: '#app',
  data:{
    message: 'Quiz',
    param_row: null,
    quiz: null,
  },
  methods:{
    // データ取得処理
    get: function(){
      var db_url = 'https://script.google.com/macros/s/AKfycbyNTkW4nMswG0BPvZAiGuXItvXNeHJHe7CZ1ip_9cgGZ2lsM4w/exec'
      var query = '?row=' + this.param_row;

      // GET通信
      axios.get(db_url+query)
      // thenで成功した場合の処理をかける
      .then(response => {
        this.quiz = response.data
      })
      // catchでエラー時の挙動を定義する
      .catch(err => {
        console.log('err:', err);
      });

      // CSSを初期化
      $('.answer_area').css("visibility","hidden");
    },

    // データランダム取得処理
    getRandom: function(){
      var MAX_SHEET_ROW_INDEX = 6; // クイズの数ではなくシートの行数
      var db_url = 'https://script.google.com/macros/s/AKfycbyNTkW4nMswG0BPvZAiGuXItvXNeHJHe7CZ1ip_9cgGZ2lsM4w/exec'
      var query = '?row=' + Math.floor(Math.random() * (MAX_SHEET_ROW_INDEX+1 - 2) + 2); // ヘッダー行を出さないように

      // GET通信
      axios.get(db_url+query)
      // thenで成功した場合の処理をかける
      .then(response => {
        this.quiz = response.data
      })
      // catchでエラー時の挙動を定義する
      .catch(err => {
        console.log('err:', err);
      });

      // CSSを初期化
      $('.answer_area').css("visibility","hidden");
    },

    // 回答選択時の処理
    select_answer: function(){
      $('.answer_area').css("visibility","visible");

      // スクロールの速度
      // うまくいってない
      var speed = 400; // ミリ秒で記述
      var href= $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top;
      $('body,html').animate({scrollTop:position}, speed, 'swing');
      return false;
    }
  }


})