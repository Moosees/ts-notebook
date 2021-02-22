import './button-icon-label.css';

interface ButtonIconProps {
  onClick: () => {};
  icon: string;
  label: string;
}

const ButtonIconLabel: React.FC<ButtonIconProps> = ({
  onClick,
  icon,
  label,
}) => (
  <button
    className="button is-info is-rounded is-small button-icon-label"
    onClick={onClick}
  >
    <span className="icon">
      <i className={`fa ${icon}`} />
    </span>
    <span>{label}</span>
  </button>
);

export default ButtonIconLabel;
