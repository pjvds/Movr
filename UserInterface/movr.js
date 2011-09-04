/**
 * Must see
 * http://groups.csail.mit.edu/mac/classes/6.001/abelson-sussman-lectures/
 * */
 
(function (movr, $, undefined) {

    $(document).ready(function() {
        
        var body$ = $("body");
        var entities = [];
        
        var socket = io.connect('http://movr.pjvds.c9.io/');
        console.log(socket);
        
        var createEntity = function(id, pos){
            $(id).draggable();
            var entityId = guidGenerator();
            var clone = $(id).clone();
            clone.removeClass("template");
            body$.append(clone);
            
            clone.draggable({ drag: function() {
                pos = { x: clone.css("left"), y: clone.css("top") };
                socket.emit('moved', entity.getData());
                
                console.log(entity.getData());
    		}});
            
            var entity = new Entity(entityId, clone);
            entity.setPosition(pos.x, pos.y);
            
            entities[entity.id]=entity;
            
            return entity;
        };
        
        $("#spawnCommand").click(function () {
            var pos = { x: Math.random() * document.body.clientWidth,
                        y: Math.random() * document.body.clientHeight };
            
            var newEntity = createEntity("#dummyEntity", pos);
            var data = newEntity.getData();
            console.log(data);
            
            socket.emit('spawn', data);
        });

        socket.on('spawn', function(data) {
            console.log('spawned');
            var newEntity = createEntity("#dummyEntity", data.position);
            console.log(newEntity);
            
            //newEntity.setPosition(data.position.x, data.position.y);
        });
        
        socket.on('moved', function(data) {
            console.log('moved:');
            console.log(data);
            
            var movedEntity = entities[data.id];
            movedEntity.setPosition(data.position.x, data.position.y);
        });
        
        var guidGenerator = function() {
            var S4 = function() {
               return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            };
            return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        };
    });
    
    function Entity(id, element){
        this.id = id;
        this.element = element;
        
        this.getPosition = function() {
            return { x: element.css("left"), y: element.css("top") };
        };
        
        this.setPosition = function (x, y) {
            element.css("left", x).css("top", y);
        };
        
        this.getData = function() {
            return { id: this.id, position: this.getPosition() };
        };
    }

}(window.movr = window.movr || {}, jQuery));
