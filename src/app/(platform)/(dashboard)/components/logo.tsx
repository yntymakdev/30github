import Image from "next/image";
import  logo from "./logoipsum-297.svg"
export default function Logo ()  {
  return (
    <div>
    <Image src={logo} alt='logo' width={130} height={130}/>

    </div>
  );
};


