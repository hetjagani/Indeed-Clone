import * as React from 'react';

const UserIconSVG = (props) => (
  <svg
    width={24}
    height={24}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <defs>
      <rect id="a" x={0} y={0} width={24} height={24} rx={12} />
    </defs>
    <g fill="none" fillRule="evenodd">
      <rect fill="#CECECE" fillRule="nonzero" width={24} height={24} rx={12} />
      <mask id="b" fill="#fff">
        <use xlinkHref="#a" />
      </mask>
      <path
        d="M16.839 11.736c-.002 2.783-2.192 5.113-4.848 5.103-2.716-.01-4.912-2.346-4.88-5.23C7.14 9.057 9.282 7.006 11.98 7c2.7-.006 4.906 2.066 4.86 4.736zm2.493 9.765c-.028-.319-.04-.636-.086-.947-.221-1.548-1.623-2.857-3.18-2.887-2.05-.041-4.103-.023-6.155-.026-.677 0-1.354-.008-2.03.022-1.528.067-2.958 1.4-3.152 2.928-.04.313-.044.63-.063.947v1.435a11.236 11.236 0 007.283 2.694 11.19 11.19 0 007.384-2.725v-1.44h-.001z"
        fill="#FFF"
        fillRule="nonzero"
        mask="url(#b)"
      />
    </g>
  </svg>
);

export default UserIconSVG;
