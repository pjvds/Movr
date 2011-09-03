/**
 * Must see
 * http://groups.csail.mit.edu/mac/classes/6.001/abelson-sussman-lectures/
 * */

var socket = io.connect('http://movr.pjvds.c9.io/');
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });

(function (movr, $, undefined) {

    $(document).ready(function() {
    
        var body$ = $("body");
        console.log(body$);
        
        var createEntity = function(id){    
            var clone = $(id).clone();
            body$.append(clone);
            clone.removeClass("template");
            
            return {
                setPosition: function (x, y) {
                    clone.css("left", x).css("top", y);
                }
            };
        };
        
        $("#spawnCommand").click(function () {
            var newEntity = createEntity("#dummyEntity");
            console.log(newEntity);
            
            newEntity.setPosition(Math.random() * document.body.clientWidth ,
                                  Math.random() * document.body.clientHeight);
        });

    });

}(window.movr = window.movr || {}, jQuery));
