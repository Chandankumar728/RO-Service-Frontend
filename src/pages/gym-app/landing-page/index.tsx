"use client"

import { useState } from "react"
import {
  PhoneCall,
  Check,
  Clock,
  Shield,
  Star,
  Mail,
  MapPin,
  Droplets,
  PenToolIcon as Tool,
  Wrench,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import rologo from "../../gym-app/landing-page/rologo.jpg"
import rolanding from "../../gym-app/landing-page/rolanding.jpg"
import roinstall from "../../gym-app/landing-page/plumbing-professional-doing-his-job.jpg"
export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState<any>({
    name: "",
    phone: "",
    email: "",
    address: "",
    service: "",
    date: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Handle form input changes
  const handleInputChange = (e:any) => {
    const { id, value } = e.target
    setFormData((prevState:any) => ({
      ...prevState,
      [id]: value,
    }))
  }

  // Handle select changes
  const handleSelectChange = (value:any, field:any) => {
    setFormData((prevState:any) => ({
      ...prevState,
      [field]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = (e:any) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate form data
    const requiredFields = ["name", "phone", "email", "address", "service", "date"]
    const isValid = requiredFields.every((field) => formData[field].trim() !== "")

    if (isValid) {
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false)
        setSubmitSuccess(true)

        // Reset form after 3 seconds
        setTimeout(() => {
          setSubmitSuccess(false)
          setFormData({
            name: "",
            phone: "",
            email: "",
            address: "",
            service: "",
            date: "",
            message: "",
          })
        }, 3000)
      }, 1500)
    } else {
      setIsSubmitting(false)
      alert("Please fill in all required fields")
    }
  }

  // Smooth scroll to section
  const scrollToSection = (sectionId:any) => {
    const section = document.getElementById(sectionId)
    section?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  // Testimonials data
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Homeowner",
      content:
        "The service was prompt and professional. My new RO system works perfectly, and the technician explained everything clearly.",
      rating: 5,
    },
    {
      name: "Rahul Verma",
      role: "Restaurant Owner",
      content:
        "We've been using AquaPure for our restaurant's water purification needs for over 2 years. Their maintenance service is excellent.",
      rating: 5,
    },
    {
      name: "Anita Patel",
      role: "Apartment Resident",
      content:
        "Quick response time and affordable pricing. The technician was knowledgeable and fixed our RO system efficiently.",
      rating: 4,
    },
  ]

  // Services data
  const services = [
    {
      title: "RO Installation",
      description: "Professional installation of new RO water purifiers with proper setup and testing.",
      icon: <Droplets className="h-10 w-10 text-blue-500" />,
    },
    {
      title: "Maintenance & Service",
      description: "Regular maintenance, filter replacement, and comprehensive service packages.",
      icon: <Tool className="h-10 w-10 text-blue-500" />,
    },
    {
      title: "Repair & Troubleshooting",
      description: "Expert diagnosis and repair of all types of RO system issues and malfunctions.",
      icon: <Wrench className="h-10 w-10 text-blue-500" />,
    },
    {
      title: "Annual Maintenance Contract",
      description: "Yearly maintenance plans with priority service and discounted parts replacement.",
      icon: <Calendar className="h-10 w-10 text-blue-500" />,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-blue-600 text-white shadow-lg fixed w-full z-50 top-0">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img src={rologo} alt="RO Service Logo" className="h-10 w-10 rounded" />
              <span className="font-bold text-xl">AquaPure RO Services</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              {["Services", "Installation", "Booking", "Testimonials", "Contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section.toLowerCase())}
                  className="hover:text-blue-200 transition duration-300"
                >
                  {section}
                </button>
              ))}
              <a
                href="/gym-app/auth/login"
                className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-blue-100 transition duration-300"
              >
                Admin Login
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="outline-none" aria-label="Toggle menu">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-3 pb-3 space-y-2">
              {["Services", "Installation", "Booking", "Testimonials", "Contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section.toLowerCase())}
                  className="block w-full text-left hover:bg-blue-700 p-2 rounded"
                >
                  {section}
                </button>
              ))}
              <a href="/admin" className="block bg-white text-blue-600 p-2 rounded">
                Admin Login
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white mt-16">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Pure Water, Healthier Life</h1>
              <p className="text-xl mb-6">
                Ranchi's most trusted RO service provider with expert installation, maintenance, and repair services.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Button
                  onClick={() => scrollToSection("booking")}
                  className="bg-white text-blue-600 hover:bg-blue-100"
                  size="lg"
                >
                  Book New RO
                </Button>
                <Button
                  onClick={() => scrollToSection("services")}
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                  size="lg"
                >
                  Our Services
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src={rolanding}
                alt="RO Water Purifier"
                className="w-full h-auto md:h-96 rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive water purification solutions to ensure you always have access to clean, safe
              drinking water.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Installation Section */}
      <div id="installation" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/3">
              <img
                src={roinstall}
                alt="RO Installation Process"
                className="h-[50%] w-full object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Professional RO Installation</h2>
              <p className="text-gray-600 mb-6">
                Our expert technicians ensure proper installation of your RO system for optimal performance and
                longevity.
              </p>
              <div className="space-y-4">
                {[
                  "Free site inspection and water quality testing",
                  "Professional installation by certified technicians",
                  "Complete system setup and configuration",
                  "Post-installation testing and demonstration",
                  "1-year warranty on installation services",
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="ml-3 text-gray-600">{item}</p>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => scrollToSection("booking")}
                className="mt-8 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Schedule Installation
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div id="booking" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Book New RO Service</h2>
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">Thank You!</h3>
                <p className="text-gray-600">
                  Your booking request has been submitted successfully. We'll contact you shortly to confirm your
                  appointment.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      Full Name*
                    </label>
                    <Input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                      Phone Number*
                    </label>
                    <Input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Your Phone Number"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email Address*
                    </label>
                    <Input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your Email"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                      Address*
                    </label>
                    <Input
                      type="text"
                      id="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Your Address"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-gray-700 font-medium mb-2">
                      Service Type*
                    </label>
                    <Select value={formData.service} onValueChange={(value) => handleSelectChange(value, "service")}>
                      <SelectTrigger id="service">
                        <SelectValue placeholder="Select Service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new-installation">New RO Installation</SelectItem>
                        <SelectItem value="maintenance">Maintenance & Service</SelectItem>
                        <SelectItem value="repair">Repair & Troubleshooting</SelectItem>
                        <SelectItem value="amc">Annual Maintenance Contract</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
                      Preferred Date*
                    </label>
                    <Input
                      type="date"
                      id="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                      Additional Information
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Any specific requirements or questions?"
                      rows={4}
                    />
                  </div>
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full py-6 text-lg">
                  {isSubmitting ? "Submitting..." : "Book Service"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center text-blue-600 font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="h-10 w-10 text-blue-500" />,
                title: "Quality Assurance",
                description: "We use only genuine parts and follow industry best practices for all services.",
              },
              {
                icon: <Clock className="h-10 w-10 text-blue-500" />,
                title: "Prompt Service",
                description: "Our technicians arrive on time and complete the work efficiently.",
              },
              {
                icon: <Star className="h-10 w-10 text-blue-500" />,
                title: "Expert Technicians",
                description: "Our team consists of certified and experienced professionals.",
              },
              {
                icon: <PhoneCall className="h-10 w-10 text-blue-500" />,
                title: "24/7 Support",
                description: "We're available round the clock for emergency service requests.",
              },
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-500 p-4 rounded-full mb-4">
                <PhoneCall className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="mb-2">For quick inquiries and bookings</p>
              <a href="tel:+919876543210" className="text-xl font-bold hover:underline">
                +91 98765 43210
              </a>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-500 p-4 rounded-full mb-4">
                <Mail className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="mb-2">For detailed inquiries and support</p>
              <a href="mailto:info@aquapure.com" className="text-xl font-bold hover:underline">
                info@aquapure.com
              </a>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-500 p-4 rounded-full mb-4">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p className="mb-2">Our office location</p>
              <p className="text-xl font-bold">123 Main Road, Ranchi, Jharkhand 834001</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">AquaPure RO Services</h3>
              <p className="text-gray-400">
                Providing clean water solutions since 2010. We are committed to ensuring safe drinking water for every
                household.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {["Services", "Installation", "Booking", "Testimonials", "Contact"].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="text-gray-400 hover:text-white transition duration-300"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Service Areas</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Ranchi</li>
                <li>Jamshedpur</li>
                <li>Dhanbad</li>
                <li>Bokaro</li>
                <li>Hazaribagh</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Monday - Saturday: 9:00 AM - 8:00 PM</li>
                <li>Sunday: 10:00 AM - 4:00 PM</li>
                <li>Emergency Service: 24/7</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} AquaPure RO Services. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

