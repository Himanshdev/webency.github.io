    // Mobile sub menu toggle
    $(document).ready(function(){
        $(".mean-expand").click(function(){
            var target = $(this).parent().children(".sub-menu");
            $(target).slideToggle();
			$(this).toggleClass('toggle-active');
        });
    });

// counter
var a = 0;
$(window).scroll(function () {
    var oTop = $("#counter-box").offset().top - window.innerHeight;
    if (a == 0 && $(window).scrollTop() > oTop) {
        $(".counter").each(function () {
            var $this = $(this),
                countTo = $this.attr("data-number");
            $({
                countNum: $this.text()
            }).animate(
                {
                    countNum: countTo
                },

                {
                    duration: 3000,
                    easing: "swing",
                    step: function () {
                        //$this.text(Math.ceil(this.countNum));
                        $this.text(
                            Math.ceil(this.countNum).toLocaleString("en")
                        );
                    },
                    complete: function () {
                        $this.text(
                            Math.ceil(this.countNum).toLocaleString("en")
                        );
                        //alert('finished');
                    }
                }
            );
        });
        a = 1;
    }
});

// preloder js 
function loading() {
	document.querySelectorAll(".bar").forEach(function (current) {
		let startWidth = 0;
		const endWidth = current.dataset.size;
		const interval = setInterval(frame, 20);
		function frame() {
			if (startWidth >= endWidth) {
				clearInterval(interval);
			} else {
				startWidth++;
				current.style.width = `${endWidth}%`;
				current.firstElementChild.innerText = `${startWidth}%`;
			}
		}
	});
}
setTimeout(loading, 1000);
$(window).on("load", function () {
	$("#preloader").fadeOut(500);
});
if ($("#preloader").length > 0) {
	$("cancel-btn").each(function () {
		$(this).on("click", function (e) {
			e.preventDefault();
			$("#preloader").fadeOut(500);
		});
	});
}

// scroll top js 
var webencyScrollTop = document.querySelector(".webency-scroll-top");
	if (webencyScrollTop != null) {
		var scrollProgressPatch = document.querySelector(
			".webency-scroll-top path"
		);
		var pathLength = scrollProgressPatch.getTotalLength();
		var offset = 50;
		scrollProgressPatch.style.transition =
			scrollProgressPatch.style.WebkitTransition = "none";
		scrollProgressPatch.style.strokeDasharray = pathLength + " " + pathLength;
		scrollProgressPatch.style.strokeDashoffset = pathLength;
		scrollProgressPatch.getBoundingClientRect();
		scrollProgressPatch.style.transition =
			scrollProgressPatch.style.WebkitTransition =
				"stroke-dashoffset 10ms linear";
		window.addEventListener("scroll", function (event) {
			var scroll =
				document.body.scrollTop || document.documentElement.scrollTop;
			var height =
				document.documentElement.scrollHeight -
				document.documentElement.clientHeight;
			var progress = pathLength - (scroll * pathLength) / height;
			scrollProgressPatch.style.strokeDashoffset = progress;
			var scrollElementPos =
				document.body.scrollTop || document.documentElement.scrollTop;
			if (scrollElementPos >= offset) {
				webencyScrollTop.classList.add("progress-done");
			} else {
				webencyScrollTop.classList.remove("progress-done");
			}
		});
		webencyScrollTop.addEventListener("click", function (e) {
			e.preventDefault();
			window.scroll({
				top: 0,
				left: 0,
				behavior: "smooth",
			});
		});
	}

// Sticky js
$(window).scroll(function () {
    var Width = $(document).width();

    if ($("body").scrollTop() > 100 || $("html").scrollTop() > 100) {
        $(".header-sticky").addClass("sticky");
    } else {
        $(".header-sticky").removeClass("sticky");
    }
});

$(function() {
    // Owl Carousel
    var owl = $(".owl-carousel");
    owl.owlCarousel({
      items: 2,
      margin: 10,
      loop: true,
      nav: false
    });
  });

