// import { Avatar, AvatarImage } from '@/components/ui/avatar';
// import { Button } from '@/components/ui/button';
// import { BarChart, Calendar, CheckCircle2, Phone, FileText, Search, Clock, Users } from 'lucide-react';
// import { Link } from 'react-router-dom';

// export default function LandingPage() {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="container flex h-16 items-center">
//           <Avatar className="w-12 h-12 border dark:border-gray-700">
//             <AvatarImage src="/GovServe.png" alt="GovServe" />
//           </Avatar>
//           <span className="font-bold text-lg ml-2">GovServe</span>
          
//           <nav className="ml-auto flex gap-6 sm:gap-8">
//             <Link className="text-sm font-medium hover:underline underline-offset-4" to="/services">
//               Services
//             </Link>
//             <Link className="text-sm font-medium hover:underline underline-offset-4" to="/track">
//               Track Applications
//             </Link>
//             <Link className="text-sm font-medium hover:underline underline-offset-4" to="/contact">
//               Contact
//             </Link>
//           </nav>
//         </div>
//       </header>
//       <main className="flex-1">
//         <section className="w-full py-16 md:py-24 lg:py-32 xl:py-48 relative">
//           <div className="absolute inset-0 z-0">
//             <img
//               src="/government-building.jpg"
//               alt="Government Services"
//               className="absolute inset-0 w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-blue-900/75" />
//           </div>
//           <div className="container px-4 md:px-6 relative z-10">
//             <div className="flex flex-col items-center space-y-6 text-center">
//               <div className="space-y-3">
//                 <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
//                   Your Government Services Made Simple
//                 </h1>
//                 <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
//                   Call, book appointments, and track your applications - all in one convenient portal for citizens.
//                 </p>
//               </div>
//               <div className="flex flex-col sm:flex-row gap-4 mt-4">
//                 <Link to="/service-booking">
//                   <Button className="bg-white text-blue-800 hover:bg-gray-100 min-w-[150px]">Book Appointment</Button>
//                 </Link>
//                 <Link to="/track-application">
//                   <Button variant="outline" className="border-white text-white hover:bg-white/10 min-w-[150px]">Track Application</Button>
//                 </Link>
//                 <Link to="/contact-center">
//                   <Button className="bg-green-600 text-white hover:bg-green-700 min-w-[150px]">Call Center</Button>
//                 </Link>
//               </div>
//             </div>
//             <div className="mt-12 p-6 bg-white/90 dark:bg-gray-800/90 rounded-lg max-w-3xl mx-auto">
//               <div className="text-center mb-4">
//                 <h3 className="text-xl font-bold text-gray-900 dark:text-white">Quick Application Status</h3>
//               </div>
//               <div className="flex gap-4">
//                 <input 
//                   type="text" 
//                   placeholder="Enter application ID" 
//                   className="flex-1 px-4 py-2 border rounded-md"
//                 />
//                 <Button className="bg-blue-700">
//                   <Search className="h-4 w-4 mr-2" /> Check Status
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </section>
        
//         <section id="features" className="w-full py-16 md:py-24 lg:py-28 bg-gray-50 dark:bg-gray-800">
//           <div className="container px-4 md:px-6">
//             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12 text-blue-800 dark:text-blue-300">
//               Citizen-Centric Services
//             </h2>
//             <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
//               <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md transform transition-transform hover:scale-105">
//                 <Phone className="h-12 w-12 text-blue-600 mb-4" />
//                 <h3 className="text-xl font-bold mb-3">Call Services</h3>
//                 <p className="text-gray-600 dark:text-gray-300 text-center">
//                   Connect with government representatives through our dedicated call center for assistance and information.
//                 </p>
//                 <Button variant="outline" className="mt-4">View Call Options</Button>
//               </div>
//               <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md transform transition-transform hover:scale-105">
//                 <Calendar className="h-12 w-12 text-blue-600 mb-4" />
//                 <h3 className="text-xl font-bold mb-3">Book Appointments</h3>
//                 <p className="text-gray-600 dark:text-gray-300 text-center">
//                   Schedule in-person or virtual appointments with specific departments to avoid waiting in line.
//                 </p>
//                 <Button variant="outline" className="mt-4">Schedule Now</Button>
//               </div>
//               <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md transform transition-transform hover:scale-105">
//                 <Search className="h-12 w-12 text-blue-600 mb-4" />
//                 <h3 className="text-xl font-bold mb-3">Track Applications</h3>
//                 <p className="text-gray-600 dark:text-gray-300 text-center">
//                   Monitor the status of your applications and receive real-time updates on their progress.
//                 </p>
//                 <Button variant="outline" className="mt-4">Track Status</Button>
//               </div>
//             </div>
//           </div>
//         </section>
        
