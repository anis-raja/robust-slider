// **********written by "Anis Raja"**********
function makeAnimationDivWidthOverflowHidden() {
  const _loop_slider_list = document.getElementsByClassName("loop-slider");
  const loopSliderContainerList = document.getElementsByClassName("loop-slider-container");
  if (_loop_slider_list && loopSliderContainerList) {
    for (let g = 0; g < _loop_slider_list.length; g++) {
      const loopSliderDiv = _loop_slider_list[g];
      const loopSliderContainerDiv = loopSliderContainerList[g] as HTMLElement;
      // Check if the targetDiv has a parent with class name "loop-slider-parent"
      if (loopSliderDiv.parentElement && !loopSliderDiv.parentElement.classList.contains('loop-slider-parent')) {
        if(loopSliderContainerDiv){
          loopSliderContainerDiv.style.display = "grid";
          let loopSliderParent = document.createElement('div');
          loopSliderParent.style.overflow = "hidden";
          loopSliderContainerDiv.appendChild(loopSliderParent);
          loopSliderParent.appendChild(loopSliderDiv);
        }
      }
    }
    for (let h = 0; h < _loop_slider_list.length; h++) {
      const loopSliderDiv = _loop_slider_list[h];
      const loopSliderContainerDiv = loopSliderContainerList[h];
      // Check if the targetDiv has a parent with class name "loop-slider-parent"
      if (loopSliderDiv.parentElement && !loopSliderDiv.parentElement.classList.contains('loop-slider-parent')) {
        if(loopSliderContainerDiv && loopSliderContainerDiv.firstElementChild){
          loopSliderContainerDiv.firstElementChild.classList.add('loop-slider-parent');
        }
      }
    }
  }
}
// make sure this function run once, otherwise it will create multiple copies inner sliding elements
export function robustSlider() {
  // this is to get rid of horizontal bar or to make animation div's width independent of parent div's width.
  makeAnimationDivWidthOverflowHidden();
  const _loop_slider_list = document.getElementsByClassName("loop-slider");
  if (_loop_slider_list) {
    for (let i = 0; i < _loop_slider_list.length; i++) {
      const _loop_slider_list_current = _loop_slider_list[i] as HTMLElement;
      const isAnimAlreadyRunning =
        _loop_slider_list_current.getAttribute("is-running");
      if(!isAnimAlreadyRunning){
        let sliderDuration = 15000; // default duration in 15000ms
        const defaultSpeedAttr = 5;
        const speedAttr = _loop_slider_list_current.getAttribute("data-speed") || null;
        const alignAttr = _loop_slider_list_current.getAttribute("data-align") || "left";
        const directionAttr = _loop_slider_list_current.getAttribute("data-direction");
        const pauseTimeAttr = parseInt(_loop_slider_list_current.getAttribute("pause-time") ?? '') || undefined;
        const playTimeAttr = parseInt(_loop_slider_list_current.getAttribute("play-time") ?? '') || undefined;
        const pauseOnHover =
          _loop_slider_list_current.getAttribute("pause-on-hover") || null;
        const sliderInnerElem =
          _loop_slider_list_current.getElementsByClassName("loop-slider-inner")[0] as HTMLElement;
        // default direction is normal, mean rtl
        const sliderDirection = directionAttr === "ltr" ? "reverse" : "normal";
        if (sliderInnerElem) {
          _loop_slider_list_current.setAttribute("is-running", String(true));
          // double or (duplicate all child and add in same parent element)
          const sliderInnerElemChildren = sliderInnerElem.children;
          const clonedChildElements = [];
          if (sliderInnerElemChildren) {
            // Loop through all child elements
            for (let j = 0; j < sliderInnerElemChildren.length; j++) {
              const clonedSliderInnerElemChild =
                sliderInnerElemChildren[j].cloneNode(true);
              clonedChildElements.push(clonedSliderInnerElemChild);
            }
            // append each cloned chlid element
            clonedChildElements.forEach(function (currentClonedElement) {
              sliderInnerElem.appendChild(currentClonedElement);
            });
            // below code is to show 50% animation block and in center the animation block to maintain continuous visibility
            if(alignAttr==="center"){
              const halfWidth = (sliderInnerElem.scrollWidth/2)-2;
              _loop_slider_list_current.style.width = halfWidth + "px";
              _loop_slider_list_current.style.marginLeft = "auto";
              _loop_slider_list_current.style.marginRight = "auto";
            }
            // 5 is the default speed
            const _speed =
              speedAttr && 
              parseFloat(speedAttr) > 0
                ? parseFloat(speedAttr)
                : defaultSpeedAttr;
            sliderDuration = (sliderInnerElem.scrollWidth * 100) / _speed;
            // check both "pauseTimeAttr" and "playTimeAttr" are number and greater than "zero"
            if (
              pauseTimeAttr &&
              pauseTimeAttr > 0 &&
              playTimeAttr &&
              playTimeAttr > 0
            ) {
              // below code run the animation with steps using pauseTime and playTime
              function runAnimation() {
                sliderInnerElem.style.animationPlayState = "running";
                setTimeout(function () {
                  pauseAnimation();
                }, playTimeAttr);
              }
              function pauseAnimation() {
                sliderInnerElem.style.animationPlayState = "paused";
                setTimeout(function () {
                  runAnimation();
                }, pauseTimeAttr);
              }
              // run animation with pause-time and play-time "continuously"
              runAnimation();
            }
            _loop_slider_list_current.style.setProperty(
              "--loop_slider_duration",
              sliderDuration + "ms"
            );
            _loop_slider_list_current.style.setProperty(
              "--loop_slider_direction",
              sliderDirection
            );
            // display elements after animation starts
            setTimeout(function () {
              _loop_slider_list_current.style.setProperty("opacity", "1");
              _loop_slider_list_current.style.setProperty("transition", "opacity 1s");
            }, 300);

            if (pauseOnHover === "true") {
              // pause animation onHover
              _loop_slider_list_current.addEventListener("mouseover", () => {
                sliderInnerElem.classList.add("loopSliderPauseOnHover");
              });
              _loop_slider_list_current.addEventListener("mouseout", () => {
                sliderInnerElem.classList.remove("loopSliderPauseOnHover");
              });
            }
            // Update the "sliderDuration" whenever the parent element width changes due to the loading
            // of images/elements inside the parent element, as the "sliderDuration" is directly dependent
            // on the parent element's width.
            function handleResize() {
              sliderDuration = (sliderInnerElem.scrollWidth * 100) / _speed;
              _loop_slider_list_current.style.setProperty(
                "--loop_slider_duration",
                sliderDuration + "ms"
              );
            }
            // Create a ResizeObserver with the callback function
            const resizeObserver = new ResizeObserver(handleResize);
            // Start observing the target element
            resizeObserver.observe(sliderInnerElem);
          }
        }
      }
    }
  }
}


