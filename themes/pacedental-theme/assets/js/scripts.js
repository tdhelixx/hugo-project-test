/* target links same and/or forward page */
$(window).ready(function () {
    var interval = setInterval(function () {
        if (window.location.hash)
            window.location = window.location.hash;
    }, 0);
    setTimeout(function () {
        clearInterval(interval);
    }, 0);
});

$(function () {
    // global variables
    var theWindow = $(window),
        body = $("body"),
        header = $("header"),
        headerBottom = $("header").outerHeight(),
        stickyBottom = $("#hd-top").outerHeight();

    // //HEADER SCROLL
    $(window).on('resize', function () {              
        if (theWindow.width() > 1023) {
            $(body).addClass("not-scrolled");    
        }                 
        $("body").css('padding-top', header.outerHeight());   
    }).trigger('resize');    
    theWindow.on("scroll", function () {      
        if (theWindow.width() > 1023) {
            if (theWindow.scrollTop() > headerBottom) {
                body.addClass("fix-nav");         
                body.removeClass("not-scrolled");
                //moveInfo(true); 
                //header.addClass("animated slideInDown");
            } else if (theWindow.scrollTop() <= 0) {
                body.removeClass("fix-nav");
                body.addClass("not-scrolled");
                //moveInfo(false);
                //header.removeClass("animated slideInDown");
            }
        } else {
            if (theWindow.scrollTop() > stickyBottom) {
                body.addClass("attach");
            } else if ( theWindow.scrollTop() <= 0 ){
                body.removeClass("attach");
            } 
        }      
    }); 
	
    //SLICK SLIDERS
    $("main .slick-slider").slick({
        dots:true,
        arrows:true,
        slidesToScroll:1,
        slidesToShow:1,
        appendDots:"#controls",          
        prevArrow:'<a href="#" id="prev"><i class="icon-angle-left"></i></a>',
        nextArrow:'<a href="#" id="next"><i class="icon-angle-right"></i></a>',                  
        customPaging:function(slider,index) {         
            return '<span></span>';
        },
        responsive: 
        [{
            breakpoint: 1185,
            settings: {  
                appendArrows:"#controls"                               
            } 
        }]
    }); 

    $(".slick-welcome").slick({
        dots:true,
        arrows:true,
        slidesToScroll:1,
        slidesToShow:1,
        appendDots:".welcome-controls",          
        prevArrow:'<a href="#" id="prev"><i class="icon-angle-left"></i></a>',
        nextArrow:'<a href="#" id="next"><i class="icon-angle-right"></i></a>',                  
        customPaging:function(slider,index) {         
            return '<span></span>';
        },
        responsive: 
        [{
            breakpoint: 1185,
            settings: {  
                appendArrows:".welcome-controls"                               
            } 
        }]
    }); 
    $(".slick-team").slick({
        dots:true,
        arrows:true,
        slidesToScroll:1,
        slidesToShow:1,
        appendDots:".team-controls",          
        prevArrow:'<a href="#" id="prev"><i class="icon-angle-left"></i></a>',
        nextArrow:'<a href="#" id="next"><i class="icon-angle-right"></i></a>',                  
        customPaging:function(slider,index) {         
            return '<span></span>';
        },
        responsive: 
        [{
            breakpoint: 1185,
            settings: {  
                appendArrows:".team-controls"                               
            } 
        }]
    });   

    $(".slick-reviews").slick({   
        dots:true,
        arrows:true, 
        fade:true,
        autoplay:true,
        autoplaySpeed:5000,
        appendDots:".reviews-controls",
        prevArrow:'<a href="#" id="prev"><i class="icon-angle-left"></i></a>',
        nextArrow:'<a href="#" id="next"><i class="icon-angle-right"></i></a>',                      
        customPaging:function(slider,index) {
            //var social = $(slider.$slides[index]).find("[data-source]").data('source');
            //return '<span class="'+ social +'"></span>';
            return '<span></span>';
        },
        responsive: [
        {
          breakpoint: 1023,
          settings: {
            appendArrows:".reviews-controls"
          }
        }]
    });    

    //RESPONSIVE
    $('header #main-nav').meanmenu({
        meanMenuContainer: '#hd-contents',
        meanMenuOpen: "<i class='icon-menu'></i>",
        meanMenuClose: "<i class='icon-plus'></i>",
        meanScreenWidth: 1023,
        meanDisplay: "flex"
    });

    if (theWindow.width() < 1023) {
        $("footer .social").clone().prependTo(".mean-container .mean-nav");
        $("footer .hours").clone().appendTo(".mean-container .mean-nav"); 
    }

    //PAGE ACTIONS
    if($(".page-divider").length) {
        $(".page-divider").tntdivider({
            alt:'even',
            alignBody: true,
            alignTitles: true,
            alignHeight: 400,
            callback: function() {
                $(".page-divider .elem-left").addClass("wow animated fadeInLeft");
                $(".page-divider .elem-right").addClass("wow animated fadeInRight");
            }
        });  
    }

    //page with intro
    if($("#intro").length){    
        $("#intro").find("h1:first-of-type, #append").wrapAll('<div id="page-title" />');
        $("#intro").prependTo("main#page").addClass("has-intro");
		$("#intro .elem-left").addClass("wow animated fadeInLeft");
    } else {        
        $("#page h1:first-child:not(.detach), #page #append").prependTo("main#page").wrapAll('<div id="page-title"></div>'); 
    }
   
    $(".more-to-explore").find("span").addClass("h2");      

    // accordion + video reload
    $(".accordion h3, .accordion h2").addClass("toggle").wrapInner("<span />");
    $(".toggle").each(function () {
        $(this).nextUntil('.toggle').add().wrapAll('<div class="accordion-content"><span />');
    });
    $(".toggle").on("click", function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active").next().slideUp();
        } else {
            $(".toggle").removeClass("active").next().slideUp();
            $(this).addClass("active").next().slideDown();
            for (var i = 0; i < $('.accordion iframe').length; i++) {
                var noAutoPlay = $('.accordion iframe').attr('src').replace('autoplay=1','autoplay=0');
                $ ('.accordion iframe').attr('src', noAutoPlay);
                //url add: ?enablejsapi=1
                $('.accordion iframe')[i].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
            }
        }
    });
    








    //tntvideos defaults
    if($("[data-player]").length) {
        $("#banner[data-player]").tntvideos({      
            playButton: '.play-btn',
            closeButton: '.close-btn',
            bodyPlaying: '.playing',
            offset:0,
            mobileWidth: 900
        }); 
    }
    if($("[data-player]").length) {
        $("#reviews [data-player]").tntvideos({      
            playButton: '.play-btn',
            closeButton: '.close-btn',
            bodyPlaying: '.playing',
            offset:0,
            animate: false,
            mobileWidth: 900
        }); 
    }
});