//         <section id="services" className="w-full py-16 md:py-24 lg:py-28">
//           <div className="container px-4 md:px-6">
//             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12 text-blue-800 dark:text-blue-300">
//               Popular Services
//             </h2>
//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
//               {[
//                 { title: 'ID Renewal', icon: FileText, time: '7-10 days', fee: '$25' },
//                 { title: 'Business Permits', icon: FileText, time: '14-21 days', fee: '$75' },
//                 { title: 'Property Registration', icon: FileText, time: '30 days', fee: '$120' },
//                 { title: 'Tax Filing', icon: FileText, time: '1-3 days', fee: 'Free' },
//               ].map((service, index) => (
//                 <div key={index} className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700">
//                   <div className="flex items-center mb-4">
//                     <service.icon className="h-8 w-8 text-blue-600 mr-3" />
//                     <h3 className="text-lg font-bold">{service.title}</h3>
//                   </div>
//                   <div className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-300">
//                     <div className="flex items-center">
//                       <Clock className="h-4 w-4 mr-2" />
//                       <span>Processing: {service.time}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <FileText className="h-4 w-4 mr-2" />
//                       <span>Fee: {service.fee}</span>
//                     </div>
//                   </div>
//                   <Button className="mt-auto w-full">Apply Now</Button>
//                 </div>
//               ))}
//             </div>
//             <div className="text-center mt-10">
//               <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
//                 View All Services
//               </Button>
//             </div>
//           </div>
//         </section>
        
//         <section id="testimonials" className="w-full py-16 md:py-24 lg:py-28 bg-gray-50 dark:bg-gray-800">
//           <div className="container px-4 md:px-6">
//             <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12 text-blue-800 dark:text-blue-300">
//               Citizen Feedback
//             </h2>
//             <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
//               {[
//                 { name: 'Sandeep Kumar', text: "I was able to renew my ID card online and track the status. The process was smooth and I received my card within 5 days!", avatar: "avatar-1.jpg" },
//                 { name: 'Priya Sharma', text: "Booking an appointment was so easy. No more waiting in long lines! The call center was also very helpful when I had questions.", avatar: "avatar-2.jpg" },
//                 { name: 'Ramesh Singh', text: "I applied for a business permit and could track every step of the approval process. The transparency is refreshing for a government service.", avatar: "avatar-3.jpg" }
//               ].map((testimonial, index) => (
//                 <div key={index} className="flex flex-col p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
//                   <div className="flex items-center mb-4">
//                     <Avatar className="w-10 h-10 mr-3">
//                       <AvatarImage src={`/${testimonial.avatar}`} alt={testimonial.name} />
//                     </Avatar>
//                     <p className="font-bold">{testimonial.name}</p>
//                   </div>
//                   <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.text}"</p>
//                   <div className="flex mt-4">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                       </svg>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
        
