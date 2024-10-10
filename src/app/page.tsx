'use client'

import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { useEffect } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'

export default function LandingPage() {
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

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center">
      <header className="absolute top-4 left-4">
        <Image src="/ccColor.png" alt="CodeCrate Logo" width={45} height={45} />
      </header>
      <main className="flex flex-col md:flex-row items-center justify-center p-8 gap-12 max-w-7xl mx-auto">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            <span className="text-blue-400">Code</span> and <span className="text-green-400">collaborate</span> in real-time, <span className="text-yellow-400">build amazing projects</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
            CodeCrate is an online community for testing and showcasing HTML, CSS, and JavaScript code snippets. Create, share, and learn in our open-source learning environment.
          </p>
          <div className="flex gap-4">
            {/* <Button variant="outline" size="lg" className="text-gray-800 hover:bg-gray-800 hover:text-gray-300 transition-colors">
              Explore Crates
            </Button> */}
            <Button variant="outline" size="lg" className="bg-white text-black hover:bg-gray-200 transition-colors">
  Explore Crates
</Button>
            {/* <Button size="lg" className="bg-blue-600 hover:bg-blue-800 hover:text-gray-300 transition-colors">
              Get Started
            </Button> */}
<Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white transition-colors">
  Get Started
</Button>
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg transform rotate-6"></div>
          <div className="relative bg-[#252525] p-3 text-xs sm:text-sm md:text-base sm:rounded-lg md:max-w-full lg:max-w-[90%] xl:rounded-xl xl:p-4 hidden sm:block">
            <pre className="text-xs sm:text-sm md:text-base">
              <code className="language-javascript">{codeSnippet}</code>
            </pre>
          </div>
        </div>
      </main>
    </div>
  )
}