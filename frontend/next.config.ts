import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }]
  },
  async redirects() {
    return [
    {
        "source": "/safaris/4-day-victoria-falls-chobe-hwange",
        "destination": "/safaris/victoria-falls-chobe-safari",
        "permanent": true
    },
    {
        "source": "/safaris/5-day-victoria-falls-chobe-hwange",
        "destination": "/safaris/victoria-falls-chobe-safari",
        "permanent": true
    },
    {
        "source": "/safaris/6-day-hwange-victoria-falls-chobe",
        "destination": "/safaris/victoria-falls-chobe-safari",
        "permanent": true
    },
    {
        "source": "/safaris/7-day-victoria-falls-chobe-hwange-matobo",
        "destination": "/safaris/victoria-falls-chobe-safari",
        "permanent": true
    },
    {
        "source": "/safaris/8-day-victoria-falls-chobe-makgadikgadi-okavango",
        "destination": "/safaris/12-day-hwange-victoria-falls-chobe-okavango",
        "permanent": true
    },
    {
        "source": "/safaris/8-day-okavango-moremi-savuti-chobe-victoria-falls",
        "destination": "/safaris/12-day-hwange-victoria-falls-chobe-okavango",
        "permanent": true
    },
    {
        "source": "/safaris/8-day-chobe-elephant-sands-okavango-victoria-falls",
        "destination": "/safaris/12-day-hwange-victoria-falls-chobe-okavango",
        "permanent": true
    },
    {
        "source": "/safaris/15-day-zimbabwe-botswana",
        "destination": "/safaris/zimbabwe-highlights-journey",
        "permanent": true
    }
];
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  }
};

export default nextConfig;
