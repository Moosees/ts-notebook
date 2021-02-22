interface ButtonIconProps {
  onClick: () => {};
  icon: string;
}

const ButtonIcon: React.FC<ButtonIconProps> = ({ onClick, icon }) => (
  <button className="button is-info is-small" onClick={onClick}>
    <span className="icon">
      <i className={`fa ${icon}`} />
    </span>
  </button>
);

export default ButtonIcon;