//   portfolio 
$(document).ready( function() {

	var itemSelector = '.grid-item'; 

	var $container = $('#new_port').isotope({
		itemSelector: itemSelector,
		masonry: {
		  columnWidth: itemSelector,
		  isFitWidth: true
		}
	});

	//Ascending order
	var responsiveIsotope = [
		[480, 7],
		[720, 10]
	];

	var itemsPerPageDefault = 5;
	var itemsPerPage = defineItemsPerPage();
	var currentNumberPages = 1;
	var currentPage = 1;
	var currentFilter = '*';
	var filterAtribute = 'data-filter';
	var pageAtribute = 'data-page';
	var pagerClass = 'isotope-pager';

	function changeFilter(selector) {
		$container.isotope({
			filter: selector
		});
	}

	function goToPage(n) {
		currentPage = n;

		var selector = itemSelector;
			selector += ( currentFilter != '*' ) ? '['+filterAtribute+'="'+currentFilter+'"]' : '';
			selector += '['+pageAtribute+'="'+currentPage+'"]';

		changeFilter(selector);
	}

	function defineItemsPerPage() {
		var pages = itemsPerPageDefault;

		for( var i = 0; i < responsiveIsotope.length; i++ ) {
			if( $(window).width() <= responsiveIsotope[i][0] ) {
				pages = responsiveIsotope[i][1];
				break;
			}		
		}

		return pages;
	}
	
	function setPagination() {

		var SettingsPagesOnItems = function(){

			var itemsLength = $container.children(itemSelector).length;
			
			var pages = Math.ceil(itemsLength / itemsPerPage);
			var item = 1;
			var page = 1;
			var selector = itemSelector;
				selector += ( currentFilter != '*' ) ? '['+filterAtribute+'="'+currentFilter+'"]' : '';
			
			$container.children(selector).each(function(){
				if( item > itemsPerPage ) {
					page++;
					item = 1;
				}
				$(this).attr(pageAtribute, page);
				item++;
			});

			currentNumberPages = page;

		}();

		var CreatePagers = function() {

			var $isotopePager = ( $('.'+pagerClass).length == 0 ) ? $('<div class="'+pagerClass+'"></div>') : $('.'+pagerClass);

			$isotopePager.html('');
			
			for( var i = 0; i < currentNumberPages; i++ ) {
				var $pager = $('<a href="javascript:void(0);" class="pager" '+pageAtribute+'="'+(i+1)+'"></a>');
					$pager.html(i+1);
					
					$pager.click(function(){
						var page = $(this).eq(0).attr(pageAtribute);
						goToPage(page);
					});

				$pager.appendTo($isotopePager);
			}

			$container.after($isotopePager);

		}();

	}

	setPagination();
	goToPage(1);

	//Adicionando Event de Click para as categorias
	$('.filters a').click(function(){
		var filter = $(this).attr(filterAtribute);
		currentFilter = filter;

		setPagination();
		goToPage(1);

	});

	//Evento Responsivo
	$(window).resize(function(){
		itemsPerPage = defineItemsPerPage();
		setPagination();
	});
});


 $(document).ready( function() {   

// filter items on button click
$('.filter-button-group').on( 'click', 'li', function() {
  var filterValue = $(this).attr('data-filter');
  $('.grid').isotope({ filter: filterValue });
  $('.filter-button-group li').removeClass('active');
  $(this).addClass('active');
});
    })
	

 $(document).ready( function() {   

// filter items on button click
$('.isotope-pager').on( 'click', 'a', function() {
  var filterValue = $(this).attr('data-page');

  $('.isotope-pager a').removeClass('active');
  $(this).addClass('active');
});
    })

	$(function() {
  $('.acc__title').click(function(j) {
    
    var dropDown = $(this).closest('.acc__card').find('.acc__panel');
    $(this).closest('.acc').find('.acc__panel').not(dropDown).slideUp();
    
    if ($(this).hasClass('open')) {
      $(this).removeClass('open');
    } else {
      $(this).closest('.acc').find('.acc__title.open').removeClass('open');
      $(this).addClass('open');
    }
    
    dropDown.stop(false, true).slideToggle();
    j.preventDefault();
  });
});

// Sal Animation js
sal({
	threshold: 0.1,
	once: true,
});

