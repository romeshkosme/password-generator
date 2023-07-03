"use client";
import usePasswordGenerator from "@/hooks/use-password-generator";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const {password, error, strength, percentage, generatePassword} = usePasswordGenerator();
  const [length, setLength] = useState<number>(16);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [number, setNumber] = useState<boolean>(false);
  const [specialCharacter, setSpecialCharacter] = useState<boolean>(false);
  
  const handleCopy = () => {
    if (!password) {
      toast.error('No password!')
      return;
    }
    navigator.clipboard.writeText(password)
      .then(() => toast.success('Copied to clipboard!'));
  }

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="card bg-gray-300 w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 rounded-md">
          <div className="form flex flex-col gap-5 p-8">
            <h1 className="text-slate-900">Password Generator</h1>
            <input type="text" className="rounded-md text-black h-10 focus:outline-none px-2" value={password} readOnly />
            <div className="password-strength text-right">
              <span className="text-green-600">{strength}</span>
              <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-600">
                <div className="h-1 bg-green-500" style={{"width": `${percentage}%`}}></div>
              </div>
            </div>
            <div className="">
              <span className="float-right text-gray-700">{length}</span>
              <input className="w-full focus:outline-none" type="range" min="8" max="40" name="password-range" id="password-range" value={length} onChange={(e: any) => setLength(e.target.value)} />
            </div>
            <div className="flex flex-col md:flex-row justify-around">
              <div className="flex items-center">
                <input type="checkbox" className="me-2" name="uppercase" id="uppercase" onChange={(e: any) => setUppercase(e.target.checked)} />
                <label htmlFor="uppercase" className="text-gray-700">Uppercase letter</label>
              </div>
              <div>
                <input type="checkbox" className="me-2" name="number" id="number" onChange={(e: any) => setNumber(e.target.checked)} />
                <label htmlFor="number" className="text-gray-700">Numbers</label>
              </div>
              <div>
                <input type="checkbox" className="me-2" name="specialcharacters" id="specialcharacters" onChange={(e: any) => setSpecialCharacter(e.target.checked)} />
                <label htmlFor="specialcharacters" className="text-gray-700">Symbols</label>
              </div>
            </div>
            <div className="btn-group text-center">
              <button className="p-2 bg-green-500 rounded-md" onClick={() => generatePassword(length, uppercase, number, specialCharacter)}>Generate</button>
              <button className="p-2 bg-green-500 rounded-md ms-2" onClick={handleCopy}>Copy</button>
            </div>
          </div>
        </div>
      </div>
      <Toaster
        position="top-center"
      />
    </>
  )
}
