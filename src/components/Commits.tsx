'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, GitCommit, ChevronRight, MoreHorizontal, Search, Calendar } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

interface Commit {
  sha: string
  commit: {
    message: string
    author: {
      name: string
      date: string
    }
    verification: {
      verified: boolean
    }
  }
  author: {
    login: string
    avatar_url: string
  }
  html_url: string
}

export default function CommitPage() {
  const [commits, setCommits] = useState<Commit[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  useEffect(() => {
    fetch('https://api.github.com/repos/hellomikko/codecrate/commits')
      .then(response => response.json())
      .then(data => {
        setCommits(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching commits:', error)
        setLoading(false)
      })
  }, [])

  const groupCommitsByDate = (commits: Commit[]) => {
    const grouped = commits.reduce((acc, commit) => {
      const date = new Date(commit.commit.author.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(commit)
      return acc
    }, {} as Record<string, Commit[]>)
    return Object.entries(grouped)
  }

  const truncateMessage = (message: string, maxLength: number = 70) => {
    const lines = message.split('\n')
    const firstLine = lines[0].length > maxLength ? lines[0].slice(0, maxLength) + '...' : lines[0]
    return lines.length > 1 ? firstLine + ' ...' : firstLine
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] p-4">
      <div className="max-w-[1280px] mx-auto">
        <h1 className="text-[20px] leading-[30px] font-semibold mb-4">Commits</h1>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Select>
              <SelectTrigger className="w-[120px] text-[14px] h-[28px] bg-[#21262d] border-[#30363d] text-[#c9d1d9]">
                <GitCommit className="mr-2 h-4 w-4" />
                <SelectValue placeholder="main" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main">main</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[180px] justify-between text-[14px] h-[28px] bg-[#21262d] border-[#30363d] text-[#c9d1d9]">
                  <span className="flex items-center">
                    <Search className="mr-2 h-4 w-4" />
                    All users
                  </span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[180px] p-0 bg-[#161b22] border-[#30363d] text-[#c9d1d9]">
                <div className="p-2">
                  <Input placeholder="Find a user..." className="text-[12px] bg-[#0d1117] border-[#30363d] text-[#c9d1d9] h-[28px]" />
                </div>
                <ul className="max-h-[300px] overflow-auto">
                  <li className="px-2 py-1 hover:bg-[#30363d] cursor-pointer flex items-center">
                    <Avatar className="h-5 w-5 mr-2">
                      <AvatarImage src="https://github.com/hellomikko.png" />
                      <AvatarFallback>HM</AvatarFallback>
                    </Avatar>
                    <span className="text-[14px]">hellomikko</span>
                  </li>
                  <li className="px-2 py-1 hover:bg-[#30363d] cursor-pointer text-[14px]">View commits for all users</li>
                </ul>
              </PopoverContent>
            </Popover>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[180px] justify-between text-[14px] h-[28px] bg-[#21262d] border-[#30363d] text-[#c9d1d9]">
                  <span className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    All time
                  </span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-[#161b22] border-[#30363d] text-[#c9d1d9]" align="end">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border-[#30363d]"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        {loading ? (
          <p>Loading commits...</p>
        ) : (
          <div className="border border-[#30363d] rounded-md overflow-hidden">
            {groupCommitsByDate(commits).map(([date, dateCommits]) => (
              <div key={date}>
                <h2 className="text-[12px] font-semibold px-3 py-2 bg-[#161b22] text-[#8b949e] border-b border-[#30363d]">
                  Commits on {date}
                </h2>
                {dateCommits.map((commit) => (
                  <div key={commit.sha} className="flex items-start px-3 py-2 border-b border-[#30363d] last:border-b-0 hover:bg-[#161b22]">
                    <div className="flex-grow pr-4">
                      <div className="flex items-center">
                        <Link href={commit.html_url} className="text-[14px] font-semibold text-[#58a6ff] hover:underline">
                          {truncateMessage(commit.commit.message)}
                        </Link>
                        {commit.commit.verification.verified && (
                          <Badge variant="secondary" className="ml-2 text-[10px] px-1 py-0 bg-[#1f6feb] text-[#c9d1d9]">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center mt-1 text-[12px] text-[#8b949e]">
                        <Link href={`https://github.com/${commit.author.login}`} className="flex items-center hover:text-[#58a6ff]">
                          <Avatar className="h-4 w-4 mr-1">
                            <AvatarImage src={commit.author.avatar_url} alt={commit.author.login} />
                            <AvatarFallback>{commit.author.login.slice(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          {commit.author.login}
                        </Link>
                        <span className="mx-1">committed</span>
                        <time dateTime={commit.commit.author.date}>
                          {new Date(commit.commit.author.date).toLocaleString()}
                        </time>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[12px] h-[28px] text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#30363d]"
                        asChild
                      >
                        <Link href={commit.html_url}>
                          <GitCommit className="mr-2 h-3 w-3" />
                          <span>{commit.sha.substring(0, 7)}</span>
                          <ChevronRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-[12px] h-[28px] text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#30363d] ml-2"
                      >
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}