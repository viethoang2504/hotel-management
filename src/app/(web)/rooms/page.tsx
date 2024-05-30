'use client';

import RoomCard from "@/components/RoomCard/RoomCard";
import Search from "@/components/Search/Search";
import { getRooms } from "@/libs/apis";
import { Room } from "@/models/room";
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

  const fillterRooms = (rooms: Room[]) => {
    return rooms.filter(room => {

      if (roomTypeFillter && 
        roomTypeFillter.toLowerCase() !== "all" && 
        room.type.toLowerCase() !== roomTypeFillter.toLowerCase()
      ) {
        return false;
      }

      if (
        searchQuery &&
        !room.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    })
  }

  const fillterdRooms = fillterRooms(data || [])

  return (
    <div className="container mx-auto pt-10">
      <Search 
        roomTypeFilter={roomTypeFillter}
        searchQuery={searchQuery}
        setRoomTypeFilter={setRoomTypeFillter}
        setSearchQuery={setSearchQuery}
      />

      <div className="flex mt-20 justify-between flex-wrap">
        {fillterdRooms.map(room => 
        <RoomCard key={room._id} room={room} />
      )}
      </div>
    </div>
  )
}

export default Rooms
