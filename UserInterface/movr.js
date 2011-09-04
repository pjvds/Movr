/**
 * Must see
 * http://groups.csail.mit.edu/mac/classes/6.001/abelson-sussman-lectures/
 * */
 
(function (movr, $, undefined) {

    $(document).ready(function() {
        
        var body$ = $("body");
        console.log(body$);
        
        var socket = io.connect('http://movr.pjvds.c9.io/');
        console.log(socket);
        
        var createEntity = function(id){
            $(id).draggable();
            var clone = $(id).clone();
            clone.removeClass("template");
            
            body$.append(clone);
            
            var pos = {};
            var elementId = guidGenerator();
            
            var entity = {
                getPosition: function() {
                    return pos;
                },
                setPosition: function (x, y) {
                    pos = { x: x, y: y};
                    clone.css("left", x).css("top", y);
                },
                getData: function() {
                    return { elementId: elementId, position: pos };
                }
            };
            
            clone.entity = entity;
            
            clone.draggable({ drag: function() {
                pos = { x: clone.css("left"), y: clone.css("top") };
                socket.emit('moved', entity.getData());
                
                console.log(entity.getData());
    		}});
            
            socket.on('moved', function(data) {
                entity.setPosition(data.x, data.y);
            });
            
            return entity;
        };
        
        $("#spawnCommand").click(function () {
            var newEntity = createEntity("#dummyEntity");
            console.log(newEntity);
            
            newEntity.setPosition(Math.random() * document.body.clientWidth ,
                                  Math.random() * document.body.clientHeight);
                   
            var data = newEntity.getData();
            console.log(data);
            
            socket.emit('spawn', data);
        });

        socket.on('spawn', function(data) {
            var newEntity = createEntity("#dummyEntity");
            console.log(newEntity);
            
            newEntity.setPosition(data.x, data.y);
        });
        
        var guidGenerator = function() {
            var S4 = function() {
               return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            };
            return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        };
    });

}(window.movr = window.movr || {}, jQuery));
