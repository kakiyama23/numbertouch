'use strict';
{
  // パネルクラスの作成
  class Panel {
    constructor(){
      this.el = document.createElement('li');
      this.el.classList.add('pressed');
      // 数字がクリックされた時の処理(パネルクラス内のチェック関数を動かす)
      this.el.addEventListener('click',() => {
      this.check();
      })
    }

    getEl(){
      return this.el;
    }

    // 数値(スタートボタンを押すと)が渡ってくるので、numという引数で受ける
    activate(num){
      this.el.classList.remove('pressed');
      this.el.textContent = num;
    }

   check(){
    //  parseIntとは、文字列を整数に変換するJavaScriptのグローバル関数
    //  parseInt(this.el.textContent, 10) 10進法の数字に変換するという意味
     if(currentNum === parseInt(this.el.textContent, 10)){
       this.el.classList.add('pressed');
       currentNum++;

      //  すべて数字を押したら、タイマーを止める処理
      if(currentNum === 4){
        clearTimeout(timeoutId);
        btn.textContent = "START"; //リセットからスタートに戻す
      }
     }
   }
  }


  // ボードクラスの作成
  class Board{
    constructor(){
      this.panels = [];
      for(let i = 0; i < 4; i++){
        this.panels.push(new Panel());
      }
      this.setup();
    }

    setup(){
      const board = document.getElementById('board');
      this.panels.forEach(panel => {
        //board.appendChild(panel.el);
        //追加するのはli要素なので、panel.elプロパティに追加すればよいが、クラスのプロパティに直接アクセスしないほうがよいので、メソッド経由で取るのが望ましい

        board.appendChild(panel.getEl()); //カプセル化
      })
    }

    // アクティベートメソッド(スタートボタンを押された時の処理/数字をランダムに配置)
    activate(){
     const nums = [0,1,2,3];
     this.panels.forEach(panel => {
      //  spliceメソッドについては、最終行に表示する
       const num = nums.splice(Math.floor(Math.random() * nums.length), 1)[0];
      //  panelクラスのアクティベート関数に引数を渡す
       panel.activate(num);
     })
    }
  }

  // タイマーに関する関数
  function runTimer(){
    const timer = document.getElementById('timer');
    timer.textContent = ((Date.now() - startTime) / 1000).toFixed(2);

    timeoutId = setTimeout(() => {
      runTimer();
    }, 10);
  }

  const board = new Board();

  let currentNum; //クリックしたら押し込まれる数字
  let startTime;
  let timeoutId; //タイマーを止めるための変数 

  // ゲームを始める
  const btn = document.getElementById('btn');
  btn.addEventListener('click', () => {
    // スタートボタンを２度押したら、タイマーが止まるようにする
    if(typeof timeoutId !== 'undefined'){
      clearTimeout(timeoutId);
    }
    btn.textContent = "RESET";
    currentNum = 0; // スタートボタンを押すたびに、currentNumを0にする
    board.activate();
    // ボードクラスにアクティベートクラスを作る

    // ボタンを押したときの現在時刻を記録する
    startTime = Date.now();
    runTimer();
  })


  //sprice()メソッド:第一引数で指定した位置から、第二引数で指定した数の要素が第二引数で指定した数の要素が配列から削除され、第三引数以降で指定した値が要素として配列に追加される。spriceメソッドをつけることで重複せず、ランダムな整数値を摂れる
}