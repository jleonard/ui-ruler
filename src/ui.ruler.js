(function(){

  var points = [];
  var mouse = false;
  var $canvas;

  $(document).ready(function(e){

    $('body').on('keydown',function(e){
      console.log('keydown ',e.altKey,mouse);
      handle(e);
    });

    $('body').on('mousedown mouseup',function(e){
      mouse = !mouse;
      console.log('mouse ',mouse);
      handle(e);
    });

  });

  function handle(e){
    if(e.altKey && mouse){
      if(points.length >= 2){
        wipe(e);
      }
      points.push({x:e.pageX,y:e.pageY});
      pin(e);
      if(points.length == 2){
        calculate(e);
      }
    }
  }

  function calculate(e){
    console.log('calc');
    var w = Math.abs(points[1].x - points[0].x);
    var h = Math.abs(points[1].y - points[0].y);
    var hypotenuse = Math.sqrt( (w*w) + (h*h) );
    console.log('hy ',hypotenuse);

    $canvas = $('<canvas class="ui ruler line"></canvas>');
    $('body').append($canvas);
    var context = $canvas.get(0).getContext("2d");    
    context.strokeStyle = "#f90";

    context.beginPath();
    context.canvas.width  = window.innerWidth;
    context.canvas.height = window.innerHeight;
    context.moveTo(points[0].x, points[0].y);
    context.lineTo(points[1].x, points[1].y);
    context.stroke();

    console.log(points[0].x, points[0].y);
    console.log(points[1].x, points[1].y);
    /*
    context.moveTo(0,0);
    context.lineTo(200,250);
    */
    
  }

  function wipe(e){
    console.log('wipe');
    points = [];
    $('body').find('.pin').remove();
    $canvas.remove();
  }

  function pin(e){
    console.log('pin');
    var $pin = $('<div>',{'class':'pin'});
    $('body').append($pin);
    $pin.css('top',e.pageY+'px');
    $pin.css('left',e.pageX+'px');
  }
  
  /*
  var mouse = false;
  
  var x = [];
  var y = [];



  $(document).ready(function(e){

    $('body').on('mousedown',function(e){
      mouse = true;
      if(key){
        x.push(e.pageX);
        y.push(e.pageY);
        
        var $pin = $('<div>',{'class':'pin'});
        $('body').append($pin);
        $pin.css('top',e.pageY+'px');
        $pin.css('left',e.pageX+'px');
      }
      console.log('mousedown: key is ',key);
    });

    $('body').on('mouseup',function(e){
      mouse = false;
      x.push(e.pageX);
      y.push(e.pageY);
      console.log('mouseup');
      setTimeout(function(){
        console.log('mouseup: key is ',key);
        if(key){
          var w = Math.abs(x[1] - x[0]);
          var h = Math.abs(y[1] - y[0]);
          var hypotenuse = Math.sqrt( (w*w) + (h*h) );
          //console.log('width: ',w);
          //console.log('height: ',h);
          //console.log('hypotenuse: ',hypotenuse);
          //console.log('data: ',x,y);
          var $pin = $('<div>',{'class':'pin'});
          $('body').append($pin);
          $pin.css('top',e.pageY+'px');
          $pin.css('left',e.pageX+'px');
        }
      },1);
    });

    $('body').on('keyup',function(e){
      key = false;
      console.log('key: ',key);
      console.log(e);
    });

    $('body').on('keydown',function(e){
      key = true;
      console.log('key: ',key);
      $('body').find('.pin').remove();
      x = [];
      y = [];
    });

  });
  */
})();