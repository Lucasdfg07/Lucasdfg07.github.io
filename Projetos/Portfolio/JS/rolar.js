var $doc = $('html, body');
$('.navegacao a[href^="#"]').click(function() {
    $doc.animate({
        scrollTop: $( $.attr(this, 'href')).offset().top
    }, 500);
    return false;
});
