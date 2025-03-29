import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Page from '@/components/helmet-page';
import { useApi, usePutMutation } from '@/hooks/useCustomQuery';
import { roApi } from '@/lib';
import PaginationComponent from '@/components/pagination';
import SearchBox from '@/components/search-box';
import { Eye, PencilIcon, Trash, Plus } from 'lucide-react';
import LoaderList from '@/components/loader-list';
import {
  Tabs,
  TabsContent,
  // TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { Confirm } from '@/components/react-confirm-box';
import toast from 'react-hot-toast';
import OverLayLoader from '@/components/loaders/OverLayLoader';
import { I_BOOKING_LIST } from '../../admin/ro-booking-list/type';

export default function MemberList() {
  const location = useLocation();
  const searchParam = new URLSearchParams(location.search);
  const memberStatus = searchParam.get('member-status');
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState(memberStatus ?? '');
  const deleteMutation = usePutMutation({});

  const bookingListData = useApi<I_BOOKING_LIST>({
    api: `${roApi.getBookingListByTechnicianId}?page=${page}&limit=${limit}&q=${search}`,
    key: 'getBookingListByTechnicianId',
    value: [page, limit],
    options: {
      enabled: true
    }
  });

  const renderBookings = (status:string) => {
    const bookingList = status=='all'?bookingListData.data?.data?.docs:
    bookingListData.data?.data?.docs?.filter(item=>item?.status == status);
    return(
      <>
        {/* line */}
      <div className="border-t border-secondary mt-1 mb-1"></div>
      {/* member list */}
      <LoaderList
        dataLength={bookingListData.data?.data?.docs.length!}
        isLoading={bookingListData.isFetching}
      >
        {/*  */}
        <div className="grid grid-cols-1 gap-3 mt-2">
          {bookingList?.map((data, index) => (
            <Card
              key={index + 1}
              // className=" shadow-none rounded-2xl bg-secondary"
            >
              <div className="p-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center  ">
                  
                    <div className="ml-1">
                      <div className="text-primary font-semibold text-sm flex gap-2">
                        <h1> {data?.fullName}</h1>
                        <h1 className="mt-1.5">
                          {data?.status == 'Completed' ? (
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          )}
                        </h1>
                      </div>
                      <div className="text-primary font-bold ">
                        <h1 className="text-muted-foreground text-xs">
                          {data?.phoneNumber}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div>
                    {/* using moment  */}
                    <h1 className="text-primary font-semibold text-sm">
                      {data?.applicationNo}
                    </h1>
                    <small className="text-muted-foreground font-bold text-xs">
                      Application ID
                    </small>
                  </div>
                </div>
              </div>

              

              <div className="flex items-center justify-between px-4 mb-4 gap-3">
              
                
                <Button
                onClick={
                  () =>
                    navigate(
                      `/ro-service/tech-booking-details/${data?._id}`
                    )
                }
                  size={'sm'}
                  variant="outline"
                  className={
                    data?.status == 'Cancelled'
                      ? ' text-red-700 border-red-700 w-full h-6'
                      : ' text-green-700 border-green-700 w-full h-6'
                  }
                  
                >
                 View
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* pagination */}
        <div className="flex justify-end mt-3">
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
      </>
    )
  }

  return (
    <Page title="Booking List">
      {deleteMutation.isPending && <OverLayLoader />}
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-base font-semibold text-muted-foreground">
          Booking List({bookingListData.data?.data.totalDocs})
        </h1>

        
      </div>

      <div className="border-t border-secondary mt-3 mb-2"></div>

      <SearchBox
        search={search}
        setSearch={setSearch}
        refetch={bookingListData.refetch}
        isFetching={bookingListData.isLoading}
        setPage={setPage}
      />

      {/* tabbar */}
      <div className="mt-4 overflow-x-hidden">
        <Tabs defaultValue={'0'} className="w-full">
          <TabsList className="w-full">
          <TabsTrigger
              className={`w-full`}
              value="0"
              onClick={() => {
                setStatus('');
                setLimit(5);
                setPage(1);
              }}
            >
              All
            </TabsTrigger>
            <TabsTrigger
              className={`w-full `}
              value="1"
              onClick={() => {
                setStatus('1');
                setLimit(5);
                setPage(1);
              }}
            >
              Pending
            </TabsTrigger>
            <TabsTrigger
              className={`w-full`}
              value="2"
              onClick={() => {
                setStatus('2');
                setLimit(5);
                setPage(1);
              }}
            >
              Comleted
            </TabsTrigger>
            <TabsTrigger
              className={`w-full`}
              value="3"
              onClick={() => {
                setStatus('3');
                setLimit(5);
                setPage(1);
              }}
            >
              Cancelled
            </TabsTrigger>
            
          </TabsList>
          <TabsContent
            value="0"
            className="text-muted-foreground font-semibold"
          >
            {renderBookings('all')}
          </TabsContent>
          <TabsContent
            value="1"
            className="text-muted-foreground font-semibold"
          >
            {renderBookings('Pending')}
          </TabsContent>
          <TabsContent
            value="2"
            className="text-muted-foreground font-semibold"
          >
            {renderBookings('Completed')}
          </TabsContent>
          <TabsContent
            value="3"
            className="text-muted-foreground font-semibold"
          >
            {renderBookings('Cancelled')}
          </TabsContent>
        </Tabs>
      </div>
      
    </Page>
  );
}