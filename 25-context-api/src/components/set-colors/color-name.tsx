import { colornames } from "color-name-list";

type ColorNameProps = {
  hexColor: string;
};

const ColorName = ({ hexColor }: ColorNameProps) => {
  const color = colornames.find((color) => {
    return color.hex === hexColor.toLowerCase();
  });

  // If color is not found, return null
  if (!color) return null;

  // If color is found, display the color name with the color hex value
  return (
    <p className="info">
      Color Name: <span style={{ color: color.hex }}>{color.name}</span>
    </p>
  );
};

export default ColorName;
