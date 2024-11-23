import React from "react";

const MySVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
    <rect width="800" height="600" overflow-y="hidden" fill="#f8fafc" />

    <g transform="translate(50, 30)">
      <path
        d="M10 10 C20 5, 150 5, 160 10 C170 15, 170 45, 160 50 C150 55, 20 55, 10 50 C0 45, 0 15, 10 10"
        fill="#2563eb"
        opacity="0.1"
      />

      <text
        x="20"
        y="40"
        font-family="Arial"
        font-size="25"
        font-weight="bold"
        fill="#2563eb"
      >
        MeowChat
      </text>
    </g>

    <g transform="translate(100, 100)">
      <rect
        x="0"
        y="0"
        width="300"
        height="380"
        rx="15"
        fill="white"
        stroke="#e2e8f0"
        stroke-width="2"
      />

      <rect x="0" y="0" width="300" height="60" rx="15" fill="#2563eb" />
      <circle cx="40" cy="30" r="15" fill="white" />
      <rect x="70" y="20" width="120" height="10" rx="5" fill="white" />
      <rect
        x="70"
        y="35"
        width="80"
        height="10"
        rx="5"
        fill="white"
        opacity="0.7"
      />

      <g transform="translate(20, 80)">
        <rect x="0" y="0" width="180" height="45" rx="22" fill="#93c5fd" />
        <rect x="0" y="60" width="200" height="45" rx="22" fill="#93c5fd" />
        <rect x="80" y="120" width="180" height="45" rx="22" fill="#bfdbfe" />
        <rect x="100" y="180" width="160" height="45" rx="22" fill="#bfdbfe" />
        <rect x="0" y="240" width="100" height="40" rx="20" fill="#dbeafe" />
        <circle cx="30" cy="260" r="4" fill="#2563eb" />
        <circle cx="50" cy="260" r="4" fill="#2563eb" />
        <circle cx="70" cy="260" r="4" fill="#2563eb" />
      </g>
    </g>

    <g transform="translate(500, 150)">
      <rect
        x="0"
        y="0"
        width="250"
        height="300"
        rx="15"
        fill="white"
        stroke="#e2e8f0"
        stroke-width="2"
      />
      <rect x="20" y="20" width="140" height="40" rx="20" fill="#93c5fd" />
      <rect x="70" y="80" width="140" height="40" rx="20" fill="#bfdbfe" />
      <rect x="20" y="140" width="160" height="40" rx="20" fill="#93c5fd" />

      <g>
        <circle cx="50" cy="250" r="30" fill="#bfdbfe" />
        <path
          d="M30 245 C60 245, 70 275, 50 285 C35 295, 15 290, 10 275 C5 265, 10 255, 20 250 C30 245, 35 250, 30 245"
          fill="#fbbf24"
        />
      </g>

      <g>
        <circle cx="200" cy="220" r="40" fill="#93c5fd" />
        <path
          d="M180 215 C210 215, 220 245, 200 255 C185 265, 165 260, 160 245 C155 235, 160 225, 170 220 C180 215, 185 220, 180 215"
          fill="#fbbf24"
        />
      </g>
    </g>

    <g>
      <circle cx="700" cy="100" r="25" fill="#dbeafe" />
      <path
        d="M685 95 C705 95, 710 115, 700 120 C690 125, 680 120, 675 110 C670 105, 675 100, 680 95"
        fill="#fbbf24"
      />
    </g>

    <g>
      <circle cx="150" cy="520" r="35" fill="#93c5fd" />
      <path
        d="M130 515 C160 515, 170 545, 150 555 C135 565, 115 560, 110 545 C105 535, 110 525, 120 520"
        fill="#fbbf24"
      />
    </g>

    <g>
      <circle cx="650" cy="480" r="30" fill="#bfdbfe" />
      <path
        d="M630 475 C660 475, 670 505, 650 515 C635 525, 615 520, 610 505 C605 495, 610 485, 620 480"
        fill="#fbbf24"
      />
    </g>
  </svg>
);

export default MySVG;
