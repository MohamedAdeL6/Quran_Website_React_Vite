import { Link } from 'react-router-dom'; // or wherever your Link component comes from

const IconWithTooltip = ({
  // eslint-disable-next-line no-unused-vars
  Icon,
  parentClass,
  label,
  darkMode,
  onClick,
  isLink,
  to }) => {


  const Wrapper = isLink ? Link : 'button';

  const sharedClass = `group relative duration-300 p-2 rounded-full cursor-pointer hover:text-white
                         ${darkMode ? "hover:bg-[#5d5d5d] text-white border border-[#5d5d5d]" : "hover:bg-[#22a5ad]"}
                      `
  const tooltipClass = `hidden z-10 group-hover:flex p-2 justify-center items-center text-sm 
                        rounded-lg absolute top-[127%] left-[50%] translate-x-[-50%] w-max 
                        after:content-[''] after:absolute after:bottom-full after:left-[50%]
                        after:translate-x-[-50%] after:border-[7px] after:border-t-transparent
                        after:border-r-transparent after:border-l-transparent 
                        after:border-[#000] ${darkMode ? "bg-[#fff] text-[#000]" : "bg-[#000] text-[#fff]"}
                      `
  return (
    <>
      <div className={`${parentClass} flex justify-center items-center`}>
        <Wrapper
          {...(isLink ? { to } : {})}
          className={`${sharedClass}`}
          onClick={onClick}
        >
          <Icon className="text-2xl" />
          <span className={`${tooltipClass}`}>{label}</span>
        </Wrapper>
      </div>
    </>
  );
};

export default IconWithTooltip;



