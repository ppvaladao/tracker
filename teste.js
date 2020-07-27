
function start(callback){
    //como colocar uma função ou qualquer coisa aqui e como interagir com a condição if abaixo.
    if(work_finished){
      callback();
    }
    // then return true or false depending upon whether you want
    // it to keep getting called again

    //entender essa parte aqui e true abaixo
    return true;
  }
  
  function run() {
      var more;
      do {
          more = start(function(){
              console.log('END');
          });
      } while (more === true);
  }