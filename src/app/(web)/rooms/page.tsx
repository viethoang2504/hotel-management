'use client';

import { getRooms } from "@/libs/apis";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

const Rooms = () => {

  const [roomTypeFillter, setRoomTypeFillter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchQuery = searchParams.get('searchQuery');
    const roomType = searchParams.get('roomType');

    if (roomType) setRoomTypeFillter(roomType);
    if (searchQuery) setSearchQuery(searchQuery);
  }, []);

  async function featchData() {
    return getRooms();
  }

  const { data, error, isLoading } = useSWR('get/hotelRooms', featchData);

  if (error) {
    throw new Error('Cannot featch data');
  }

  if (typeof data === 'undefined' && !isLoading) {
    throw new Error('Cannot featch data');
  }

  console.log(data)

  return (
    <div>
      Rooms
    </div>
  )
}

export default Rooms
