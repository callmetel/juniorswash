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
jQuery(document).ready(function ($)
{
    $('p:empty').remove();
});
const awaitSelector = (selector, rootNode, fallbackDelay) => new Promise((resolve, reject) =>
{
    try
    {
        const root = rootNode || document
        const ObserverClass = MutationObserver || WebKitMutationObserver || null
        const mutationObserverSupported = typeof ObserverClass === 'function'
        let observer
        const stopWatching = () =>
        {
            if (observer)
            {
                if (mutationObserverSupported)
                {
                    observer.disconnect()
                } else
                {
                    clearInterval(observer)
                }
                observer = null
            }
        }
        const findAndResolveElements = () =>
        {
            const allElements = root.querySelectorAll(selector)
            if (allElements.length === 0) return
            const newElements = []
            const attributeForBypassing = 'data-awaitselector-resolved'
            allElements.forEach((el, i) =>
            {
                if (typeof el[attributeForBypassing] === 'undefined')
                {
                    allElements[i][attributeForBypassing] = ''
                    newElements.push(allElements[i])
                }
            })
            if (newElements.length > 0)
            {
                stopWatching()
                resolve(newElements)
            }
        }
        if (mutationObserverSupported)
        {
            observer = new ObserverClass(mutationRecords =>
            {
                const nodesWereAdded = mutationRecords.reduce(
                    (found, record) => found || (record.addedNodes && record.addedNodes.length > 0),
                    false
                )
                if (nodesWereAdded)
                {
                    findAndResolveElements()
                }
            })
            observer.observe(root, {
                childList: true,
                subtree: true,
            })
        } else
        {
            observer = setInterval(findAndResolveElements, fallbackDelay || 250)
        }
        findAndResolveElements()
    } catch (exception)
    {
        reject(exception)
    }
})
const watchAwaitSelector = (callback, selector, rootNode, fallbackDelay) =>
{
    (function awaiter(continueWatching = true)
    {
        if (continueWatching === false) return
        awaitSelector(selector, rootNode, fallbackDelay)
            .then(callback)
            .then(awaiter)
    }())
}
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