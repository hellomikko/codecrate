"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Settings, User } from "lucide-react"

export default function DashboardPage() {
  // Placeholder data - in a real app, this would come from your backend
  const user = {
    name: "Jane Doe",
    username: "janedoe",
    avatar: "/placeholder.svg?height=100&width=100",
    projectCount: 23,
    followerCount: 156,
    followingCount: 89,
  }

  const recentProjects = [
    { id: 1, name: "Responsive NavBar", language: "HTML/CSS" },
    { id: 2, name: "React Todo App", language: "JavaScript" },
    { id: 3, name: "API Integration", language: "JavaScript" },
    { id: 4, name: "SVG Animation", language: "CSS" },
  ]

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center space-x-4 pb-2">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <CardDescription>@{user.username}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-around mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold">{user.projectCount}</p>
              <p className="text-sm text-muted-foreground">Projects</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{user.followerCount}</p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{user.followingCount}</p>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
          </div>

          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="projects">
                <Code className="mr-2 h-4 w-4" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="profile">
                <User className="mr-2 h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent value="projects">
              <h3 className="text-lg font-semibold mb-2">Recent Projects</h3>
              <ul className="space-y-2">
                {recentProjects.map((project) => (
                  <li key={project.id} className="flex justify-between items-center">
                    <span>{project.name}</span>
                    <span className="text-sm text-muted-foreground">{project.language}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-4">View All Projects</Button>
            </TabsContent>
            <TabsContent value="profile">
              <h3 className="text-lg font-semibold mb-2">Profile Information</h3>
              <div className="space-y-2">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Username:</strong> @{user.username}</p>
                <p><strong>Total Projects:</strong> {user.projectCount}</p>
                <p><strong>Followers:</strong> {user.followerCount}</p>
                <p><strong>Following:</strong> {user.followingCount}</p>
              </div>
              <Button className="w-full mt-4">Edit Profile</Button>
            </TabsContent>
            <TabsContent value="settings">
              <h3 className="text-lg font-semibold mb-2">Account Settings</h3>
              <div className="space-y-2">
                <p>Email Notifications: On</p>
                <p>Two-Factor Authentication: Off</p>
                <p>Theme: Light</p>
              </div>
              <Button className="w-full mt-4">Manage Settings</Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}