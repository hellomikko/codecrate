import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FaApple, FaFacebook, FaGithub, FaGoogle, FaTwitter } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import Link from 'next/link'
import Image from 'next/image'

export default function LoginForm({ onClose }: { onClose: () => void }) {
  const [developerCount, setDeveloperCount] = useState(219102)

  useEffect(() => {
    const storedCount = localStorage.getItem('developerCount')
    if (storedCount) {
      setDeveloperCount(parseInt(storedCount, 10))
    }
  }, [])

  const handleSignUp = () => {
    const newCount = developerCount + 5
    setDeveloperCount(newCount)
    localStorage.setItem('developerCount', newCount.toString())
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={onClose}>
      <Card className="w-full max-w-md mx-auto bg-white text-black" onClick={(e) => e.stopPropagation()}>
        <CardHeader className="pb-2">
          <Image src="/ccColor.png" alt="CodeCrate Logo" width={40} height={40} className="mx-auto mb-2" />
          <CardTitle className="text-xl font-bold text-center">Join the CodeCrate Community</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-sm mb-4">
            CodeCrate has {developerCount.toLocaleString()} awesome developers and still growing
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="flex items-center justify-start space-x-2 text-xs h-9">
              <FaApple className="text-black" />
              <span>Sign up with Apple</span>
            </Button>
            <Button variant="outline" className="flex items-center justify-start space-x-2 text-xs h-9">
              <FaFacebook className="text-blue-600" />
              <span>Sign up with Facebook</span>
            </Button>
            <Button variant="outline" className="flex items-center justify-start space-x-2 text-xs h-9">
              <FaGithub className="text-gray-800" />
              <span>Sign up with GitHub</span>
            </Button>
            <Button variant="outline" className="flex items-center justify-start space-x-2 text-xs h-9">
              <FaGoogle className="text-red-500" />
              <span>Sign up with Google</span>
            </Button>
            <Button variant="outline" className="flex items-center justify-start space-x-2 text-xs h-9">
              <FaTwitter className="text-blue-400" />
              <span>Sign up with Twitter</span>
            </Button>
            <Button variant="outline" className="flex items-center justify-start space-x-2 text-xs h-9">
              <MdEmail className="text-gray-600" />
              <span>Sign up with Email</span>
            </Button>
          </div>
          <p className="text-center text-xs mt-4">
            By signing up, you are agreeing to our{' '}
            <Link href="/privacy-policy" className="text-blue-500 hover:underline">privacy policy</Link>,{' '}
            <Link href="/terms-of-use" className="text-blue-500 hover:underline">terms of use</Link>{' '}
            and <Link href="/code-of-conduct" className="text-blue-500 hover:underline">code of conduct</Link>.
          </p>
          <p className="text-center text-xs mt-2">
            Already have an account?{' '}
            <button className="text-blue-500 hover:underline" onClick={handleSignUp}>Log in</button>.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}