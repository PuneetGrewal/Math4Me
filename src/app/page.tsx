"use client";

import { useState } from "react";
import { supabase } from "@/supabaseClient";
import { Button } from "@/components/ui/button";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

const locations = ["Royal Oak", "OakBay", "Langford"];

export default function EnrollmentForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  let hoverTimeout: NodeJS.Timeout;

  const handleSelect = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((item) => item !== location)
        : [...prev, location]
    );
    setOpen(false);
  };

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => setOpen(true), 700);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => setOpen(false), 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedLocations.length === 0) {
      alert("Please select at least one location.");
      return;
    }

    const enrollmentData = { name, email, locations: selectedLocations };

    const { error } = await supabase.from("enrollments").insert([enrollmentData]);
    if (error) {
      console.error("Error saving data:", error);
    } else {
      setSuccessMessage("Enrollment successful!");
      setName("");
      setEmail("");
      setSelectedLocations([]);
    }
  };

  return (
    <div className="p-8 bg-black text-green-500 font-bold min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl mb-4 text-stroke text-center">
          ENROLLMENT FORM
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name input */}
          <div className="flex flex-col">
            <label htmlFor="name" className="block text-lg text-left">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mt-1 rounded bg-white text-black transform hover:scale-105 hover:bg-red-500 hover:text-yellow-500 transition-all duration-300 font-extrabold text-lg"
              placeholder="Enter full name"
            />
          </div>

          {/* Email input */}
          <div className="flex flex-col">
            <label htmlFor="email" className="block text-lg text-left">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-1 rounded bg-white text-black transform hover:scale-105 hover:bg-red-500 hover:text-yellow-500 transition-all duration-300"
              placeholder="Enter email address"
            />
          </div>

          {/* Location Selection */}
          <div
            className="flex flex-col relative mb-4"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <label className="block text-lg text-left text-green-500">
              Select TEST Location:
            </label>

            {/* Dropdown Trigger */}
            <button
              type="button"
              className="w-full p-2 mt-1 rounded bg-white text-black transform hover:scale-105 hover:bg-red-500 hover:text-yellow-500 transition-all duration-300 flex justify-between items-center border"
            >
              <span>
                {selectedLocations.length > 0
                  ? selectedLocations.join(", ")
                  : "Select Location"}
              </span>
              <ChevronDownIcon className="h-4 w-4" />
            </button>

            {/* Dropdown List */}
            {open && (
              <div className="absolute w-full mt-2 rounded bg-white shadow z-10 border">
                {locations.map((location) => (
                  <button
                    key={location}
                    type="button"
                    className="w-full px-4 py-2 text-left rounded bg-white text-black transform hover:scale-105 hover:bg-red-500 hover:text-yellow-500 transition-all duration-300 flex justify-between items-center"
                    onClick={() => handleSelect(location)}
                  >
                    <span>{location}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Submit button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              className="flex items-center gap-2 w-32 py-2 px-4 bg-white text-black rounded transform hover:scale-110 hover:bg-red-500 hover:text-yellow-500 transition-all duration-300 text-center"
            >
              <CheckIcon className="h-6 w-6" />
              Submit
            </Button>
          </div>
        </form>

        {successMessage && <p className="mt-4 text-white">{successMessage}</p>}
      </div>
    </div>
  );
}
