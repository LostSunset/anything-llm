import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import Admin from '@/models/admin';

export default function ShowScrollbar() {
  const [saving, setSaving] = useState(false);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const { t } = useTranslation();

  const handleChange = async (e) => {
    const newValue = e.target.checked;
    setShowScrollbar(newValue);
    setSaving(true);
    try {
      await Admin.updateSystemPreferences({
        show_scrollbar: newValue,
      });
    } catch (error) {
      console.error("Failed to update system preferences:", error);
      setShowScrollbar(!newValue);
    }
    setSaving(false);
  };

  useEffect(() => {
    async function fetchSettings() {
      const settings = (await Admin.systemPreferences())?.settings;
      if (!settings) return;
      setShowScrollbar(settings.show_scrollbar || false);
    }
    fetchSettings();
  }, []);

  return (
    <div className="flex flex-col w-full gap-y-4 mt-6">
      <div className="flex flex-col gap-y-1">
        <h2 className="text-base leading-6 font-bold text-white">
          Show Scrollbar
        </h2>
        <p className="text-xs leading-[18px] font-base text-white/60">
          Enable or disable the scrollbar in the chat window
        </p>
        <div className="mt-2">
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              id="show_scrollbar"
              type="checkbox"
              name="show_scrollbar"
              value="yes"
              checked={showScrollbar}
              onChange={handleChange}
              disabled={saving}
              className="peer sr-only"
            />
            <div className="pointer-events-none peer h-6 w-11 rounded-full bg-stone-400 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:shadow-xl after:border after:border-gray-600 after:bg-white after:box-shadow-md after:transition-all after:content-[''] peer-checked:bg-lime-300 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800"></div>
          </label>
        </div>
      </div>
    </div>
  );
}