# Robust-Slider

🎉 This package allows seamless, continuous sliding of text, images, and cards, offering multiple customizable features for an engaging user experience.

It supports **`JavaScript`** and **`TypeScript`** platforms such as:
<br> 
✅ React ✅ Vue ✅ Angular ✅ Next
<br> 
and many more...
<br>
A demo link is available below.

## Demo

[A demo is worth a thousand words](https://robustslider.netlify.app)

## Features

- Super easy to customize
- Make content slide in multiple sections with different speed, gap and steps duration
- Adjustable sliding speed, direction and pause/play durations
- can set gap between sliding element in any unit
- Pause animation on hover

## Usage

Installation

```
$ npm install --save robust-slider
$ yarn add robust-slider
```

## The gist

```jsx
  import { robustSlider } from 'robust-slider';
  import 'robust-slider/dist/styles.min.css';
  
  function App(){
    
    useEffect(()=>{
      robustSlider(); // call this function once for one web page
    },[]);

    return (
      <div>
        <div className='loop-slider-container'>
          <div
            className='loop-slider'
            data-speed='10'
            data-direction='ltr'
            // data-align='center'
            // pause-on-hover='true'
            // pause-time='700'
            // play-time='500'
            style={{ '--loopSliderGap': '20px' }} // for .jsx
            // style={{ '--loopSliderGap': '20px' } as React.CSSProperties} // for .tsx
          >
            <div className='loop-slider-inner'>
              <span># elements</span>
              <span># are</span>
              <span># sliding</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
```

## Options

| Option            | Type       | Default      | Details                                                                                                           |
| ----------------- | ---------- | ------------ | ----------------------------------------------------------------------------------------------------------------- |
| data-speed        | `string`   | `'5'`        | Speed of sliding elements must be greater than '0'	                                                              |
| data-direction    | `string`   | `'rtl'`      | rtl' for (right to left) and 'ltr' for (left to right) animation                                                  |
| data-align        | `string`   | `'left'`     | The value 'center' ensures a seamless continuous animation in center of parent, even with two sliding elements.   |
| --loopSliderGap   | `string`   | `'0px'`      | This applies a gap between sliding elements; specify a unit like 'px' or 'rem' with value                         |
| pause-time        | `string`   | `''`         | Pauses animation for given miliseconds, should be greater than '0'                                                |
| play-time         | `string`   | `''`         | Plays animation for given miliseconds, should be greater than '0'                                                 |
| pause-on-hover    | `string`   | `'false'`    | Value equal to 'true' pauses the animation on hover                                                               |

## Notes

- Animation pause-play effect will only work if values of both "pause-time" and "play-time" are given
- If sliding elements don’t cover the full parent width, add more elements or duplicate them for a seamless animation.
- Call 'robustSlider()' this function only once on the page where sliding elements are used, even if nested components contain sliding elements, to ensure optimization.
- You can customize content by adding your custom class to each div having class 'loop-slider-container' in multiple sliding sections

## License

Licensed under MIT

