function minsToHrsMins(mins)
{
    // getting the hours.
    let hrs = Math.floor(mins / 60);
    // getting the minutes.
    let min = mins % 60;
    // formatting the hours.
    hrs = hrs <= 0 ? '' : hrs + 'hr ';
    // formatting the minutes.
    min = min <= 0 ? '' : min + 'min';
    // returning them as a string.
    return `${hrs}${min}`;
}

watchAwaitSelector(function ()
{
    $('.package-table-single-item').each(function ()
    {
        let name = $(this).find('.package-title').text().replace(/[^A-Z0-9]/ig, '');
        $(this).attr('data-name', name);

        let duration = $(this).find('.package-duration > span');
        let min = duration.text().slice(0, -3);
        duration.text(minsToHrsMins(min));
    });
}, '.package-table-single-item');

$(document).delegate('.package-table-footer input[type="radio"]', 'change click', function (e)
{
    $('.package-table-footer input[type=radio]:checked').closest('.package-table-single-item').addClass('selected').siblings('.package-table-single-item').removeClass('selected');
    if ($(this).data('title') === 'Build Your Own Wash')
    {
        $('.washer-package-section').slideUp(150);
        $('.washer-services-section').slideDown(150);
    }
    else
    {
        $('.washer-package-section').slideUp(150);
        $('.washer-time-section').slideDown(150);
        $('.washer-booking-form-nav-item').removeClass('active');
        $('.washer-booking-form-nav-item.datetime').addClass('active');
    }

});

watchAwaitSelector(function ()
{
    const packagesSlider = document.querySelector('.washer-package-section .list-content .package-table-wrap');
    let isDown = false;
    let startX;
    let scrollLeft;

    packagesSlider.addEventListener('mousedown', (e) =>
    {
        isDown = true;
        packagesSlider.classList.add('active');
        startX = e.pageX - packagesSlider.offsetLeft;
        scrollLeft = packagesSlider.scrollLeft;
    });
    packagesSlider.addEventListener('mouseleave', () =>
    {
        isDown = false;
        packagesSlider.classList.remove('active');
    });
    packagesSlider.addEventListener('mouseup', () =>
    {
        isDown = false;
        packagesSlider.classList.remove('active');
    });
    packagesSlider.addEventListener('mousemove', (e) =>
    {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - packagesSlider.offsetLeft;
        const walk = (x - startX) * 3; //scroll-fast
        packagesSlider.scrollLeft = scrollLeft - walk;
        console.log(walk);
    });
}, '.package-table-wrap');