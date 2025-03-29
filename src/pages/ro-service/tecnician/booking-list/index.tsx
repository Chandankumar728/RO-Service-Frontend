import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Page from '@/components/helmet-page';
import { useApi, usePutMutation } from '@/hooks/useCustomQuery';
import { roApi } from '@/lib';
import PaginationComponent from '@/components/pagination';
import SearchBox from '@/components/search-box';
import { Eye, X } from 'lucide-react';
import LoaderList from '@/components/loader-list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OverLayLoader from '@/components/loaders/OverLayLoader';
import { I_BOOKING_LIST } from '../../admin/ro-booking-list/type';
import CancelBooking from '@/components/cancel-booking/CancelBooking';

type StatusMapType = {
  [key: string]: string;
};

export default function BookingList() {
  const location = useLocation();
  const searchParam = new URLSearchParams(location.search);
  const bookingStatus = searchParam.get('booking-status');
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(bookingStatus ?? '');
  const deleteMutation = usePutMutation({});

  const bookingListData = useApi<I_BOOKING_LIST>({
    api: `${roApi.getBookingListByTechnicianId}?page=${page}&limit=${limit}&q=${search}`,
    key: 'getBookingListByTechnicianIdjhbjhbjhbjh',
    value: [page, limit],
    options: {
      enabled: true
    }
  });

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Pending':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const renderBookings = (filterStatus: string) => {
    const bookingList =
      filterStatus === 'all'
        ? bookingListData.data?.data?.docs
        : bookingListData.data?.data?.docs?.filter(
            (item) => item?.status === filterStatus
          );

    return (
      <div className="space-y-4 mt-4">
        <LoaderList
          dataLength={bookingListData.data?.data?.docs?.length || 0}
          isLoading={bookingListData.isFetching}
        >
          {bookingList?.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No bookings found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {bookingList?.map((booking, index) => (
                <Card
                  key={index}
                  className="overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  <CardContent className="p-0">
                    <div className="p-4 flex flex-col space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-base">
                            {booking?.fullName}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {booking?.phoneNumber}
                          </p>
                        </div>
                        <Badge
                          className={`${getStatusColor(
                            booking?.status
                          )} border px-2 py-1`}
                        >
                          {booking?.status}
                        </Badge>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Application ID
                          </p>
                          <p className="font-medium text-sm">
                            {booking?.applicationNo}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          {booking?.status === 'Pending' && (
                            <CancelBooking
                              id={booking?._id}
                              refetch={bookingListData.refetch}
                            >
                              <Button
                                size="sm"
                                variant="destructive"
                                className="flex items-center gap-1 h-7"
                              >
                                <X size={14} />
                                <span>Cancel</span>
                              </Button>
                            </CancelBooking>
                          )}
                          <Button
                            onClick={() =>
                              navigate(
                                `/ro-service/tech-booking-details/${booking?._id}`
                              )
                            }
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-1 h-7"
                          >
                            <Eye size={14} />
                            <span>View</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="flex justify-end mt-6">
            <PaginationComponent
              page={page}
              perPage={limit}
              totalPage={bookingListData.data?.data.totalDocs}
              hasNextPage={bookingListData.data?.data?.hasNextPage}
              hasPrevPage={bookingListData.data?.data.hasPrevPage}
              setPage={setPage}
              setPerPage={setLimit}
            />
          </div>
        </LoaderList>
      </div>
    );
  };

  return (
    <Page title="Booking List">
      {deleteMutation.isPending && <OverLayLoader />}

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">Booking List</h1>
            <p className="text-muted-foreground">
              {bookingListData.data?.data.totalDocs || 0} total bookings
            </p>
          </div>

          <SearchBox
            search={search}
            setSearch={setSearch}
            refetch={bookingListData.refetch}
            isFetching={bookingListData.isLoading}
            setPage={setPage}
          />
        </div>
      </div>

      <Tabs
        defaultValue="0"
        className="w-full"
        onValueChange={(value) => {
          const statusMap: StatusMapType = {
            '0': 'all',
            '1': 'Pending',
            '2': 'Completed',
            '3': 'Cancelled'
          };
          setStatus(statusMap[value] || '');
          setPage(1);
        }}
      >
        <TabsList className="w-full mb-4 bg-muted/50">
          <TabsTrigger value="0" className="flex-1 py-3 rounded-md">
            All
          </TabsTrigger>
          <TabsTrigger value="1" className="flex-1 py-3 rounded-md">
            Pending
          </TabsTrigger>
          <TabsTrigger value="2" className="flex-1 py-3 rounded-md">
            Completed
          </TabsTrigger>
          <TabsTrigger value="3" className="flex-1 py-3 rounded-md">
            Cancelled
          </TabsTrigger>
        </TabsList>

        <TabsContent value="0">{renderBookings('all')}</TabsContent>
        <TabsContent value="1">{renderBookings('Pending')}</TabsContent>
        <TabsContent value="2">{renderBookings('Completed')}</TabsContent>
        <TabsContent value="3">{renderBookings('Cancelled')}</TabsContent>
      </Tabs>
    </Page>
  );
}
