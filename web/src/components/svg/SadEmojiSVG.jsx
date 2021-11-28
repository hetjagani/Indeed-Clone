import * as React from 'react';

const SadEmojiSVG = (props) => (
  <svg
    width={80}
    height={65}
    viewBox="-4 3 80 65"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    style={{
      height: 48,
      width: 48,
      margin: '-8px',
      marginLeft: '1px',
    }}
    {...props}
  >
    <title>Below average</title>
    <g filter="url(#filter0_f)">
      <circle cx={40.6635} cy={33.7634} r={19.7634} fill="#462615" />
    </g>
    <circle cx={39.6635} cy={32.7634} r={19.7634} fill="#F5CB9D" />
    <ellipse
      cx={35.1084}
      cy={28.4316}
      rx={2.1877}
      ry={2.71385}
      fill="#462615"
    />
    <ellipse
      cx={45.8039}
      cy={28.4316}
      rx={2.1877}
      ry={2.71385}
      fill="#462615"
    />
    <path
      d="M33.3857 35.9482H47.8014V35.9482C47.8014 36.9755 46.9686 37.8083 45.9413 37.8083H35.2458C34.2185 37.8083 33.3857 36.9755 33.3857 35.9482V35.9482Z"
      fill="#462615"
    />
    <g filter="url(#filter1_f)">
      <path
        d="M5.92696 46.8185C5.92696 47.5306 5.99355 48.227 6.12084 48.902C5.96552 48.8863 5.80794 48.8783 5.64848 48.8783C3.08127 48.8783 1.00013 50.9628 1.00013 53.5341C1.00013 56.1055 3.08127 58.19 5.64848 58.19C5.74198 58.19 5.83483 58.1872 5.92696 58.1818V58.19H34.8024C38.115 58.19 40.8003 55.5003 40.8003 52.1824C40.8003 48.8646 38.115 46.1749 34.8024 46.1749C34.3118 46.1749 33.835 46.2339 33.3786 46.3452C32.3891 43.8707 29.9809 42.1188 27.1618 42.0985C25.3867 38.296 21.5334 35.6616 17.0659 35.6616C10.914 35.6616 5.92696 40.6567 5.92696 46.8185Z"
        fill="black"
        fillOpacity={0.5}
      />
    </g>
    <path
      d="M4.92696 47.8185C4.92696 48.5306 4.99355 49.227 5.12084 49.902C4.96552 49.8863 4.80794 49.8783 4.64848 49.8783C2.08127 49.8783 0.000133131 51.9628 0.000133131 54.5341C0.000133131 57.1055 2.08127 59.19 4.64848 59.19C4.74198 59.19 4.83483 59.1872 4.92696 59.1818V59.19H33.8024C37.115 59.19 39.8003 56.5003 39.8003 53.1824C39.8003 49.8646 37.115 47.1749 33.8024 47.1749C33.3118 47.1749 32.835 47.2339 32.3786 47.3452C31.3891 44.8707 28.9809 43.1188 26.1618 43.0985C24.3867 39.296 20.5334 36.6616 16.0659 36.6616C9.91401 36.6616 4.92696 41.6567 4.92696 47.8185Z"
      fill="#B6D7EE"
    />
    <defs>
      <filter
        x={19.9001}
        y={13}
        width={41.5268}
        height={41.5268}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur stdDeviation={0.5} result="effect1_foregroundBlur" />
      </filter>
      <filter
        x={0.000244141}
        y={34.6616}
        width={41.8002}
        height={24.5284}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feGaussianBlur stdDeviation={0.5} result="effect1_foregroundBlur" />
      </filter>
    </defs>
  </svg>
);

export default SadEmojiSVG;
