// components/ThemeToggleButton.jsx
import React, { useState, useEffect } from "react";
import { WiSunrise, WiMoonset } from "react-icons/wi";
import { useToggle } from "../hooks/useToggle";
import { isDarkTheme, isServer } from "../utils";

// 기존 테마를 확인하고 localstorage에 저장된 테마가 있는지, 없다면 localstorage에 테마를 저장하는 함수
function getInitialTheme() {
  if (isServer()) return false;

  if (!localStorage.getItem("isDark")) return isDarkTheme();

  return localStorage.getItem("isDark") == "true";
}

function setTheme(isDark: boolean) {
  if (isServer()) return;
  localStorage.setItem("isDark", isDark ? "true" : "false");
}

export const ThemeButton = () => {
  const { toggle: isDark, setter: onClickHandler } = useToggle(
    getInitialTheme,
    setTheme
  );

  return (
    <button
      className="p-2 w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex justify-center items-center absolute top-8 right-8"
      onClick={onClickHandler}
    >
      {isDark ? (
        <WiSunrise size={40} color={"#FFA500"} />
      ) : (
        <WiMoonset size={40} color={"#FFA500"} />
      )}
    </button>
  );
};