//         <section className="w-full py-16 md:py-24 lg:py-28 bg-blue-700 text-white">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center space-y-6 text-center">
//               <div className="space-y-3 max-w-3xl mx-auto">
//                 <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
//                   Ready to Experience Simplified Government Services?
//                 </h2>
//                 <p className="mx-auto max-w-[700px] text-blue-100 md:text-xl">
//                   Join thousands of citizens who are saving time and effort by using our digital platform for government services.
//                 </p>
//               </div>
//               <div className="flex flex-wrap justify-center gap-4">
//                 <Button className="bg-white text-blue-700 hover:bg-gray-100 min-w-[180px]">Create Account</Button>
//                 <Button variant="outline" className="border-white text-white hover:bg-white/10 min-w-[180px]">How It Works</Button>
//               </div>
//               <div className="flex items-center gap-3 mt-6 text-blue-100">
//                 <CheckCircle2 className="h-5 w-5" />
//                 <span>Secure & Confidential</span>
//                 <CheckCircle2 className="h-5 w-5 ml-4" />
//                 <span>24/7 Access</span>
//                 <CheckCircle2 className="h-5 w-5 ml-4" />
//                 <span>Mobile Friendly</span>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//       <footer className="w-full py-8 bg-gray-100 dark:bg-gray-800">
//         <div className="container px-4 md:px-6">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <Avatar className="w-8 h-8">
//                   <AvatarImage src="/GovServe.png" alt="GovServe" />
//                 </Avatar>
//                 <span className="font-bold">GovServe</span>
//               </div>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 Simplifying citizen services through digital innovation.
//               </p>
//             </div>
//             <div>
//               <h3 className="font-bold mb-4">Quick Links</h3>
//               <ul className="space-y-2">
//                 <li><Link className="text-sm hover:underline text-gray-600 dark:text-gray-400" to="#">Home</Link></li>
//                 <li><Link className="text-sm hover:underline text-gray-600 dark:text-gray-400" to="#">Services</Link></li>
//                 <li><Link className="text-sm hover:underline text-gray-600 dark:text-gray-400" to="#">Track Applications</Link></li>
//                 <li><Link className="text-sm hover:underline text-gray-600 dark:text-gray-400" to="#">FAQ</Link></li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="font-bold mb-4">Contact</h3>
//               <ul className="space-y-2">
//                 <li className="text-sm text-gray-600 dark:text-gray-400">Call Center: 1-800-GOV-HELP</li>
//                 <li className="text-sm text-gray-600 dark:text-gray-400">Email: support@govserve.gov</li>
//                 <li className="text-sm text-gray-600 dark:text-gray-400">Hours: Mon-Fri, 8am-5pm</li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="font-bold mb-4">Stay Connected</h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
//                 Get updates on new services and features.
//               </p>
//               <div className="flex space-x-2">
//                 <input type="email" placeholder="Your email" className="px-3 py-2 text-sm border rounded-md flex-1" />
//                 <Button size="sm">Subscribe</Button>
//               </div>
//             </div>
//           </div>
//           <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
//             <p className="text-center text-sm text-gray-600 dark:text-gray-400">
//               © 2025 GovServe. All rights reserved.
//             </p>
//             <div className="flex space-x-4 mt-4 md:mt-0">
//               <Link className="text-sm hover:underline text-gray-600 dark:text-gray-400" to="#">
//                 Privacy Policy
//               </Link>
//               <Link className="text-sm hover:underline text-gray-600 dark:text-gray-400" to="#">
//                 Terms of Service
//               </Link>
//               <Link className="text-sm hover:underline text-gray-600 dark:text-gray-400" to="#">
//                 Accessibility
//               </Link>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }



