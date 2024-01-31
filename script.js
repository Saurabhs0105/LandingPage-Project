const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});


function firstPageAnim() {
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: '-10', opacity: 0, duration: 1.5, ease: Expo.easeInOut
    })

        .to(".boundingelem", {
            y: 0,
            ease: Expo.easeInOut,
            duration: 2,
            delay: -1,
            stagger: 0.2,

        })
        .from("#herofooter", {
            y: -10,
            opacity: 0,
            duration: 1.5,
            delay: -1,
            ease: Expo.easeInOut
        })
}


var timer;

function circleChaptaKaro() {
    // define default scale value

    var xscale = 1;
    var yscale = 1;
    var Xprev = 0;
    var Yprev = 0;

    window.addEventListener("mousemove", function (dets) {
        clearTimeout(timer)
        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - Xprev);
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - Yprev);
        Xprev = dets.clientX;
        Yprev = dets.clientY;
        circleMouseFollower(xscale, yscale);
        timer = setTimeout(function () {
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${1},${1})`;
        }, 100)
    })
}


function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
    });
}

circleChaptaKaro();
circleMouseFollower();
firstPageAnim();

document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function (dets) {

        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration: 0.5,


        });

    });


    elem.addEventListener("mousemove", function (dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;


        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
        });

    });
});