import React, { useRef, useEffect, useState } from 'react';
import './styles.css';
import { FloatingDiv } from './components/FloatingDiv';
import useDynamicRefs from 'use-dynamic-refs';
import { gsap } from 'gsap';

export default function App() {
  const refs = React.useRef([]);
  const [num] = useState(15);
  const floatCont = useRef(null);
  const [getRef, setRef] = useDynamicRefs();
  const [listAr, setListAr] = useState([]);
  const getFloatCont = () => {
    return floatCont;
  };

  useEffect(() => {
    const ar = [];
    for (var index = 0; index < num; index++) {
      refs.current[index] = refs.current[index] || React.createRef();
      //ar.push(refs.current[index]);
      //ar.push(React.createRef());
      ar.push(index);
      console.log(index);
    }
    setListAr(ar); //listArt похоже нужен т/к реф не вызывает ререндеринга

    floatCont.current.onmousemove = function (e) {
      var divWidth = e.currentTarget.offsetWidth;
      var halfDivWidth = e.currentTarget.offsetWidth / 2;
      console.log('halfDivWidth', halfDivWidth);

      var x = e.pageX - e.currentTarget.offsetLeft;
      var y = e.pageY - e.currentTarget.offsetTop;
      console.log(x);

      refs.current.forEach((item, index) => {
        var styleft = item.current.style.left;
        var xleft = styleft.substr(0, styleft.length - 2);
        var depth = Math.abs(xleft - halfDivWidth);
        var xshift = halfDivWidth - x;

        gsap.to(refs.current[index].current, {
          xPercent: -50 + (xshift * depth) / divWidth,

          yPercent: -50,
          //getRelativeCoordinates(e, refs.current[index].current).x / 10
        });
      });
    };
  }, []);

  //useEffect(() => {}, [listAr]);

  function getRefById(id) {
    console.log('id', id);
    //return getRef(id);
  }

  return (
    <div className="App">
      <h1>FLOATING DIV {listAr.length}</h1>
      <div className="floatArea" ref={floatCont}>
        {
          //listAr.map((item, index) => (
          refs.current.map((item, index) => (
            <FloatingDiv
              randomPosition={true}
              floatCont={getFloatCont}
              key={'l' + index}
              //getRefById={getRefById}
              num={index}
              //ref={setRef(listAr[index])}
              //ref={listAr[index]}
              ref={refs.current[index]}
              // ref={item}
              ref2={refs.current[2]}
            >
              aa{index}a
            </FloatingDiv>
          ))
        }
      </div>
    </div>
  );
}
