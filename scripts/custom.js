$(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if(scroll >= 100) {
        $("header").addClass("change");
    } else {
        $("header").removeClass("change");
    }
});

    

    if($(window).width() < 767)
    {
       $(".translog").append($(".right_head"));
    } 


