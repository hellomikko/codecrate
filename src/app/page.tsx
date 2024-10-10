'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Moon, Sun, Play, Square } from 'lucide-react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'

export default function LandingPage() {
  const [theme, setTheme] = useState('dark')
  const [isAnimating, setIsAnimating] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<{ x: number; y: number; size: number; speedX: number; speedY: number; hue: number }[]>([])
  const animationRef = useRef<number>()

  const [code, setCode] = useState(`function createCosmicNight(canvas) {
  const ctx = canvas.getContext('2d');
  const particles = [];
  const particleCount = 300;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 0.5 + 0.1,
      speedX: Math.random() * 0.05 - 0.025,
      speedY: Math.random() * 0.05 - 0.025,
      hue: Math.random() * 60 + 200
    });
  }

  function animate() {
    ctx.fillStyle = 'rgba(10, 10, 30, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = \`hsla(\${p.hue}, 100%, 50%, 0.8)\`;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// Run this function to start the animation
createCosmicNight(document.querySelector('canvas'));`)

  const [output, setOutput] = useState('')

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (ctx) {
        if (particlesRef.current.length === 0) {
          const particleCount = 300
          for (let i = 0; i < particleCount; i++) {
            particlesRef.current.push({
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              size: Math.random() * 0.5 + 0.1,
              speedX: Math.random() * 0.05 - 0.025,
              speedY: Math.random() * 0.05 - 0.025,
              hue: Math.random() * 60 + 200
            })
          }
        }

        const animate = () => {
          ctx.fillStyle = 'rgba(10, 10, 30, 0.05)'
          ctx.fillRect(0, 0, canvas.width, canvas.height)

          particlesRef.current.forEach(p => {
            if (isAnimating) {
              p.x += p.speedX
              p.y += p.speedY

              if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
              if (p.y < 0 || p.y > canvas.height) p.speedY *= -1
            }

            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
            ctx.fillStyle = `hsla(${p.hue}, 100%, 50%, 0.8)`
            ctx.fill()
          })

          animationRef.current = requestAnimationFrame(animate)
        }

        animate()

        return () => {
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current)
          }
        }
      }
    }
  }, [isAnimating])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  const runCode = () => {
    setIsAnimating(true)
    setOutput('Cosmic night animation resumed.')
  }

  const stopCode = () => {
    setIsAnimating(false)
    setOutput('Cosmic night animation paused.')
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-500 overflow-hidden`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="container mx-auto px-4 py-8 relative">
        <header className="flex justify-between items-center mb-8">
          <div className="relative w-10 h-10">
            <div className={`absolute inset-0 ${isAnimating ? 'animate-v0-logo' : ''}`}>
              <Image src="/ccColor.png" alt="CodeCrate Logo" layout="fill" />
            </div>
          </div>
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            {theme === 'light' ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
        </header>
        
        <main className="flex flex-col md:flex-row items-center justify-between space-y-12 md:space-y-0 md:space-x-12">
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Code, Create, Collaborate
              </span>
            </h2>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Experience the future of coding with CodeCrate. Build, share, and learn in our interactive playground.
            </p>
            <div className="flex space-x-4">
              <Button size="lg" className={theme === 'dark' ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}>Get Started</Button>
              <Button variant="outline" size="lg">Explore Crates</Button>
            </div>
          </div>
          
          <div className={`md:w-1/2 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg shadow-xl overflow-hidden`}>
            <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} px-4 py-2 flex justify-between items-center`}>
              <span className="font-mono text-sm text-gray-500">
                {/* src/app/crates/main.js */}
              </span>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" onClick={runCode}>
                  <Play className="h-4 w-4 mr-2" />
                  Run
                </Button>
                <Button variant="ghost" size="sm" onClick={stopCode}>
                  <Square className="h-4 w-4 mr-2" />
                  Stop
                </Button>
              </div>
            </div>
            <div className="h-[400px] overflow-auto">
              <CodeMirror
                value={code}
                height="400px"
                theme={theme === 'dark' ? oneDark : 'light'}
                extensions={[javascript({ jsx: true })]}
                onChange={(value) => setCode(value)}
              />
            </div>
            {output && (
              <div className={`border-t ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
                <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} px-4 py-2`}>
                  <span className="font-mono text-sm">Output</span>
                </div>
                <pre className={`p-4 font-mono text-sm whitespace-pre-wrap ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>{output}</pre>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}