import { FC, useState } from "react";

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number[];
  onValueCommit?: (value: number[]) => void;
  onValueChange?: (value: number[]) => void;
}

export const Slider: FC<SliderProps> = ({
  min = 0,
  max = 1,
  step = 0.01,
  defaultValue = [0.7],
  onValueCommit,
  onValueChange,
}) => {
  const initial = defaultValue[0] ?? 0.7;
  const [value, setValue] = useState(initial);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    setValue(newValue);
    if (onValueChange) {
      onValueChange([newValue]);
    }
  };

  const handleMouseUp = () => {
    if (onValueCommit) {
      onValueCommit([value]);
    }
  };

  return (
    <div className="w-full flex items-center gap-2">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleMouseUp}
        className="w-full h-1 rounded-full bg-[#232328] accent-[#6370E9]"
      />
    </div>
  );
};

