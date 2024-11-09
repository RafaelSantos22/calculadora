import './styles.scss';

export const Display = ({ value }) => {
  return (
    <input type="text" className="display" value={value} readOnly />
  );
};

