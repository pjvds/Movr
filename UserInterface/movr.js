/**
 * Must see
 * http://groups.csail.mit.edu/mac/classes/6.001/abelson-sussman-lectures/
 * */

var socket = io.connect('http://movr.pjvds.c9.io/');
 
(function (movr, $, undefined) {

    $(document).ready(function() {
    
        var body$ = $("body");
        console.log(body$);
        
        var createEntity = function(id){
            var clone = $(id).clone();
            body$.append(clone);
            clone.removeClass("template");
            var pos = {};
            return {
                getPosition: function() {
                    return pos;
                },
                setPosition: function (x, y) {
                    pos = { x: x, y: y};
                    clone.css("left", x).css("top", y);
                }
            };
        };
        
        $("#spawnCommand").click(function () {
            var newEntity = createEntity("#dummyEntity");
            console.log(newEntity);
            
            newEntity.setPosition(Math.random() * document.body.clientWidth ,
                                  Math.random() * document.body.clientHeight);
                                  
            socket.emit('spawn', newEntity.getPosition());
        });

    });

}(window.movr = window.movr || {}, jQuery));
