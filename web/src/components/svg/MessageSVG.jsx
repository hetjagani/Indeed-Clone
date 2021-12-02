import * as React from 'react';

const MessageSVG = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 120" {...props}>
    <style />
    <defs>
      <linearGradient
        id="spot-messages-6_svg__spot-messages-6__paint0_linear"
        x1={108.592}
        x2={100.967}
        y1={50.839}
        y2={103.538}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#E867A8" />
        <stop offset={1} stopColor="#9D2B6B" />
      </linearGradient>
      <linearGradient
        id="spot-messages-6_svg__spot-messages-6__paint1_linear"
        x1={46.762}
        x2={56.997}
        y1={17.684}
        y2={87.806}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#237EA3" />
        <stop offset={1} stopColor="#1D465C" />
      </linearGradient>
      <filter
        id="spot-messages-6_svg__spot-messages-6__filter0_i"
        width={47.856}
        height={52.98}
        x={76.168}
        y={51.268}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={1} dy={1} />
        <feGaussianBlur stdDeviation={0.5} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
        <feBlend in2="shape" result="effect1_innerShadow" />
      </filter>
      <filter
        id="spot-messages-6_svg__spot-messages-6__filter1_i"
        width={63.352}
        height={70.169}
        x={28.002}
        y={18.147}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={1} dy={1} />
        <feGaussianBlur stdDeviation={0.5} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
        <feBlend in2="shape" result="effect1_innerShadow" />
      </filter>
      <clipPath id="spot-messages-6_svg__spot-messages-6__svgClip">
        <path
          xmlns="http://www.w3.org/2000/svg"
          id="spot-messages-6_svg__spot-messages-6__Mask"
          fill="#fff"
          d="M90.287 47.122c-.8-12.218-8.85-23.312-21.19-27.397-16.245-5.378-33.775 3.432-39.153 19.678a30.84 30.84 0 00-.743 16.866l-2.23.333-10.846 51.738h117.75l-9.148-66.374-34.44 5.156z"
        />
      </clipPath>
      <pattern
        id="spot-messages-6_svg__spot-messages-6__texture"
        width={38}
        height={32}
        x={0}
        y={0}
        patternTransform="scale(.3)"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M10 0h1v1h-1V0zm8 0h1v1h-1V0zm15 0h1v1h-1V0zm10 1h1v1h-1V1zm27 0h1v1h-1V1zM6 1h1v1H6V1zm23 0h1v1h-1V1zm2 0h1v1h-1V1zm25 0h1v1h-1V1zm19 0h1v1h-1V1zM3 1h1v1H3V1zm4 1h1v1H7V2zm16 0h1v1h-1V2zm14 0h1v1h-1V2zm8 0h1v1h-1V2zm8 0h1v1h-1V2zm5 0h1v1h-1V2zm10 0h1v1h-1V2zM1 3h1v1H1V3zm3 0h1v1H4V3zm4 0h2v1H8V3zm6 0h1v1h-1V3zm2 0h1v1h-1V3zm9 0h1v1h-1V3zm2 0h2v1h-2V3zm9 0h2v1h-2V3zm6 1h1v1h-1V4zm8 0h1v1h-1V4zm11 0h1v1h-1V4zm4 0h1v1h-1V4zM21 4h1v1h-1V4zm9 0h1v1h-1V4zm7 0h1v1h-1V4zm9 0h1v1h-1V4zm13 1h1v1h-1V5zm11 0h1v1h-1V5zm4 0h1v1h-1V5zM4 5h1v1H4V5zm3 0h1v1H7V5zm5 0h1v1h-1V5zm28 0h1v1h-1V5zm15 1h2v1h-2V6zm10 0h1v1h-1V6zm10 0h1v1h-1V6zM1 6h1v1H1V6zm8 0h1v1H9V6zm16 0h1v1h-1V6zm8 0h1v1h-1V6zm12 0h1v1h-1V6zm2 1h1v1h-1V7zm3 0h1v1h-1V7zm2 0h1v2h-1V7zm3 0h1v1h-1V7zm4 0h1v1h-1V7zM6 7h1v1H6V7zm12 0h1v1h-1V7zm1 0h2v1h-2V7zm7 0h1v1h-1V7zm3 1h1v2h-1V8zm38 0h1v1h-1V8zm7 0h1v1h-1V8zM3 8h1v1H3V8zm4 0h1v1H7V8zm4 0h1v1h-1V8zm4 0h1v1h-1V8zm9 1h1v1h-1V9zm24 0h1v1h-1V9zm3 0h1v1h-1V9zm2 0h1v1h-1V9zm2 0h1v1h-1V9zm13 0h1v1h-1V9zm2 0h1v1h-1V9zm5 1h1v1h-1v-1zm-57 0h1v1h-1v-1zm9 0h1v1h-1v-1zm39 0h1v1h-1v-1zm5 0h2v1h-2v-1zm6 0h2v1h-2v-1zm-65 0h1v1h-1v-1zm4 1h1v1h-1v-1zm12 0h1v1h-1v-1zm3 0h1v1h-1v-1zm1 0h1v1h-1v-1zm9 0h1v1h-1v-1zm3 0h1v1h-1v-1zm2 0h1v1h-1v-1zm12 1h1v2h-1v-2zm5-1h1v1h-1v-1zM6 12h1v1H6v-1zm4 0h1v1h-1v-1zm4 0h1v1h-1v-1zm7 0h1v1h-1v-1zm2 0h1v1h-1v-1zm31 0h1v1h-1v-1zm12 0h1v1h-1v-1zm11 1h1v1h-1v-1zM1 13h1v1H1v-1zm12 0h1v1h-1v-1zm4 0h1v1h-1v-1zm7 0h1v1h-1v-1zm19 0h1v1h-1v-1zm19 0h1v1h-1v-1zm8 1h1v1h-1v-1zM2 14h1v1H2v-1zm20 0h1v1h-1v-1zm4 0h1v1h-1v-1zm5 0h2v1h-2v-1zm10 0h1v1h-1v-1zm-2-2h1v1h-1v-1zm7 2h1v1h-1v-1zm3 0h1v1h-1v-1zm1 1h2v1h-2v-1zm19 0h1v1h-1v-1zm-58 0h1v1h-1v-1zm3 0h1v1h-1v-1zm13 0h2v1h-2v-1zm9 0h1v1h-1v-1zm1-7h1v1h-1V8zm7 7h1v1h-1v-1zm10 1h1v2h-1v-2zm6 0h1v2h-1v-2zm5-1h2v1h-2v-1zm8 1h1v1h-1v-1zM5 16h1v2H5v-2zm8 0h1v1h-1v-1zm35 1h1v2h-1v-2zm4-1h1v1h-1v-1zm4 0h1v1h-1v-1zM2 16h1v1H2v-1zm17 1h1v1h-1v-1zm8 0h1v2h-1v-2zm6 0h1v1h-1v-1zm28 0h2v1h-2v-1zM3 17h1v1H3v-1zm11 0h1v1h-1v-1zm2 0h1v1h-1v-1zm8 1h1v1h-1v-1zm12 0h1v1h-1v-1zm13 0h1v1h-1v-1zm17 0h1v1h-1v-1zm2 0h2v1h-2v-1zm8 0h2v1h-2v-1zM5 18h1v1H5v-1zm6 1h1v1h-1v-1zm15 0h1v1h-1v-1zm32 0h1v1h-1v-1zm2 0h1v1h-1v-1zm13 0h1v1h-1v-1zm-56 0h1v1h-1v-1zm3 0h1v1h-1v-1zm9 1h1v1h-1v-1zm7 0h1v1h-1v-1zm6 0h1v1h-1v-1zm20 0h1v1h-1v-1zm3 0h1v1h-1v-1zm11 0h1v1h-1v-1zM6 20h2v1H6v-1zm6 0h1v1h-1v-1zm23 1h1v1h-1v-1zm11 0h1v1h-1v-1zm7 0h1v1h-1v-1zm11 0h1v1h-1v-1zm7 0h1v1h-1v-1zM5 21h1v1H5v-1zm10 0h1v1h-1v-1zm4 1h1v1h-1v-1zm17 0h1v1h-1v-1zm3 0h1v1h-1v-1zm3 0h1v1h-1v-1zm34 0h1v1h-1v-1zM9 22h1v1H9v-1zm43 0h1v1h-1v-1zm8 0h1v1h-1v-1zm1 1h1v1h-1v-1zm3 0h1v1h-1v-1zm4 0h1v1h-1v-1zM2 24h1v2H2v-2zm27-1h1v1h-1v-1zm6 0h1v1h-1v-1zm5 0h2v1h-2v-1zm6 0h1v1h-1v-1zm11 0h1v1h-1v-1zm15 1h1v1h-1v-1zM4 24h1v1H4v-1zm15 0h1v1h-1v-1zm11 0h1v1h-1v-1zm9 0h1v1h-1v-1zm29 0h1v1h-1v-1zM7 25h1v1H7v-1zm4 0h1v1h-1v-1zm3 0h1v1h-1v-1zm10 0h1v1h-1v-1zm11 0h1v1h-1v-1zm8 1h1v2h-1v-2zm18-1h2v1h-2v-1zm9 0h1v1h-1v-1zm5 0h1v1h-1v-1zm2 1h1v1h-1v-1zm-62 0h1v1h-1v-1zm5 0h1v1h-1v-1zm2 0h1v1h-1v-1zm24 0h1v1h-1v-1zm12 0h1v1h-1v-1zm3 0h1v1h-1v-1zm7 1h1v1h-1v-1zm3 0h1v1h-1v-1zM9 27h1v1H9v-1zm18 0h1v1h-1v-1zm9 0h1v1h-1v-1zm3 0h2v1h-2v-1zm10 0h1v1h-1v-1zm3 1h1v1h-1v-1zm5 0h1v1h-1v-1zm12 0h1v1h-1v-1zm7 0h2v1h-2v-1zM3 28h1v1H3v-1zm20 0h1v1h-1v-1zm3 0h1v1h-1v-1zm2 0h1v1h-1v-1zm19 1h1v1h-1v-1zm13 0h1v1h-1v-1zm1 0h1v1h-1v-1zm10 0h1v1h-1v-1zM8 29h1v1H8v-1zm8 0h2v1h-2v-1zm5 0h1v1h-1v-1zm4 1h1v1h-1v-1zm7 0h1v1h-1v-1zm3 0h1v1h-1v-1zm3 0h1v1h-1v-1zm3 0h1v1h-1v-1zm4 1h1v2h-1v-2zm8 0h1v2h-1v-2zm2-1h1v1h-1v-1zm14 0h1v1h-1v-1zM1 30h1v1H1v-1zm10 1h1v1h-1v-1z"
          fillRule="evenodd"
          clipRule="evenodd"
          fill="#404040"
        />
        <path
          d="M11 31h2v1h-2v-1zm7 0h1v1h-1v-1zm18 0h1v1h-1v-1zm6 0h1v1h-1v-1zm5 0h1v1h-1v-1zm12 1h1v1h-1v-1zm4 0h1v1h-1v-1z"
          fillRule="evenodd"
          clipRule="evenodd"
          fill="#404040"
        />
        <path
          d="M63 32h2v1h-2v-1zm9 0h1v1h-1v-1zm5 0h1v1h-1v-1zM8 33h1v2H8v-2zm11-1h1v1h-1v-1zm23 0h1v1h-1v-1zm31 1h1v1h-1v-1zm-49 0h1v1h-1v-1zm6 0h1v1h-1v-1zm13 0h1v1h-1v-1zm6 0h1v1h-1v-1zm4 0h1v1h-1v-1zm18 0h1v1h-1v-1zm-46 1h1v2h-1v-2zm10 0h1v1h-1v-1zm15 0h1v1h-1v-1zm12 0h1v1h-1v-1zm-52 0h1v1h-1v-1zm4 1h1v2h-1v-2zm17-1h1v1h-1v-1zm8 0h1v1h-1v-1zm12 0h1v1h-1v-1zm6 1h1v2h-1v-2zm4-1h1v1h-1v-1zm8 1h1v2h-1v-2zm3 0h1v1h-1v-1zm4 0h1v1h-1v-1zm-64 0h1v1h-1v-1zm10 0h1v1h-1v-1zm2 0h1v1h-1v-1zm40 1h1v1h-1v-1zm-19 0h1v1h-1v-1zm4 0h1v1h-1v-1zm3 0h1v1h-1v-1zm14 0h1v1h-1v-1zm8 0h1v1h-1v-1zM2 37h1v1H2v-1zm31 0h1v1h-1v-1zm2 0h1v1h-1v-1zm4 0h1v1h-1v-1zm25 0h1v1h-1v-1zm7 0h1v1h-1v-1zM5 37h1v1H5v-1zm6 0h1v1h-1v-1zm4 2h1v2h-1v-2zm30-1h1v1h-1v-1zm6 0h2v1h-2v-1zm12 0h1v1h-1v-1zm4 0h1v1h-1v-1zm5 0h1v1h-1v-1zm4 0h1v1h-1v-1zM7 38h1v1H7v-1zm6 1h1v1h-1v-1zm5 0h1v1h-1v-1zm4 0h1v1h-1v-1zm4 0h1v1h-1v-1zm5 0h1v1h-1v-1zm1 0h1v1h-1v-1zm18 1h1v2h-1v-2zm8-1h2v1h-2v-1zm-30 1h1v1h-1v-1zm10 0h1v1h-1v-1zm1 0h1v1h-1v-1zm3 0h1v1h-1v-1zm12 0h1v1h-1v-1zm2 0h1v1h-1v-1zm12 1h1v1h-1v-1zm-58 0h1v1h-1v-1zm15 0h1v1h-1v-1zm7 0h1v1h-1v-1zm2 0h1v1h-1v-1zm4 0h1v1h-1v-1zm15 0h1v1h-1v-1zm2 0h1v1h-1v-1zM2 42h1v1H2v-1zm11 0h1v1h-1v-1zm7 1h1v2h-1v-2zm2-1h1v1h-1v-1zm8 0h1v1h-1v-1zm3 0h1v1h-1v-1zm14 0h1v1h-1v-1zm9 0h1v1h-1v-1zm10 0h1v1h-1v-1zm5 1h1v1h-1v-1zm3 0h1v1h-1v-1zM4 43h1v1H4v-1zm19 0h1v1h-1v-1zm11 0h1v1h-1v-1zm4 0h1v1h-1v-1zm2 0h1v1h-1v-1zm18 1h1v1h-1v-1zm2 0h2v1h-2v-1zm7 0h1v1h-1v-1zm6 0h1v1h-1v-1zM8 44h1v1H8v-1zm4 0h3v1h-3v-1zm6 0h1v1h-1v-1zm10 1h1v1h-1v-1zm9 0h1v1h-1v-1zm10 0h1v2h-1v-2zm2 0h1v1h-1v-1zm6 0h1v1h-1v-1zm22 0h1v1h-1v-1zM1 45h1v1H1v-1z"
          fillRule="evenodd"
          clipRule="evenodd"
          fill="#404040"
        />
        <path
          d="M28 45h1v1h-1v-1zm29 0h1v1h-1v-1zm2 1h1v1h-1v-1zm-43 0h2v1h-2v-1zm4 0h1v1h-1v-1zm3 0h1v1h-1v-1zm11 0h1v1h-1v-1zm7 1h1v2h-1v-2zm1 0h2v2h-1v-1h-1v-1zm20-1h1v1h-1v-1zm5 1h1v1h-1v-1zm6 0h2v2h-1v-1h-1v-1zM4 47h1v1H4v-1zm22 0h1v1h-1v-1zm11 0h2v1h-2v-1zm11 0h1v1h-1v-1zm3 0h1v1h-1v-1zm12 1h1v1h-1v-1zm3 0h1v1h-1v-1zM6 48h1v1H6v-1zm3 0h2v1H9v-1zm10 0h1v1h-1v-1zm11 0h1v1h-1v-1zm1 1h1v1h-1v-1zm6 0h1v1h-1v-1zm14 0h1v2h-1v-2zm4 0h1v1h-1v-1zM3 49h1v1H3v-1zm5 0h1v1H8v-1zm5 0h1v1h-1v-1zm4 0h1v1h-1v-1zm4 0h1v1h-1v-1zm23 1h1v1h-1v-1zm10 0h1v1h-1v-1zm13 0h1v1h-1v-1zm3 0h1v1h-1v-1zm-60 0h1v1h-1v-1zm19 1h1v2h-1v-2zm9-1h1v1h-1v-1zm14 0h1v1h-1v-1zm17 1h1v1h-1v-1zm-49 1h1v2h-1v-2zm8-1h1v1h-1v-1zm6 0h1v1h-1v-1zm7 0h1v1h-1v-1zm7 0h1v1h-1v-1zm9 1h1v2h-1v-2zm6-1h1v1h-1v-1zM8 52h1v1H8v-1zm15 0h1v1h-1v-1zm17 0h1v1h-1v-1zm4 0h1v1h-1v-1zm16 0h1v1h-1v-1zm13 0h1v1h-1v-1zm4 1h1v1h-1v-1zM2 53h1v1H2v-1zm3 0h1v1H5v-1zm4 0h1v1H9v-1zm6 0h1v1h-1v-1zm16 0h1v1h-1v-1zm8 0h1v1h-1v-1zm8 0h1v1h-1v-1zm11 1h1v1h-1v-1zm16 0h1v1h-1v-1zM6 54h1v1H6v-1zm10 0h1v1h-1v-1zm21 0h1v1h-1v-1zm8 0h1v1h-1v-1zm20 0h1v1h-1v-1zM8 55h1v1H8v-1zm3 2h1v1h-1v-1zm1-2h1v1h-1v-1zm9 0h1v1h-1v-1zm8 0h1v1h-1v-1zm3 0h1v2h-1v-2zm2 0h1v1h-1v-1zm20 0h1v2h-1v-2zM4 55h1v1H4v-1zm11 0h1v1h-1v-1zm29 0h1v1h-1v-1zm31 1h1v2h-1v-2zM3 56h1v1H3v-1zm-1 2h1v1H2v-1zm3-2h1v1H5v-1zm2 2h1v1H7v-1zm0-2h1v1H7v-1zm12 0h1v1h-1v-1zm2 0h1v1h-1v-1zm6 0h1v1h-1v-1zm3 1h1v1h-1v-1zm9 0h2v1h-2v-1zm4 0h1v1h-1v-1zm8 0h1v1h-1v-1zm3 0h1v1h-1v-1zm19 0h1v1h-1v-1zm-57 1h1v1h-1v-1zm6 0h1v1h-1v-1zm26 0h1v1h-1v-1zm15 0h1v1h-1v-1zm2 0h1v1h-1v-1zm-48 0h1v1h-1v-1zm17 0h1v1h-1v-1zm10 0h1v1h-1v-1zm6 1h1v1h-1v-1zm7 0h1v1h-1v-1zm2 0h1v1h-1v-1zm3 0h1v1h-1v-1zm5 0h1v1h-1v-1zm8 0h1v1h-1v-1z"
          fillRule="evenodd"
          clipRule="evenodd"
          fill="#404040"
        />
      </pattern>
    </defs>
    <g
      id="spot-messages-6_svg__spot-messages-6__Group"
      clipPath="url(#spot-messages-6_svg__spot-messages-6__svgClip)"
    >
      <path
        id="spot-messages-6_svg__spot-messages-6__Vector"
        fill="#F5CB9D"
        d="M26.971 56.603l97.756-14.637 9.148 66.374H16.125l10.846-51.737z"
      />
      <g
        id="spot-messages-6_svg__spot-messages-6__Union"
        filter="url(#spot-messages-6_svg__spot-messages-6__filter0_i)"
      >
        <path
          fill="url(#spot-messages-6_svg__spot-messages-6__paint0_linear)"
          d="M111.225 94.66a23.388 23.388 0 01-4.448 2.005c-12.208 4.042-25.382-2.58-29.423-14.788-4.041-12.208 2.58-25.381 14.788-29.423 12.209-4.04 25.382 2.58 29.423 14.788 3.024 9.133.08 18.806-6.706 24.792 1.899 4.582 5.689 9.61 8.165 11.215 0 0-6.693-2.214-11.799-8.59z"
        />
      </g>
      <g
        id="spot-messages-6_svg__spot-messages-6__Union_2"
        filter="url(#spot-messages-6_svg__spot-messages-6__filter1_i)"
      >
        <path
          fill="url(#spot-messages-6_svg__spot-messages-6__paint1_linear)"
          d="M43.704 75.886a31.108 31.108 0 005.918 2.67c16.246 5.377 33.775-3.433 39.153-19.678 5.378-16.246-3.432-33.775-19.678-39.153-16.245-5.378-33.775 3.432-39.153 19.678-4.023 12.153-.106 25.024 8.923 32.989-2.526 6.097-7.57 12.788-10.865 14.924 0 0 8.907-2.947 15.702-11.43z"
        />
      </g>
      <path
        id="spot-messages-6_svg__spot-messages-6__Vector_2"
        fill="#fff"
        d="M93.088 74.425c-.165 1.422-1.43 2.443-2.825 2.281-1.396-.161-2.394-1.445-2.23-2.866.165-1.422 1.43-2.443 2.826-2.282 1.395.162 2.393 1.445 2.229 2.867zm9.198.022a2.592 2.592 0 11-5.15-.598 2.592 2.592 0 015.15.598zm9.447.335c-.165 1.422-1.43 2.443-2.825 2.281-1.396-.161-2.394-1.445-2.23-2.866.165-1.422 1.43-2.443 2.826-2.282 1.395.162 2.393 1.445 2.229 2.867z"
      />
      <path
        id="spot-messages-6_svg__spot-messages-6__Union_3"
        fill="#fff"
        d="M67.84 48.962c.22 1.892 1.902 3.251 3.76 3.036 1.857-.215 3.185-1.923 2.966-3.814-.22-1.892-1.903-3.251-3.76-3.036-1.857.215-3.185 1.923-2.966 3.814zm-12.24.029a3.448 3.448 0 106.85-.793 3.448 3.448 0 00-6.85.793zm-8.811 3.483c-1.857.215-3.54-1.144-3.76-3.036-.219-1.892 1.11-3.6 2.967-3.815 1.857-.215 3.54 1.144 3.76 3.036.218 1.892-1.11 3.6-2.967 3.815z"
      />
      <path
        fill="url(#spot-messages-6_svg__spot-messages-6__texture)"
        d="M90.287 47.122c-.8-12.218-8.85-23.312-21.19-27.397-16.245-5.378-33.775 3.432-39.153 19.678a30.84 30.84 0 00-.743 16.866l-2.23.333-10.846 51.738h117.75l-9.148-66.374-34.44 5.156z"
        opacity={0.45}
        style={{
          mixBlendMode: 'overlay',
        }}
      />
    </g>
  </svg>
);

export default MessageSVG;
