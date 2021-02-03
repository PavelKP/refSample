import React from 'react';

const CustomInput = (props, ref) => {
	const inputRef = React.useRef(); // Создали новый реф
	const onBlur = props.onBlur; // обработчик из родителя
 
	// Вроде как соединили реф сверху и новый реф
	// Переписали blur

  React.useImperativeHandle(ref, () => ({
    blur: () => {
			//debugger
			inputRef.current.focus();
			document.title = `На блюр стал появился фокус`;
    }
  }));

  return (
    <input
			ref={inputRef} // Передаём новый реф
			onBlur={onBlur}
    />
  );
};

export default  React.forwardRef(CustomInput);