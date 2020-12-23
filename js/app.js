const video  = document.querySelector("#camera");

window.onload = () => {

    // const canvas = document.querySelector("#picture");
    const se     = document.querySelector('#se');
  
    /** カメラ設定 */
    const constraints = {
      audio: false,
      video: {
        width: 300,
        height: 200,
        facingMode: "user"   // フロントカメラを利用する
        // facingMode: { exact: "environment" }  // リアカメラを利用する場合
      }
    };
  
    /**
     * カメラを<video>と同期
     */
    navigator.mediaDevices.getUserMedia(constraints)
    .then( (stream) => {
      video.srcObject = stream;
      video.onloadedmetadata = (e) => {
        video.play();
      };
    })
    .catch( (err) => {
      console.log(err.name + ": " + err.message);
    });

  };

  $(function () {
    $(".cancel").click(function(){
        $('#mat').hide();
    })
    $("#camerabotan").click(function(){
        $('#mat').show();
    })

    $('#mat').hide();

    $("#shutter").click(function(){
      let r = addItem()
      const canvas = document.querySelector(`#picture${r}`);

      const ctx = canvas.getContext("2d");
  
      // 演出的な目的で一度映像を止めてSEを再生する
      video.pause();  // 映像を停止
      se.play();      // シャッター音
      setTimeout( () => {
        video.play();    // 0.5秒後にカメラ再開
      }, 500);
  
      // canvasに画像を貼り付ける
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);


      $('#mat').hide();
    })



});

function addItem(img){
  console.log("addItem");
  let r = Math.floor(Math.random()*1000000);
  let tag=`<div class="post">
  <div>
  <canvas id="picture${r}" class="thumbnail" width="300" height="200"></canvas>
  </div> 
  <div class="postFooter">
      <div><img class="imgIcon" src="images/simple_heart.png"></div>
      <div><img class="imgIcon" src="images/komento.ikon.png"></div>
  </div>
</div>`;
  $("#main").append(tag);
  return r;
}