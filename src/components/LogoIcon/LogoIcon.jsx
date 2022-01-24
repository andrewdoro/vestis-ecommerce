import * as React from "react";
import { SvgIcon } from "@mui/material";
const LogoIcon = (props) => {
   const stroke = () => {
      return (
         <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 512 512"
         >
            <defs>
               <linearGradient
                  id="prefix__a"
                  x1={26.02}
                  y1={230.02}
                  x2={341.01}
                  y2={230.02}
                  gradientUnits="userSpaceOnUse"
               >
                  <stop offset={0} stopColor="#c03a2a" />
                  <stop offset={1} stopColor="#f49c13" />
               </linearGradient>
               <linearGradient
                  id="prefix__b"
                  x1={55.35}
                  y1={396.16}
                  x2={274.98}
                  y2={396.16}
                  xlinkHref="#prefix__a"
               />
               <linearGradient
                  id="prefix__c"
                  x1={174.95}
                  y1={267.61}
                  x2={490.01}
                  y2={267.61}
                  xlinkHref="#prefix__a"
               />
               <linearGradient
                  id="prefix__d"
                  x1={241.04}
                  y1={89.23}
                  x2={429.7}
                  y2={89.23}
                  xlinkHref="#prefix__a"
               />
            </defs>
            <path
               d="M332.5 256c0 4.1-.2 8.2-.5 12.2a241.8 241.8 0 00-265.8 79.6A149 149 0 01258 126.9a150.2 150.2 0 0156.8 58.6 148.3 148.3 0 0117.7 70.5z"
               fill="none"
               strokeMiterlimit={10}
               strokeWidth={17}
               stroke="url(#prefix__a)"
            />
            <path
               d="M258 446.6a148.8 148.8 0 01-191.8-37.2 241.6 241.6 0 01117.7-80.9A148.8 148.8 0 00258 446.6z"
               fill="none"
               strokeMiterlimit={10}
               strokeWidth={17}
               stroke="url(#prefix__b)"
            />
            <path
               d="M481.5 256a149 149 0 01-297.6 10.9 243.3 243.3 0 01148.1 1.3c.3-4 .5-8.1.5-12.2a148.3 148.3 0 00-17.7-70.5 242.5 242.5 0 00101-53A148.5 148.5 0 01481.5 256z"
               fill="none"
               strokeMiterlimit={10}
               strokeWidth={17}
               stroke="url(#prefix__c)"
            />
            <path
               d="M415.8 74.8a242.5 242.5 0 01-101 53A149.3 149.3 0 00258 69.3a148.8 148.8 0 01157.8 5.5z"
               fill="none"
               strokeMiterlimit={10}
               strokeWidth={17}
               stroke="url(#prefix__d)"
            />
         </svg>)
   }
   const filled = () => {
      return (
         <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 512 512">
            <defs>
               <linearGradient
                  id="a"
                  x1="34.52"
                  x2="332.51"
                  y1="227.41"
                  y2="227.41"
                  gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#c03a2a"></stop>
                  <stop offset="1" stopColor="#f49c13"></stop>
               </linearGradient>
               <linearGradient
                  id="b"
                  x1="66.17"
                  x2="258.01"
                  y1="397.56"
                  y2="397.56"
                  xlinkHref="#a"></linearGradient>
               <linearGradient
                  id="c"
                  x1="183.91"
                  x2="481.51"
                  y1="268.72"
                  y2="268.72"
                  xlinkHref="#a"></linearGradient>
               <linearGradient
                  id="d"
                  x1="258.01"
                  x2="415.83"
                  y1="88.56"
                  y2="88.56"
                  xlinkHref="#a"></linearGradient>
            </defs>
            <path
               fill="url(#a)"
               d="M332.51 256q0 6.17-.5 12.18a242.09 242.09 0 00-265.84 79.63A149 149 0 11332.51 256z"></path>
            <path
               fill="url(#b)"
               d="M258 446.65a149 149 0 01-191.83-37.24 242.26 242.26 0 01117.74-80.89A149 149 0 00258 446.65z"></path>
            <path
               fill="url(#c)"
               d="M481.51 256a149 149 0 01-297.6 10.93A243.23 243.23 0 01332 268.18q.5-6 .5-12.18a148.18 148.18 0 00-17.71-70.51 241.44 241.44 0 00101-53A148.85 148.85 0 01481.51 256z"></path>
            <path
               fill="url(#d)"
               d="M415.83 74.76a241.44 241.44 0 01-101 53A149.56 149.56 0 00258 69.26a149.1 149.1 0 01157.82 5.5z"></path>
         </svg>
      )
   }
   return (
      <SvgIcon {...props}>
         {props.variant ? stroke() : filled()}
      </SvgIcon>
   );
};

export default LogoIcon;
