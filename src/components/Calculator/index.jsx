import './styles.scss';
import { useState } from 'react';
import { Display } from '../Display';
import { Button } from '../Button';

export const Calculator = () => {
  const [inputValue, setInputValue] = useState('');
  const [firstValue, setFirstValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [replaceDisplay, setReplaceDisplay] = useState(false);

  const calculateResult = () => {
    if (firstValue !== null && operator && inputValue !== '') {
      const secondValue = parseFloat(inputValue);
      let result;
      switch (operator) {
        case '+':
          result = firstValue + secondValue;
          break;
        case '-':
          result = firstValue - secondValue;
          break;
        case '*':
          result = firstValue * secondValue;
          break;
        case '/':
          result = secondValue !== 0 ? firstValue / secondValue : 'Erro';
          break;
        default:
          return;
      }
      setInputValue(result.toString());
      setFirstValue(null);
      setOperator(null);
      setReplaceDisplay(true);
    }
  };

  const handleButtonClick = (value) => {
    if (['+', '-', '*', '/'].includes(value)) {
      if (inputValue !== '') {
        setFirstValue(parseFloat(inputValue));
        setOperator(value);
        setReplaceDisplay(true);
      }
    } else if (value === '=') {
      calculateResult();
    } else if (value === 'C') {
      setInputValue('');
      setFirstValue(null);
      setOperator(null);
      setReplaceDisplay(false);
    } else {
      if (replaceDisplay) {
        setInputValue(value);
        setReplaceDisplay(false);
      } else {
        setInputValue((prev) => prev + value);
      }
    }
  };

  return (
    <div className="calculator">
      <Display value={inputValue} />
      <div className="buttons">
        {['7', '8', '9', '/'].map((item) => (
          <Button key={item} label={item} onClick={() => handleButtonClick(item)} />
        ))}
        {['4', '5', '6', '*'].map((item) => (
          <Button key={item} label={item} onClick={() => handleButtonClick(item)} />
        ))}
        {['1', '2', '3', '-'].map((item) => (
          <Button key={item} label={item} onClick={() => handleButtonClick(item)} />
        ))}
        {['0', '.', '=', '+'].map((item) => (
          <Button key={item} label={item} onClick={() => handleButtonClick(item)} />
        ))}
        <Button label="C" onClick={() => handleButtonClick('C')} />
      </div>
    </div>
  );
};
