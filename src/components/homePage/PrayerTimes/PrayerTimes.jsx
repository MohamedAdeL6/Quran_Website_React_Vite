import React, { useState, useEffect, useMemo, useCallback } from "react";

import moment from "moment-hijri";

import { useDispatch, useSelector } from "react-redux";

import { fetchPrayerTimes } from "../../../appStore/slices/PrayerTimesData";

import { ImSpinner6 } from "react-icons/im";

import prayerTimeLogo from "./PrayerTimesImages/headerLogo/logo.png";

import PrayerTimesLocation from "./PrayerTimesComponent/PrayerTimesLocation";
import PrayerTimesHeader from "./PrayerTimesComponent/PrayerTimesHeader";
import PrayerTimesTable from "./PrayerTimesComponent/PrayerTimesTable";

const PrayerTimes = () => {

  const { data: timings, loading, error, } = useSelector((state) => state.prayerTimes);

  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const dispatch = useDispatch();

  const [remainingHour, setRemainingHour] = useState("");
  const [remainingMinute, setRemainingMinute] = useState("");
  const [remainingSecond, setRemainingSecond] = useState("");
  const [remaining, setRemaining] = useState("");

  // --------------------------------------------------------------------------
  // Hijri Date
  const hijriDate = useMemo(() => moment().format("iDD iMMM iYYYY هـ"), []);

  // --------------------------------------------------------------------------
  // Gregorian Date
  const gregorianDate = useMemo(() => {
    const today = new Date();
    return `${today.getDate()} ${today.toLocaleString("ar", {
      month: "short",
    })} ${today.getFullYear()} م`;
  }, []);

  // --------------------------------------------------------------------------
  // Real-Time Clock
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    dispatch(fetchPrayerTimes()); // Fetch prayer times on mount

    // Update time every second
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [dispatch]);

  // ---------------------------------------------------------------------------
  // Memoized getNextPrayerTime
  const getNextPrayerTime = useCallback(() => {
    if (!timings || !timings.timings) return { name: "Fajr", time: new Date() };

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    for (const [name, time] of Object.entries(timings.timings)) {
      const [hour, minute] = time.split(":").map(Number);
      const prayerMinutes = hour * 60 + minute;

      if (prayerMinutes > currentMinutes) {
        return { name, time: new Date(now.setHours(hour, minute, 0, 0)) };
      }
    }

    // If all prayers have passed, return Fajr of the next day
    const [hour, minute] = timings.timings.Fajr.split(":").map(Number);
    return {
      name: "Fajr",
      time: new Date(
        now.setDate(now.getDate() + 1),
        now.setHours(hour, minute, 0, 0)
      ),
    };
  }, [timings]);
  // -------------------------
  // Declare state AFTER the function is defined
  const [nextPrayer, setNextPrayer] = useState(() => getNextPrayerTime());

  // ---------------------------------------------------------------------------
  useEffect(() => {
    const updateRemainingTime = () => {
      const now = new Date();
      const diff = new Date(nextPrayer.time) - now;

      if (diff <= 0) {
        // Stop the timer — let a separate useEffect handle updating nextPrayer
        setRemainingHour('0 ساعة');
        setRemainingMinute('0 دقيقة');
        setRemainingSecond('0 ثانية');
        setRemaining('0h 0m 0s');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setRemainingHour(`${hours} ساعة`);
      setRemainingMinute(`${minutes} دقيقة`);
      setRemainingSecond(`${seconds} ثانية`);
      setRemaining(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateRemainingTime(); // Run once immediately

    const interval = setInterval(updateRemainingTime, 1000); // Update every second

    return () => clearInterval(interval);               // Cleanup on unmount or nextPrayer.time change
  }, [nextPrayer.time]);


  // --------------------------------------------------------------------------
  useEffect(() => {
    if (
      remainingHour === '0 ساعة' &&
      remainingMinute === '0 دقيقة' &&
      remainingSecond === '0 ثانية'
    ) {
      // Recalculate the next prayer after countdown hits 0
      setNextPrayer(getNextPrayerTime());
    }
  }, [remainingHour, remainingMinute, remainingSecond, getNextPrayerTime]);




  // ---------------------------------------------------------------------------
  // Function change Name Of Prayer From English To Arabic
  const getPrayerName = (prayer) => {
    switch (prayer) {
      case "Fajr":
        return "الفجر";
      case "Dhuhr":
        return "الظهر";
      case "Asr":
        return "العصر";
      case "Maghrib":
        return "المغرب";
      case "Isha":
        return "العشاء";
      case "Midnight":
        return "منتصف الليل";
      case "Firstthird":
        return "الثلث الأول";
      case "Lastthird":
        return "الثلث الأخير";
      case "Sunrise":
        return "الشروق";
      case "Sunset":
        return "الغروب";
      case "Imsak":
        return "الامساك";
      default:
        return prayer; // Keep the original English name if no match
    }
  };

  return (
    <div className={`w-full flex justify-center items-center py-3 ${darkMode ? "bg-[#000]" : "bg-[#fff]"}`}>

      <div className="container">

        <div className={`flex flex-wrap justify-center items-center gap-9`} dir="rtl">

          {/* header */}
          <PrayerTimesHeader
            darkMode={darkMode}
            prayerTimeLogo={prayerTimeLogo}
          />

          {/* Location,Time  &&  Prayer Countdown */}
          <PrayerTimesLocation
            darkMode={darkMode}
            time={time}
            hijriDate={hijriDate}
            gregorianDate={gregorianDate}
            remaining={remaining}
            remainingSecond={remainingSecond}
            remainingMinute={remainingMinute}
            remainingHour={remainingHour}
            getPrayerName={getPrayerName(nextPrayer.name)}
          />

          {/* Prayer Times Table */}
          <PrayerTimesTable
            loading={loading}
            timings={timings}
            darkMode={darkMode}
            getPrayerName={getPrayerName}  //  
            error={error}
            Icon={ImSpinner6}
          />

        </div>

      </div>

    </div>
  );
};

export default PrayerTimes;

