import { Switch } from "@headlessui/react";

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (value: boolean) => void;
}

export default function ToggleSwitch({ enabled, onChange }: ToggleSwitchProps) {
  return (
    <Switch
      checked={enabled}
      onChange={onChange}
      className={`${
        enabled ? "bg-[#3A3ADB]" : "bg-[#A0A2A8]"
      } relative inline-flex w-[6.875rem] h-[3.125rem] rounded-[1.5625rem] transition-colors`}
    >
      {/* 글라이더 */}
      <span
        className={`absolute top-[6.5px] left-[6.5px] w-[2.3125rem] h-[2.3125rem] bg-white rounded-full transition-transform
          ${enabled ? "translate-x-[3.5rem]" : "translate-x-0"}
        `}
      />
      {/* 텍스트 */}
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-[1.125rem] font-semibold">
        {enabled ? "ON" : ""}
      </span>
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-[1.125rem] font-semibold">
        {!enabled ? "OFF" : ""}
      </span>
    </Switch>
  );
}
