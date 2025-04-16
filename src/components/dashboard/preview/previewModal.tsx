import Image from "next/image"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function PreviewModal({profile}: { profile: any }) {
  console.log(profile, "the profile got")
  return (
    <div className="min-h-screen bg-white">
      {/* Feedback button */}
   

      {/* Header Image */}
      <div className="relative w-full h-[300px] md:h-[400px]">
        <Image
          src={profile?.thumbnail}
          alt="Rajagiri School Of Engineering and Technology Campus"
          fill
          className="object-cover"
        />

        {/* Logo */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="rounded-full bg-white p-2">
            <Image src={profile?.avatar} alt="Rajagiri Logo" width={100} height={100} className="rounded-full" />
          </div>
        </div>
      </div>

      {/* College Title and Location */}
      <div className="mt-16 text-center px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
         {profile?.title }
        </h1>
        <div className="flex items-center justify-center mt-2 text-gray-600">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{`${profile?.address} ,${profile?.city},${profile?.district}`}</span>
        </div>
        <div className="flex justify-center gap-2 mt-2">
          <Badge className="bg-pink-500 hover:bg-pink-600">Engineering</Badge>
          <Badge className="bg-purple-500 hover:bg-purple-600">Others</Badge>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mt-8 px-4 max-w-6xl mx-auto">
        <Tabs defaultValue="overview">
          <TabsList className="w-full justify-start overflow-auto">
            <TabsTrigger value="overview" className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-home"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Overview
            </TabsTrigger>
         
           
          </TabsList>
        </Tabs>
      </div>

      {/* Stats Cards */}
      <div className="mt-8 px-4 max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="border">
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Established Year</div>
            <div className="text-xl font-bold">{profile?.establishedYear}</div>
          </CardContent>
        </Card>
        <Card className="border">
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">College Code</div>
            <div className="text-xl font-bold">{profile?.code}</div>
          </CardContent>
        </Card>
        <Card className="border">
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Accreditations</div>
            <div className="text-xl font-bold">{profile?.accreditation?.title}</div>
          </CardContent>
        </Card>
        <Card className="border">
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Courses</div>
            <div className="text-xl font-bold">{profile?.profileProgrammes?.length}</div>
          </CardContent>
        </Card>
        <Card className="border">
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Facilities</div>
            <div className="text-xl font-bold">0</div>
          </CardContent>
        </Card>
        <Card className="border md:hidden">
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Photos</div>
            <div className="text-xl font-bold">0</div>
          </CardContent>
        </Card>
      </div>

      {/* Info Sections */}
      <div className="mt-8 px-4 max-w-6xl mx-auto grid md:grid-cols-2 gap-6 pb-12">
        {/* Overview Section */}
        <div>
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-3 rounded-t-lg">
            <h2 className="font-semibold">Overview</h2>
          </div>
          <Card className="rounded-t-none border-t-0">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-building"
                  >
                    <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
                    <path d="M9 22v-4h6v4" />
                    <path d="M8 6h.01" />
                    <path d="M16 6h.01" />
                    <path d="M12 6h.01" />
                    <path d="M12 10h.01" />
                    <path d="M12 14h.01" />
                    <path d="M16 10h.01" />
                    <path d="M16 14h.01" />
                    <path d="M8 10h.01" />
                    <path d="M8 14h.01" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">University</div>
                  <div className="font-medium">{profile?.university?.title} </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-users"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Management</div>
                  <div className="font-medium">{profile?.management}</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-graduation-cap"
                  >
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">College Type</div>
                  <div className="font-medium">{profile?.type?.title}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Section */}
        <div>
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-3 rounded-t-lg">
            <h2 className="font-semibold">Contact</h2>
          </div>
          <Card className="rounded-t-none border-t-0">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-phone"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Phone Number</div>
                  <div className="font-medium">{profile?.phone}</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-mail"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email Address</div>
                  <div className="font-medium">{profile?.email}</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-gray-100 p-3 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-map-pin"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Address</div>
                  <div className="font-sm">{`${profile?.address},${profile?.city},${profile?.district},${profile?.pincode}`}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}