$(document).ready(function() {
    $(window).on("scroll", function () {
        loadItemsInView();
    });

    (function() {
    [].slice.call(document.querySelectorAll('.tabs')).forEach(function(el) {
        new CBPFWTabs(el);
    });
    })();
    $('#main-nav').sidr();

    $('#fullpage').fullpage({
        'verticalCentered': true,
        'easing': 'easeInOutCirc',
        'css3': false,
        'scrollingSpeed': 900,
        'slidesNavigation': true,
        'slidesNavPosition': 'bottom',
        'easingcss3': 'ease',
        'navigation': true,
        'anchors': ['Home', 'Features', 'Clients', 'Pricing', 'Contact'],
        'navigationPosition': 'left'
    });
    $('.screenshots-content, .clients-content').css('height', $(window).height());

    // CONTACT FORM
    $(document).mouseup(function (e) {
        if ($(".sidr-open ")[0]){
        var container = $("#sidr");

        if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
        {
            $(".sidr-open #main-nav").click();
        }}
    });

    $('#submit').click(function(){ 
        $.post("contact.php", $("#contact-form").serialize(),  function(response) {
            $('#success').fadeIn().html(response);
            $('#success').delay(2000).fadeOut();
        });
        return false;
    });
});
jQuery(window).load(function() {
    jQuery('#preloader').fadeOut('fast');
});

function isElementInViewport(el) {
  if (!el)
    return false;
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) 
  );
}
function loadItemsInView() {
  //Select elements by the row id.
  $(".section-image > img [data-src]").each(function () {
      var isVisible = isElementInViewport(this);
      if (isVisible) {
          if ($(this).attr("src") == undefined) {
              $(this).attr("src", $(this).data("src"));
          }
      }
  });
}