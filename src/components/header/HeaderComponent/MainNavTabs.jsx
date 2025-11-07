import { Link } from 'react-router-dom'; // or wherever your Link component comes from

const MainNavTabs = ({
  parentClass,
  to,
  image,
  imageAttr,
  label,
  darkMode,
}) => {



  const sharedClass = ` w-max flex justify-center items-center gap-2 p-2 text-sm font-medium rounded-md border duration-300 hover:text-white ${darkMode ? "border-[#5d5d5d] text-white hover:bg-[#5d5d5d]" : "border-[#22a5ad] text-black hover:bg-[#22a5ad]"} `
  return (
    <>
      <li className={`${parentClass}flex justify-center items-center`}>
        <Link
          className={sharedClass}
          to={to}
        >
          <span className="flex justify-center items-center">
            <img src={image} alt={imageAttr} title={imageAttr} width={28} height={28} className="rounded-full" />
          </span>
          <span className="flex justify-center items-center "> {label} </span>
        </Link>
      </li>
    </>
  );
};

export default MainNavTabs;



