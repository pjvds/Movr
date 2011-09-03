
(function (movr, $, undefined) {

    $(document).ready(function() {
    
        var body$ = $("body");
        console.log(body$);
        
        var createEntity = function(id){    
            var clone = $(id).clone();
            body$.append(clone);
            
            return clone;
        };
        
        $("#spawnCommand").click(function () {
            var newEntity = createEntity("#dummyEntity");
            console.log(newEntity);
        });

    });

}(window.movr = window.movr || {}, jQuery));
