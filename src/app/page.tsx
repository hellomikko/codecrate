'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import LoginForm from '@/components/LoginForm'

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false)

  const codeSnippet = `export async function createCrate({ request }) {
  const form = await request.formData();
  const title = form.get("title");
  const code = form.get("code");

  return await db.crate.create({
    data: { title, code, authorId: request.user.id }
  });
}

export default function CrateEditor() {
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");

  return (
    <div className="crate-editor">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Crate Title"
      />
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Your code here..."
      />
      <button onClick={() => saveCrate({ title, code })}>
        Save Crate
      </button>
    </div>
  );
}`

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  const handleCloseLogin = () => {
    setShowLogin(false)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4">
      <header className="absolute top-4 left-4">
        <Image src="/ccColor.png" alt="CodeCrate Logo" width={40} height={40} />
      </header>
      <main className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-6xl w-full">
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            <span className="text-blue-400">Code</span> and <span className="text-green-400">collaborate</span> in real-time, <span className="text-yellow-400">build amazing projects</span>
          </h1>
          <p className="text-sm md:text-base text-gray-300 max-w-xl">
            CodeCrate is an online community for testing and showcasing HTML, CSS, and JavaScript code snippets. Create, share, and learn in our open-source learning environment.
          </p>
          <div className="flex gap-4">
            <Button variant="outline" size="sm" className="bg-white text-black hover:bg-gray-200 transition-colors text-xs">
              Explore Crates
            </Button>
            <Button 
              size="sm" 
              className="bg-blue-600 hover:bg-blue-700 text-white transition-colors text-xs"
              onClick={() => setShowLogin(true)}
            >
              Get Started
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg transform rotate-6"></div>
          <div className="relative bg-[#252525] p-3 text-xs rounded-lg max-w-full overflow-hidden">
            <pre className="text-xs">
              <code className="language-javascript">{codeSnippet}</code>
            </pre>
          </div>
        </div>
      </main>
      {showLogin && <LoginForm onClose={handleCloseLogin} />}
    </div>
  )
}