import {Link} from "react-router-dom"
// import Image from "@/components/ui/image"
import { Image } from '@/components/image';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Droplets, Filter, Home, Phone, ShieldCheck, Sparkles, ThumbsUp, Truck } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Droplets className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">PureFlow RO</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link to="#features" className="text-sm font-medium transition-colors hover:text-primary">
              Features
            </Link>
            <Link to="#how-it-works" className="text-sm font-medium transition-colors hover:text-primary">
              How It Works
            </Link>
            <Link to="#pricing" className="text-sm font-medium transition-colors hover:text-primary">
              Pricing
            </Link>
            <Link to="#testimonials" className="text-sm font-medium transition-colors hover:text-primary">
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="#contact" className="hidden md:block">
              <Button variant="outline" size="sm">
                Contact Us
              </Button>
            </Link>
            <Link to="#get-started">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Pure Water, Better Life with Advanced RO Technology
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Experience the difference of 99.9% pure water with our state-of-the-art Reverse Osmosis systems.
                    Installation, maintenance, and exceptional service - all in one package.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link to="#get-started">
                    <Button size="lg" className="w-full min-[400px]:w-auto">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="#learn-more">
                    <Button variant="outline" size="lg" className="w-full min-[400px]:w-auto">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <Image
                src="/placeholder.svg?height=550&width=550"
                width={550}
                height={550}
                alt="Modern RO system installed in a kitchen"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Premium Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Why Choose Our RO Service?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our Reverse Osmosis systems deliver the purest water possible with cutting-edge technology and
                  unmatched service.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <Filter className="h-6 w-6 text-primary" />
                  <CardTitle>Advanced Filtration</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    5-stage filtration process removes 99.9% of contaminants, providing crystal clear, great-tasting
                    water.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <Truck className="h-6 w-6 text-primary" />
                  <CardTitle>Professional Installation</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Expert technicians install your system with minimal disruption to your home or business.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  <CardTitle>Maintenance Included</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Regular maintenance and filter replacements included in all our service packages.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  <CardTitle>Water Quality Testing</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Regular water quality tests ensure your system is performing at optimal levels.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <ThumbsUp className="h-6 w-6 text-primary" />
                  <CardTitle>Customer Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    98% customer satisfaction rate with 24/7 support for any issues or questions.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-2">
                  <Home className="h-6 w-6 text-primary" />
                  <CardTitle>Residential & Commercial</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Solutions for homes, offices, restaurants, and industrial facilities of all sizes.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How Our RO Service Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A simple process from consultation to pure water flowing from your tap.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12">
              <div className="grid gap-12 md:grid-cols-3">
                <div className="flex flex-col items-center space-y-3 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    1
                  </div>
                  <h3 className="text-xl font-bold">Consultation</h3>
                  <p className="text-muted-foreground">
                    Our experts assess your water quality and recommend the perfect RO system for your needs.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-3 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    2
                  </div>
                  <h3 className="text-xl font-bold">Installation</h3>
                  <p className="text-muted-foreground">
                    Professional installation by certified technicians with minimal disruption.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-3 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    3
                  </div>
                  <h3 className="text-xl font-bold">Enjoy & Maintain</h3>
                  <p className="text-muted-foreground">
                    Enjoy pure water while we handle all maintenance and filter replacements on schedule.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simple, Transparent Pricing</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that works best for your home or business.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3">
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Basic</CardTitle>
                  <div className="text-3xl font-bold">
                    $29.99<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                  <CardDescription>Perfect for small households</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>3-stage RO system</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Professional installation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Annual maintenance</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Filter replacements</span>
                    </li>
                  </ul>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button className="w-full">Get Started</Button>
                </div>
              </Card>
              <Card className="flex flex-col border-primary">
                <CardHeader>
                  <div className="text-center text-sm font-medium text-primary">Most Popular</div>
                  <CardTitle>Premium</CardTitle>
                  <div className="text-3xl font-bold">
                    $49.99<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                  <CardDescription>Ideal for families</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>5-stage RO system</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Professional installation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Bi-annual maintenance</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Filter replacements</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Water quality testing</span>
                    </li>
                  </ul>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button className="w-full">Get Started</Button>
                </div>
              </Card>
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle>Business</CardTitle>
                  <div className="text-3xl font-bold">
                    $99.99<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                  <CardDescription>For commercial properties</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Commercial-grade RO system</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Professional installation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Quarterly maintenance</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Filter replacements</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Monthly water quality testing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>24/7 priority support</span>
                    </li>
                  </ul>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button className="w-full">Get Started</Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Customers Say</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Don't just take our word for it - hear from our satisfied customers.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-start gap-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        width={40}
                        height={40}
                        alt="Customer"
                        className="rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium">Sarah Johnson</p>
                        <p className="text-xs text-muted-foreground">Homeowner</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "The difference in water quality is incredible. Installation was quick and the maintenance service
                      is always on time."
                    </p>
                    <div className="flex text-primary">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          stroke="none"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-start gap-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        width={40}
                        height={40}
                        alt="Customer"
                        className="rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium">Michael Rodriguez</p>
                        <p className="text-xs text-muted-foreground">Restaurant Owner</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "Our commercial RO system has been a game-changer for our restaurant. Better tasting food and
                      drinks, and our ice is crystal clear."
                    </p>
                    <div className="flex text-primary">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          stroke="none"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-start gap-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        width={40}
                        height={40}
                        alt="Customer"
                        className="rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium">Jennifer Lee</p>
                        <p className="text-xs text-muted-foreground">Office Manager</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "Having pure water available for our employees has been a great benefit. The service team is
                      always professional and prompt."
                    </p>
                    <div className="flex text-primary">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill={i < 4 ? "currentColor" : "none"}
                          stroke={i < 4 ? "none" : "currentColor"}
                          strokeWidth={i < 4 ? "0" : "2"}
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="get-started" className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready for Pure Water?</h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Schedule a free consultation and water quality test today.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="grid gap-4">
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Your Name"
                    type="text"
                  />
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Your Email"
                    type="email"
                  />
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Your Phone"
                    type="tel"
                  />
                  <Button className="w-full bg-background text-primary hover:bg-background/90">
                    Schedule Consultation
                  </Button>
                </form>
                <p className="text-xs">
                  By submitting this form, you agree to our{" "}
                  <Link to="#" className="underline underline-offset-2">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Contact Us</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have questions? Our team is here to help. Reach out to us anytime.
              </p>
              <div className="flex flex-col space-y-4 pt-4">
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
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
                    className="text-primary"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>info@pureflowro.com</span>
                </div>
                <div className="flex items-center gap-2">
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
                    className="text-primary"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>123 Water Way, Pureville, CA 90210</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.7462606519114!2d-122.41941638468173!3d37.77492997975903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjgiTiAxMjLCsDI1JzA1LjAiVw!5e0!3m2!1sen!2sus!4v1616593926760!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                className="rounded-lg"
                title="Map"
              ></iframe>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex items-center gap-2">
            <Droplets className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">PureFlow RO</span>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} PureFlow RO. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="#" className="text-muted-foreground hover:text-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <span className="sr-only">Facebook</span>
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
              <span className="sr-only">Twitter</span>
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

