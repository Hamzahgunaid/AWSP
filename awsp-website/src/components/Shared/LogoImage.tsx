interface LogoImageProps {
  src: string;
  alt: string;
  variant?: 'header' | 'partner' | 'footer';
}

const sizeMap = {
  header:  { width: 160, height: 48 },
  partner: { width: 120, height: 120 },
  footer:  { width: 140, height: 42 },
};

export default function LogoImage({
  src,
  alt,
  variant = 'partner',
}: LogoImageProps) {
  const { width, height } = sizeMap[variant];
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        objectFit: 'contain',
        objectPosition: 'center',
      }}
    />
  );
}
