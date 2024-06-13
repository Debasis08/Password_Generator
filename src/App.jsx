import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //use ref hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,9)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className='w-full sm:w-3/5 mt-52 mx-auto shadow-md rounded-lg px-4 py-3 div1'>
        <h1 className='text-3xl font-mono heading text-center mb-10 mt-7'>Password Generator</h1>
        <div className='flex h-16 items-center justify-center shadow overflow-hidden mb-7'>
          <input
          type="text"
          value={password}
          className='outline-none w-96 h-14 py-1 px-3 rounded-l-lg'
          placeholder='password'
          readOnly
          ref={passwordRef} />

          <button
          onClick={copyPasswordToClipboard}
          className='rounded-r-lg outline-none h-14 px-3 py-0.5 shrink-0'
          >Copy</button>

        </div>

        <div className='flex flex-col md:justify-center lg:flex-row text-lg gap-x-5 pb-5 ml-5'>

          <div className='flex items-center gap-x-7'>
            <input
            type="range"
            min = {6}
            max = {100}
            value={length}
            className='cursor-pointer range'
            onChange={(e) => {setLength(e.target.value)}} />

            <label>Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked = {numberAllowed}
            id='numberInput'
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }} />
            <label htmlFor="numberInput">Numbers</label>
          </div>


          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked = {charAllowed}
            id='characterInput'
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }} />
            <label htmlFor="characterInput">Characters</label>
          </div>


        </div>

      </div>
    </>
  )
}

export default App
