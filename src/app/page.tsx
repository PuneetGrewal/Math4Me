"use client";

import React, { useRef, useState, useEffect } from 'react';
import { supabase } from "@/supabaseClient";
import { Button } from "@/components/ui/button";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneIcon } from "@heroicons/react/24/outline";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

const locations = ["Royal Oak", "OakBay", "Langford"];

export default function EnrollmentForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [dob, setDob] = useState<Date | null>(null); // State for date of birth
  const [phoneNumber, setPhoneNumber] = useState("");
  const [subjectOpen, setSubjectOpen] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const subjects = ["Math", "Chemistry", "Biology", "Science", "Physics"];

  let hoverTimeout: NodeJS.Timeout;

  const handleSubjectSelect = (subject: string) => {
    setSelectedSubjects((prev) => {
      if (prev.includes(subject)) {
        return prev.filter((item) => item !== subject);
      }
      return [...prev, subject];
    });
  };

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
    const formattedDob = dob.toISOString().split("T")[0];

    const enrollmentData = { name, email, locations: selectedLocations, dob: formattedDob, subjects: selectedSubjects, phoneNumber };

    const { error } = await supabase.from("enrollments").insert([enrollmentData]);
    if (error) {
      console.error("Error saving data:", error);
    } else {
      setSuccessMessage("Enrollment successful!");
      setName("");
      setEmail("");
      setPhoneNumber("");
      setSelectedLocations([]);
      setDob(null);
      setSelectedSubjects([]);

    }
  };

  return (
    <div className="p-8 bg-white text-black-500 font-bold min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md">
        <h1 className="text-3xl mb-4 text-center">
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
              className="w-full p-2 mt-1 rounded border border-black bg-white text-black transform hover:scale-105 hover:bg-red-500 hover:text-yellow-500 transition-all duration-300 font-extrabold text-lg"
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
              className="w-full p-2 mt-1 border border-black rounded bg-white text-black transform hover:scale-105 hover:bg-red-500 hover:text-yellow-500 transition-all duration-300 font-extrabold text-lg"
              placeholder="Enter email address"
            />
          </div>

          {/* Location Selection */}
          <div
            className="flex flex-col relative mb-4"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <label className="block text-lg text-left text-black-500">
              Select TEST Location:
            </label>

            {/* Dropdown Trigger */}
            <button
              type="button"
              className="w-full p-2 mt-1 rounded border-black bg-white text-black transform hover:scale-105 hover:bg-red-500 hover:text-yellow-500 transition-all duration-300 flex justify-between items-center border"
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

                {/* Date of Birth input */}
              <div className="flex flex-col">
                <h2 className="text-xl font-bold text-black-500 mb-2">Child's Date of Birth</h2> {/* Title */}
                <div className="relative">
                <DatePicker
                  selected={dob}
                  onChange={(date: Date) => setDob(date)}
                  className="w-full p-2 mt-1 rounded bg-white text-black transform hover:scale-105 hover:bg-red-500 hover:text-yellow-500 transition-all duration-300 pl-10"
                  dateFormat="MM/dd/yyyy" // Format the date
                  maxDate={new Date()} // Don't allow selecting future dates
                  placeholderText="Select Date of Birth"
                  showYearDropdown // Enable dropdown for years
                  showMonthDropdown
                  scrollableYearDropdown // Makes the year dropdown scrollable for convenience
                  yearDropdownItemNumber={30} // Display the past 100 years in the dropdown                
                />
                <CalendarIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                  </div>
              </div>


                            {/* Subject Selection */}
                  <div className="flex flex-col relative mb-4">
                    <label className="block text-lg text-left text-black-500">
                      Select Subjects:
                    </label>

                    {/* Dropdown Trigger */}
                    <button
                      type="button"
                      onClick={() => setSubjectOpen(!subjectOpen)}
                      className="w-full p-2 mt-1 rounded bg-white text-black transform hover:scale-105 hover:bg-red-500 hover:text-yellow-500 transition-all duration-300 flex justify-between items-center border"
                    >
                      <span>
                        {selectedSubjects.length > 0
                          ? selectedSubjects.join(", ")
                          : "Select Subjects"}
                      </span>
                      <ChevronDownIcon className="h-4 w-4" />
                    </button>

                    {/* Dropdown List */}
                    {subjectOpen && (
                      <div className="absolute w-full mt-2 rounded bg-red-500 text-yellow-500 shadow z-10 border">
                        <div className="max-h-40 overflow-y-auto">
                          {subjects.map((subject) => (
                            <label key={subject} className="flex items-center px-4 py-2">
                              <input
                                type="checkbox"
                                checked={selectedSubjects.includes(subject)}
                                onChange={() => handleSubjectSelect(subject)}
                                className="mr-2"
                              />
                              <span>{subject}</span>
                            </label>
                          ))}
                        </div>

                        {/* Done Button */}
                        <button
                          type="button"
                          onClick={() => setSubjectOpen(false)}
                          className="w-full bg-white text-black px-4 py-2 text-center rounded hover:bg-red-500 hover:text-yellow-500 transform hover:scale-105 transition-all duration-300"
                        >
                          Done TEST
                        </button>
                      </div>
                    )}
                  </div>


                              {/* Phone Number input */}
              <div className="flex flex-col">
                <Label htmlFor="phoneNumber" className="text-left text-black-500">
                  Phone Number (Canada)
                </Label>
                <SegmentedPhoneInput onChange={setPhoneNumber} />
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

const SegmentedPhoneInput = ({ onChange }: { onChange: (value: string) => void }) => {
  const [values, setValues] = useState(['', '', '']);
  const [isHovering, setIsHovering] = useState(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  useEffect(() => {
    const fullNumber = values.join('').length === 10 ? values.join('-') : '';
    onChange(fullNumber);
  }, [values, onChange]);

  const handleChange = (index: number, value: string) => {
    value = value.replace(/\D/g, '');
    const maxLength = index === 2 ? 4 : 3;
    
    const newValues = [...values];
    newValues[index] = value.slice(0, maxLength);
    setValues(newValues);

    if (value.length >= maxLength && index < 2) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !values[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').replace(/\D/g, '');
    if (paste.length > 0) {
      const newValues = [
        paste.slice(0, 3),
        paste.slice(3, 6),
        paste.slice(6, 10)
      ];
      setValues(newValues);
    }
  };

  const isComplete = values.join('').length === 10;
  const shouldBeRed = !isComplete && values.some(v => v.length > 0) || (!isComplete && isHovering);

  const inputClassName = `w-16 h-12 text-center text-lg border rounded-lg 
    transform hover:scale-105 transition-all duration-300
    ${shouldBeRed ? 'bg-red-500 text-yellow-500' : 'bg-white text-black'}`;

  const lastInputClassName = `w-20 h-12 text-center text-lg border rounded-lg 
    transform hover:scale-105 transition-all duration-300
    ${shouldBeRed ? 'bg-red-500 text-yellow-500' : 'bg-white text-black'}`;

  return (
    <div 
      className="flex flex-col mt-4"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex items-center gap-2">
        <input
          ref={inputRefs[0]}
          type="text"
          value={values[0]}
          onChange={(e) => handleChange(0, e.target.value)}
          onKeyDown={(e) => handleKeyDown(0, e)}
          onPaste={handlePaste}
          maxLength={3}
          className={inputClassName}
          placeholder="123"
        />
        <span className="text-lg text-gray-500">-</span>
        <input
          ref={inputRefs[1]}
          type="text"
          value={values[1]}
          onChange={(e) => handleChange(1, e.target.value)}
          onKeyDown={(e) => handleKeyDown(1, e)}
          onPaste={handlePaste}
          maxLength={3}
          className={inputClassName}
          placeholder="456"
        />
        <span className="text-lg text-gray-500">-</span>
        <input
          ref={inputRefs[2]}
          type="text"
          value={values[2]}
          onChange={(e) => handleChange(2, e.target.value)}
          onKeyDown={(e) => handleKeyDown(2, e)}
          onPaste={handlePaste}
          maxLength={4}
          className={lastInputClassName}
          placeholder="7890"
        />
      </div>
    </div>
  );
};