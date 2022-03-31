
/* 
 *  The code below is only for lightGallery JS  
 *  lightGallery JS required jQuery >= 1.8.0    
 */

$(document).ready(function() {

    function buildGallery(target, selector) {
        return $(target).lightGallery({
            selector: selector,
            mode: 'lg-soft-zoom',
            download: false,
            closable: false,
            share: false,
            rotate: false,
            flipHorizontal: false,
            flipVertical: false
            }); 
    }
   
    function filterCategory(currentDataFilter, image) {
        let currentImage = $(image);

        if (currentDataFilter === 'all' || $(currentImage).data('filter') ===  currentDataFilter) {
            $(currentImage).appendTo($('#gallery-grid'));
            $(currentImage).removeClass('hidden').addClass('show-up');
        }

        return currentImageShow.push($(currentImage));
    }

    let $galleryHome = buildGallery('#gallery-home', '.item');    // Initialize LightGallery JS for Home Page
    let $gallery = buildGallery('#gallery-grid', '.item');        // Initialize LightGallery JS for Portfolio Page 
    let galleries = $('.gallery-grid-box');                       // Initialize galleries
    let ctgButtons = $('#category .nav-link').toArray();          // Initialize category buttons
    let currentImageShow = [];


/* 
 *  Filter Image Gallery by Category
 *  this is for button navigation 
 */

    // 1. Add click trigger for filter gallery
    $('#category .nav-link').click(function(event) {
        event.preventDefault();
        // Loop each button for check is there contains class active ?
        $(ctgButtons).each(function() {
            $(this).removeClass('active');
            $(this).addClass('disabled');
        });
        
        // Add class active for current target button
        $( event.target ).addClass('active'); 

        // Passing value of target id
        let currentDataFilter = $(event.target).attr('id');

        // Set selected category for select box
        $('#category-select option').each(function() {
            $(this).removeAttr('selected');
            if ($(this).attr('value') === currentDataFilter) {
                $(this).attr('selected', true);
            }
        });
        
    // 2. Then now we'll filter out the Image Gallery
        // First of all, give class 'hidden' to all images *animation is running
        $(galleries).addClass('hidden');

        // Wait for the animation to finish
        setTimeout(function () {
            // Then remove all Images from the DOM
            $(galleries).detach(); 
            $(galleries).each(function() {
                filterCategory(currentDataFilter, this);
            });

            // Re-init lightGallery
            $gallery.data('lightGallery').destroy(true);
            $gallery = buildGallery('#gallery-grid' ,'.item'); 
        }, 500);

        setTimeout(function () {
            $(currentImageShow).each(function(i, elm) {
                $(elm).removeClass('show-up');
            })
            $(ctgButtons).removeClass('disabled');
            currentImageShow = []; 
            // console.log($(currentImageShow))
        }, 1100);
    });


/*
 *  Filter Image Gallery by Category
 *  this for select box navigation. Do the same thing like above 
 */

    $('#category-select').change(function() {
        let currentDataFilter = $(this).find(":selected").val();
        // Add active class to category button
        $(ctgButtons).each(function() {
            $(this).removeClass('active');
            if ($(this).attr('id') === currentDataFilter) {
                $(this).addClass('active'); 
            }
        });

        $(galleries).addClass('hidden');
        setTimeout(function () {
            $(galleries).detach(); 
            $(galleries).each(function() {
                filterCategory(currentDataFilter, this);
            });

            // Re-init lightGallery
            $gallery.data('lightGallery').destroy(true);
            $gallery = buildGallery('#gallery-grid' ,'.item'); 
        }, 500)

        setTimeout(function () {
            $(currentImageShow).each(function(i, elm) {
                $(elm).removeClass('show-up');
            })
            currentImageShow = []; 
        }, 1100); 
    });

/*
 *  Init Light Gallery JS for home page 
 *  this used only for mobile version
 */
    $('.swiper-slide .swiper-img').each(function() {
        buildGallery(this, 'this');
      });
    
    // Mobile Navbar
    $('.toggle-btn').click(function (event) {
        event.preventDefault();
        $('.navbar').addClass('open');
    });

    $('.nav-links li:last-child').click(function (event) {
        event.preventDefault();
        $('.navbar').slideUp(500);
        setTimeout(function() {
                $('.navbar').removeClass('open')
                $('.navbar').css('display', 'flex');
        },590);
    });
});
 


/* ================================================================
  ##   The main code is written below
  ##   I prefer to use the ES6 Javascript syntax
  =================================================================
*/

const ROTATOR = {
    container: document.querySelector('#rotator'), 
    slider: document.querySelector('#rotator .rotator-slider'),
    items: document.querySelectorAll('.rotator-item'), 
    counter : 0,
    yAxis : 0,
    top : 0
}

const PAGE = location.pathname;

function trackElementPositionByScroll(classname) {
    const { bottom } = document.querySelector(classname).getBoundingClientRect();
    return bottom;
}

function showNavbar(toggle = false) {
    if (toggle) {
        document.querySelector('header').classList.add('sticky');
    } else{
        document.querySelector('header').classList.remove('sticky');
    }
}

function textRotatorInit(timing = 3000) {
    setTimeout(() => {
        const movement = ROTATOR.items[ROTATOR.counter].offsetHeight;

        if(ROTATOR.counter == ROTATOR.items.length - 1){
            ROTATOR.counter = 0;   
            ROTATOR.yAxis = 0;
        } else{
            ROTATOR.counter++;
            ROTATOR.yAxis = movement +  ROTATOR.yAxis;
        }

        ROTATOR.slider.style.transform = `translateY(${-ROTATOR.yAxis}px)`;
        
    }, timing);

    setTimeout(() => ROTATOR.container.classList.add('active'), timing - 1000);  // Add CSS class   
    setTimeout(() => ROTATOR.container.classList.remove('active'), timing + 1000);  // Remove CSS class

    setTimeout(textRotatorInit, timing + timing);
};


window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#to-top').addEventListener('click', () => scrollTo(0,0))

    if (PAGE !== '/') return;
    textRotatorInit(5000);
});


//  Scroll Event - Sticky Header
window.addEventListener('scroll', () => {
    let bound;
    if (PAGE !== '/') {
        bound = trackElementPositionByScroll('.hero');
    } else{
        bound = trackElementPositionByScroll('.row.about');
    }
    
    if (bound <= 5) {
        showNavbar(true);
        document.querySelector('#to-top').classList.add('d-block');
    }
    else {
        showNavbar(false);
        document.querySelector('#to-top').classList.remove('d-block');
    }

});


const swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    spaceBetween: 40,
    centeredSlides: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
        320: {
            spaceBetween: 20
        },
        640: {
            spaceBetween: 30
        }
    }
});
