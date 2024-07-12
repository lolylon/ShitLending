function DoScrolling(targetY, duration) {
    var startingY = window.pageYOffset;
    var diff = targetY - startingY;
    if (!diff) return;
    var easing = function (t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 };
    var start;
    window.requestAnimationFrame(function step(timestamp) {
        if (!start) start = timestamp;
        var time = timestamp - start;
        var percent = easing(Math.min(time / duration, 1));
        window.scrollTo(0, startingY + diff * percent);
        if (time < duration) {
            window.requestAnimationFrame(step);
        }
    });
}

function EnableScroll(targetId) {
    var a_tags = document.getElementsByTagName('a');
    for (let a of a_tags) {
        if (a.classList.contains('ignore-scroll'))
            continue;
        a.removeAttribute('target');
        a.removeAttribute('onclick');
        a.href = "";
        a.addEventListener('click', function (event) {
            event.preventDefault();
            var targetElement = document.getElementById(targetId);
            if (targetElement) {
                var targetY = window.pageYOffset + targetElement.getBoundingClientRect().top;
                DoScrolling(targetY, 1000); 
            } else {
                console.warn('Element with id "' + targetId + '" not found');
            }
        });
    }
}

function InitScrollToElement(targetId, delay = 100) {
    setTimeout(() => {
        EnableScroll(targetId);
    }, delay);
}

document.addEventListener("DOMContentLoaded", function() {
    InitScrollToElement('form_id1', 700); 
});