"use client";

import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { lazyload, placeholder } from "@cloudinary/react";

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: "dw21zy54j",
  },
});

interface CloudinaryImageProps {
  imagePath: string | undefined;
}

export default function Image({
  imagePath = "v1686385529/u-site/image-not-available.webp",
}: CloudinaryImageProps) {
  const img = cloudinary.image(imagePath);
  return <AdvancedImage cldImg={img} plugins={[lazyload(), placeholder()]} />;
}
