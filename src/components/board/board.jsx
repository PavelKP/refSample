import React, { useEffect, useRef } from 'react';
import CustomButton from '../custom-button/custom-button';
import CustomButtonBig from '../custom-button-big/custom-butto-big';
import CustomInput from '../custom-input/custom-input';
import CustomInputDisabled from '../custom-input-disabled/custom-input-disabled';

 
const SimpleSwiper = () => {

  // 1 variant 
  // Пробросили ref под другим именем, он работает
  const simpleRef = React.createRef();

  // 2 variant
  // forwardRef
  const ref = React.createRef();

  // 3 variant
  // useImperativeHandle
  const inputParentRef = useRef(null);

  const handleInputBlur = () => {
    //debugger
    console.log(inputParentRef.current); // Содержит одно свойство blur, которое описали в useImperativeHandle
    inputParentRef.current.blur(); // Вызываем blur тут и вызывается blur в useImperativeHandle
    // отрабатывает получается blur в useImperativeHandle
  }

  // 4 variant
  // вешаем функцию через реф 
  const handledInputRef = React.createRef();


  useEffect(() => {
    console.log(`simple ref`);
    console.log(simpleRef.current);
    console.log(`forward ref`);
    console.log(ref.current);
    ref.current.addEventListener(`click`, () => console.log(`Click from native listener!`));
  });
  

  return (
    <>
      <p>Custom button test with simple ref</p>
      <CustomButton simpleRef={simpleRef} />

      <p>Custom button test with forward ref</p>
      <CustomButtonBig ref={ref} />

      <p>Custom input with mutated handler</p>
      <CustomInput ref={inputParentRef} onBlur={handleInputBlur}/>

      <p>function through ref</p>
      <button onClick={() => handledInputRef.current.anyFunction()}>disable input</button>
      <CustomInputDisabled ref={handledInputRef} />
    </> 
  )
}
 
export default SimpleSwiper;