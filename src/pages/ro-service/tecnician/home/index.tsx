import { useState } from "react";
import { Calendar, CheckCircle, Clock, Clock1, InfoIcon } from "lucide-react";
import { useApi } from "@/hooks/useCustomQuery";
import { roApi } from "@/lib";
import { I_BOOKING_LIST } from "../../admin/ro-booking-list/type";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

const TechnicianDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const bookingListData = useApi<I_BOOKING_LIST>({
    api: `${roApi?.getBookingListByTechnicianId}?limit=5&page=1`,
    options: {
      enabled: true,
    },
  });
  // Sample data
  const pendingBookings = [
    {
      id: 1,
      customer: "Arun Sharma",
      address: "123 Main St, Delhi",
      date: "30 Mar, 09:30 AM",
      type: "Installation",
    },
    {
      id: 2,
      customer: "Priya Patel",
      address: "456 Park Ave, Mumbai",
      date: "30 Mar, 11:00 AM",
      type: "Service",
    },
    {
      id: 3,
      customer: "Rahul Mehta",
      address: "789 Lake View, Bangalore",
      date: "30 Mar, 02:30 PM",
      type: "Repair",
    },
  ];

  const completedBookings = [
    {
      id: 4,
      customer: "Vikram Singh",
      address: "234 Green Park, Chennai",
      date: "29 Mar, 10:15 AM",
      type: "Service",
    },
    {
      id: 5,
      customer: "Neha Gupta",
      address: "567 Hill Road, Pune",
      date: "29 Mar, 03:45 PM",
      type: "Filter Change",
    },
  ];

  const renderDashboard = () => (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Saturday, 29 March</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-100 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="bg-blue-500 rounded-lg p-2">
              <Clock size={20} className="text-white" />
            </div>
            <span className="text-2xl font-bold">{pendingBookings.length}</span>
          </div>
          <p className="mt-2 text-gray-700">Pending Jobs</p>
        </div>

        <div className="bg-green-100 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="bg-green-500 rounded-lg p-2">
              <CheckCircle size={20} className="text-white" />
            </div>
            <span className="text-2xl font-bold">
              {completedBookings.length}
            </span>
          </div>
          <p className="mt-2 text-gray-700">Completed</p>
        </div>
      </div>

      <h2 className="font-bold text-lg mb-3">Today's Schedule</h2>
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        {bookingListData?.data?.data?.docs.map((booking) => (
          <div
            onClick={() => {
              navigate(`/ro-service/technician/booking/${booking._id}`);
            }}
            key={booking._id}
            className="mb-3 pb-3 border-b border-gray-200 last:border-0 last:mb-0 last:pb-0"
          >
            <div className="flex justify-between mb-1">
              <span className="font-medium">{booking.fullName}</span>
              <span className="text-sm text-blue-600">
                {booking.service?.serviceTypeName}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <Calendar size={14} className="mr-1" />
              {moment(booking.assignDate).format("DD MM, YYYY")}
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <Clock1 size={14} className="mr-1" />
              {booking.aasigntime}
            </div>
            <p className="text-sm text-gray-500">{booking.address}</p>
          </div>
        ))}
        <button className="w-full mt-2 text-blue-600 text-sm font-medium"
          onClick={() => navigate("/ro-service/tech-booking-list")}
        >
          View All Bookings
        </button>
      </div>

      <h2 className="font-bold text-lg mb-3">Recent Completions</h2>
      {
        bookingListData?.data?.data?.docs.filter(item=>item?.status=="Completed")?.length==0?(<Card className="border border-border shadow-sm">
          <div className="p-6 text-center">
            <InfoIcon className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-sm font-medium mb-2">
              No Completed Bookings Found
            </h3>
          </div>
        </Card>):(<div className="bg-white rounded-lg shadow-md p-4">
        {bookingListData?.data?.data?.docs.filter(item=>item?.status=="Completed")?.map((booking) => (
          <div
            key={booking._id}
            className="mb-3 pb-3 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0"
          >
            <div className="flex justify-between mb-1">
              <span className="font-medium">{booking.fullName}</span>
              <span className="text-sm text-green-600">{booking.service?.serviceTypeName}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-1">
              <Calendar size={14} className="mr-1" />
              {
                moment(booking.updatedAt).format("DD MM, YYYY")
              }
            </div>
            <p className="text-sm text-gray-500">{booking.address}</p>
          </div>
        ))}
      </div>)
      }
      
    </div>
  );

  const renderBookings = () => {
    const [bookingTab, setBookingTab] = useState("pending");

    return (
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Bookings</h1>

        <div className="flex mb-4 bg-gray-100 rounded-lg p-1">
          <button
            className={`flex-1 py-2 text-center rounded-md ${
              bookingTab === "pending"
                ? "bg-white shadow-sm font-medium"
                : "text-gray-600"
            }`}
            onClick={() => setBookingTab("pending")}
          >
            Pending
          </button>
          <button
            className={`flex-1 py-2 text-center rounded-md ${
              bookingTab === "completed"
                ? "bg-white shadow-sm font-medium"
                : "text-gray-600"
            }`}
            onClick={() => setBookingTab("completed")}
          >
            Completed
          </button>
        </div>

        {bookingTab === "pending" ? (
          <div>
            {pendingBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-lg shadow-md p-4 mb-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold">{booking.customer}</h3>
                    <p className="text-sm text-gray-500">{booking.address}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {booking.type}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar size={14} className="mr-1" />
                  {booking.date}
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white rounded-md py-2 text-sm font-medium">
                    Start Service
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 rounded-md py-2 text-sm font-medium">
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {completedBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-lg shadow-md p-4 mb-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold">{booking.customer}</h3>
                    <p className="text-sm text-gray-500">{booking.address}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    {booking.type}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar size={14} className="mr-1" />
                  {booking.date}
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-green-600 text-white rounded-md py-2 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "bookings":
        return renderBookings();
      case "dashboard":
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-gray-50">
      {/* Main content */}
      <div className="flex-1 overflow-y-auto">{renderContent()}</div>
    </div>
  );
};

export default TechnicianDashboard;
