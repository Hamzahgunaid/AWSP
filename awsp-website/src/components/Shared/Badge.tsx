type ColorScheme =
  'navy' | 'teal' | 'gold' | 'grey' |
  'green' | 'red' | 'blue';

interface BadgeProps {
  label: string;
  colorScheme?: ColorScheme;
  className?: string;
}

const colorMap: Record<ColorScheme, {
  bg: string;
  color: string;
}> = {
  navy:  { bg: '#1A3557', color: 'white' },
  teal:  { bg: '#0D7A6E', color: 'white' },
  gold:  { bg: '#C8922A', color: 'white' },
  grey:  { bg: '#E5E7EB', color: '#374151' },
  green: { bg: '#059669', color: 'white' },
  red:   { bg: '#DC2626', color: 'white' },
  blue:  { bg: '#2563EB', color: 'white' },
};

export default function Badge({
  label,
  colorScheme = 'navy',
  className = '',
}: BadgeProps) {
  const colors = colorMap[colorScheme];
  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        padding: '2px 10px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: '600',
        backgroundColor: colors.bg,
        color: colors.color,
      }}
    >
      {label}
    </span>
  );
}
