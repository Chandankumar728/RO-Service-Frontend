import { useState } from 'react';
import {
  Calendar,
  CheckCircle,
  Clock,
  Clock1,
  InfoIcon,
  PhoneCall,
  PlayCircle,
  Eye
} from 'lucide-react';
import { useApi } from '@/hooks/useCustomQuery';
import { roApi } from '@/lib';
import { I_BOOKING_LIST } from '../../admin/ro-booking-list/type';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/store';
import { Image } from '@/components/image';

const TechnicianDashboard = () => {
  const navigate = useNavigate();
  const { user } = useStore();
  const [activeTab, setActiveTab] = useState('dashboard');
  const bookingListData = useApi<I_BOOKING_LIST>({
    api: `${roApi?.getBookingListByTechnicianId}?limit=5&page=1`,
    options: {
      enabled: true
    }
  });

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Pending':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const renderDashboard = () => (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-lg font-bold text-gray-800">{user?.fullName}</h1>
          <p className="text-gray-500 font-medium">
            {moment().format('dddd, D MMMM')}
          </p>
        </div>
        {/* <div className="h-10 w-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
          <Image
            src={user?.imageUrl || '/images/default-profile.png'}
            alt="Profile"
            className="rounded-full h-full w-full object-cover"
          />
        </div> */}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="bg-white/20 rounded-lg p-2 backdrop-blur-sm">
              <Clock size={24} className="text-white" />
            </div>
            <span className="text-3xl font-bold">
              {bookingListData?.data?.data?.docs.filter(
                (item) => item?.status === 'Pending'
              ).length || 0}
            </span>
          </div>
          <p className="mt-1 text-white/90 font-medium">Pending Jobs</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="bg-white/20 rounded-lg p-2 backdrop-blur-sm">
              <CheckCircle size={24} className="text-white" />
            </div>
            <span className="text-3xl font-bold">
              {bookingListData?.data?.data?.docs.filter(
                (item) => item?.status === 'Completed'
              ).length || 0}
            </span>
          </div>
          <p className="mt-1 text-white/90 font-medium">Completed</p>
        </div>
      </div>

      <h2 className="font-bold text-lg mb-4 text-gray-800">Today's Schedule</h2>
      <div className="bg-white rounded-xl shadow-md p-5 mb-8">
        {bookingListData?.data?.data?.docs.length === 0 ? (
          <div className="text-center py-4">
            <Clock className="h-12 w-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">No bookings scheduled for today</p>
          </div>
        ) : (
          bookingListData?.data?.data?.docs.map((booking) => (
            <div
              onClick={() => {
                navigate(`/ro-service/tech-booking-details/${booking?._id}`);
              }}
              key={booking._id}
              className="mb-4 pb-4 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0 hover:bg-gray-50 rounded-lg p-2 transition duration-150 cursor-pointer"
            >
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-800">
                  {booking.fullName}
                </span>
                <Badge
                  className={`${getStatusColor(
                    booking?.status
                  )} border px-2.5 py-0.5 text-xs font-medium rounded-full`}
                >
                  {booking?.status}
                </Badge>
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-1.5">
                <Calendar size={14} className="mr-1.5 text-indigo-500" />
                {moment(booking.assignDate).format('DD MMM, YYYY')}
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-1.5">
                <Clock1 size={14} className="mr-1.5 text-indigo-500" />
                {booking.aasigntime}
              </div>
              <p className="text-sm text-gray-600 pl-0.5">{booking.address}</p>
            </div>
          ))
        )}
        <button
          className="w-full mt-3 text-indigo-600 text-sm font-medium py-2 border border-indigo-100 rounded-lg hover:bg-indigo-50 transition duration-150"
          onClick={() => navigate('/ro-service/tech-booking-list')}
        >
          View All Bookings
        </button>
      </div>

      <h2 className="font-bold text-lg mb-4 text-gray-800">
        Recent Completions
      </h2>
      {bookingListData?.data?.data?.docs.filter(
        (item) => item?.status === 'Completed'
      )?.length === 0 ? (
        <Card className="border border-gray-100 shadow-sm rounded-xl overflow-hidden">
          <div className="p-8 text-center">
            <CheckCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-medium text-gray-700 mb-1">
              No Completed Bookings
            </h3>
            <p className="text-sm text-gray-500">
              Your completed services will appear here
            </p>
          </div>
        </Card>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-5">
          {bookingListData?.data?.data?.docs
            .filter((item) => item?.status === 'Completed')
            ?.map((booking) => (
              <div
                key={booking._id}
                className="mb-4 pb-4 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0 hover:bg-gray-50 rounded-lg p-2 transition duration-150"
              >
                <div className="flex justify-between mb-1.5">
                  <span className="font-semibold text-gray-800">
                    {booking.fullName}
                  </span>
                  <span className="text-xs font-medium px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full">
                    {booking.service?.serviceTypeName}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-1.5">
                  <Calendar size={14} className="mr-1.5 text-indigo-500" />
                  {moment(booking.updatedAt).format('DD MMM, YYYY')}
                </div>
                <p className="text-sm text-gray-600 pl-0.5">
                  {booking.address}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );

  const renderBookings = () => {
    const [bookingTab, setBookingTab] = useState('pending');

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Bookings</h1>

        <div className="flex mb-6 bg-gray-100 rounded-xl p-1.5">
          <button
            className={`flex-1 py-2.5 text-center rounded-lg transition duration-150 ${
              bookingTab === 'pending'
                ? 'bg-white shadow-sm font-medium text-indigo-700'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setBookingTab('pending')}
          >
            Pending
          </button>
          <button
            className={`flex-1 py-2.5 text-center rounded-lg transition duration-150 ${
              bookingTab === 'completed'
                ? 'bg-white shadow-sm font-medium text-indigo-700'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setBookingTab('completed')}
          >
            Completed
          </button>
        </div>

        {bookingListData?.data?.data?.docs.filter((item) =>
          bookingTab === 'pending'
            ? item?.status === 'Pending'
            : item?.status === 'Completed'
        ).length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <InfoIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-base font-medium text-gray-700 mb-1">
              No {bookingTab === 'pending' ? 'Pending' : 'Completed'} Bookings
            </h3>
            <p className="text-sm text-gray-500">
              {bookingTab === 'pending'
                ? 'You have no pending bookings at the moment'
                : 'Your completed bookings will appear here'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookingListData?.data?.data?.docs
              .filter((item) =>
                bookingTab === 'pending'
                  ? item?.status === 'Pending'
                  : item?.status === 'Completed'
              )
              .map((booking) => (
                <div
                  key={booking._id}
                  className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition duration-150"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-gray-800">
                        {booking.fullName}
                      </h3>
                      <p className="text-sm text-gray-600 mt-0.5">
                        {booking.address}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium">
                      {booking.service?.serviceTypeName}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar size={14} className="mr-1.5 text-indigo-500" />
                    {bookingTab === 'pending'
                      ? booking.assignDate
                      : booking.updatedAt}
                    <span className="mx-2">•</span>
                    <Clock1 size={14} className="mr-1.5 text-indigo-500" />
                    {booking.aasigntime || '09:00 AM'}
                  </div>

                  {bookingTab === 'pending' ? (
                    <div className="flex space-x-3">
                      <button className="flex-1 bg-indigo-600 text-white rounded-lg py-2.5 text-sm font-medium flex items-center justify-center hover:bg-indigo-700 transition duration-150">
                        <PlayCircle size={16} className="mr-1.5" />
                        Start Service
                      </button>
                      <button className="flex items-center justify-center w-12 h-10 border border-gray-200 text-indigo-600 rounded-lg hover:bg-indigo-50 transition duration-150">
                        <PhoneCall size={18} />
                      </button>
                    </div>
                  ) : (
                    <button
                      className="w-full bg-emerald-600 text-white rounded-lg py-2.5 text-sm font-medium flex items-center justify-center hover:bg-emerald-700 transition duration-150"
                      onClick={() =>
                        navigate(
                          `/ro-service/tech-booking-details/${booking?._id}`
                        )
                      }
                    >
                      <Eye size={16} className="mr-1.5" />
                      View Details
                    </button>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'bookings':
        return renderBookings();
      case 'dashboard':
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-gray-50">
      {/* Main content */}
      <div className="flex-1 overflow-y-auto pb-8">{renderContent()}</div>
    </div>
  );
};

export default TechnicianDashboard;
