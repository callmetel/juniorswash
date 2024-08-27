jQuery(document).ready(function ($)
{
    $.fn.equalHeights = function ()
    {
        let maxHeight = 0;

        $(this).each(function ()
        {
            maxHeight = Math.max($(this).height(), maxHeight);
        });

        $(this).each(function ()
        {
            $(this).height(maxHeight);
        });
    };

    $('.washer-services-section .list-header .section-title-inner > p').text('Select add-on services below.');
    $('.washer-package-section .list-header .section-title-inner > p').text('Select a service below.');

    var washer_types = $('.washer-type-section input.washer-type').length;
    $('.washer-type-section input.washer-type').each(function (index, el)
    {
        let type = $(this).attr('id').replace('type-', '');
        $(this).next('.list-item-label').prepend('<div class="washer-type-img"><img src="/wp-content/uploads/' + type + '.png" /></div>');

        if (index === (washer_types - 1))
        {
            setTimeout(function ()
            {
                $('.washer-type-img').equalHeights();
            }, 50);

        }
    });

    $(window).resize(function ()
    {
        $('.washer-type-img').equalHeights();
    });

    $('.washer-type-section .list-content li label').click(function (e)
    {
        $('.washer-type-section').slideUp(150);
        $('.washer-package-section').slideDown(150);
    });

    // Add back buttons to sections
    $('.washer-package-section').append('<div class="list-footer"><p class="change-vehicle">Change vehicle</p></div>');
    $('.washer-time-section,.washer-services-section').append('<div class="list-footer"><p class="change-package">Change package</p></div>');

    $(document).delegate('.change-vehicle', 'click', function (e)
    {
        $(this).closest('.single-main-list_item').slideUp(150);
        $('.washer-type-section').slideDown(150);
    });

    $(document).delegate('.change-package', 'click', function (e)
    {
        $(this).closest('.single-main-list_item').slideUp(150);
        $('.washer-package-section').slideDown(150);
    });
});