// Services Icon and New Modal
   ////// Updated lean modal that closes on clicking outside popup window

(function($){$.fn.extend({leanModal:function(options){var defaults={top:100,overlay:0.5,closeButton:null};var overlay=$("<div id='lean_overlay'></div>");$("body").append(overlay);options=$.extend(defaults,options);return this.each(function(){var o=options;$(this).click(function(e){var modal_id=$(this).attr("href");$("#lean_overlay").click(function(){close_modal(modal_id)});$(o.closeButton).click(function(){close_modal(modal_id)});var modal_height=$(modal_id).outerHeight();var modal_width=$(modal_id).outerWidth();
$("#lean_overlay").css({"display":"block",opacity:0});$("#lean_overlay").fadeTo(200,o.overlay);$(modal_id).css({"display":"block","position":"fixed","opacity":0,"z-index":11000,"left":50+"%","margin-left":-(modal_width/2)+"px","top":o.top+"px"});$(modal_id).fadeTo(200,1);e.preventDefault()})});function close_modal(modal_id){$("#lean_overlay").fadeOut(200);$(modal_id).css({"display":"none"})}}})})(jQuery);




//// Wraps buttons modal buttons in flexed container 
 $('.modal-content').each(function() {
   $(".modal-content .btn").parent().addClass('has_btns');
 });



///// Calls the leanModal popups
  $("a[rel*=leanModal]").leanModal({
		// top: 100,
		overlay: 1,
		closeButton: ".modal-close"
  });


/* this removes the click function on "off" popup links that don't have content yet. It prevents them from being cursor or keyboard clickable and makes screenreaders skip over them as links. Removing the class "off" from the leanModal link will re-enable that particular link */

       $("a.off").each(function (index) {
           $(this).removeAttr('href');
              $(this).removeAttr('rel');
                this.setAttribute('aria-disabled', 'true');
         });


    //// Prepends + appends Close button to popups modals - gives keyboard focus easier access to close button.
      $("#common-popups .modal-content").prepend('<button class="modal-close" aria-label="close popup"><i></i><span>Close Popup</span></button>');
      $("#common-popups .modal-content").append('<button class="modal-close" aria-label="close popup"><i></i><span>Close Popup</span></button>');


    //// Clicking popup moves keyboard focus into modal 
        $("a[rel*=leanModal]").on("click", function(){
            let href = $(this).attr('href');
            let trimmed = href.substring(1);
           // console.log(trimmed)
            document.getElementById(trimmed).focus();
         });



 

 //// On closing popup gives keyboard focus back to last modal link clicked
    $('.modal-close').on("click", function(){
        let newTag = $(this).parent().attr('id');
        // console.log(newTag)

        $("#pop-icons a").each(function() {
            if (this.href.indexOf(newTag) != -1) {
                $(this).focus()
            }
        });
    }); 

    $('.divider-body, .block').each(function() {
            if ($(this).find('.service-icons').length) {
                ($(this).addClass('center'))
            }
    });




$(window).ready(function() {
   let theWindow = $(window);

  //// Wraps toggles' H3 into clearfixed sections and moves the image infront of the H3 on desktop
  $(".section-toggle h3").each(function() {
    $(this).nextUntil('h3, div, h2').addBack().wrapAll('<div class="has-h3">');
  });

  if ($(window).width() > 750) {
    $(".has-h3").each(function(index) {
      $(this).find(".elem-left").insertBefore($(this).children("h3"));
    })
  }


/*** Appends the section toggle to the block or pd-body container that is often flexed. This way the toggle content 
     can fill up the whole width instead of just half screen
     May need to change "block" or "divider-body" to whatever the page-divider script is naming the sections 
  ****///
  
  
$(".block, .divider-body, .pd-block").each(function (index)  {
        $(this).find('.section-toggle').appendTo($(this));
   });

  $("button.togg").each(function ()  {
     this.setAttribute('aria-expanded', "false");
     });
  
  $("button.togg").on("click", function() {
    if ($(this).hasClass("active")) {
      this.setAttribute('aria-expanded', "false");
       $(this).removeClass("active").closest('.block, .divider-body, .pd-block, .divider-block').find(".section-toggle").slideUp();
    } else {
       this.setAttribute('aria-expanded', "true");

      $(this).addClass("active").closest('.block, .divider-body, .pd-block, .divider-block').find(".section-toggle").slideDown();

    }
  });

});
