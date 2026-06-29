interface IconProps {
  name: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function Icon({ name, width = 16, height = 16, className }: IconProps) {
  return (
    <svg width={width} height={height} className={className}>
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
}