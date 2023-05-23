import style from "./Tag.module.css";

const Tag = ({ sex, children }) => {
  return (
    <span className={[style.tag, style["sex-" + sex]].join(" ")}>{children}</span>
  );
};

export default Tag;