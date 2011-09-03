
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
