"use client";

import { useState } from "react";
import { supabase } from "@/supabaseClient";
import { Button } from "@/components/ui/button"
import { CheckIcon } from "@heroicons/react/24/outline";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";



export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("enrollments").insert([
      { name, email },
    ]);

    if (error) {
      console.error("Error saving data:", error);
    } else {
      setSuccessMessage("Enrollment successful!");
      setName("");
      setEmail("");
    }
  };

  return (
    <div className="p-8 bg-black text-green-500 font-bold min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md">  {/* This ensures that the form doesn’t stretch too wide on large screens */}
        <h1 className="text-3xl mb-4 text-center">Enrollment TEST Form</h1>
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

          {/* Submit button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              className="flex items-center gap-2 w-32 py-2 px-4 bg-white text-black rounded-lg transform hover:scale-110 hover:bg-red-500 hover:text-yellow-500 transition-all duration-300 text-center"
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
