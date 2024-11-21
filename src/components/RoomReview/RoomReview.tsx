
import { Review } from "@/models/review"
import axios from "axios"
import { FC } from "react"
import useSWR from "swr"
import Rating from "../Rating/Rating"
import Image from "next/image";

function formatDateToDDMMYYYY(date: any): string {
    const validDate = date instanceof Date ? date : new Date(date);
    const day = validDate.getDate().toString().padStart(2, '0'); // Lấy ngày, thêm '0' nếu cần
    const month = (validDate.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng (0-based) và thêm '0'
    const year = validDate.getFullYear(); // Lấy năm
    return `${day}-${month}-${year}`;
}


const RoomReview: FC<{ roomId: string }> = ({ roomId }) => {

    const fetchRoomReviews = async () => {
        const { data } = await axios.get<Review[]>(`/api/room-reviews/${roomId}`)
        return data;
    }

    const {
        data: roomReviews,
        error,
        isLoading
    } = useSWR('/api/room-reviews', fetchRoomReviews)

    if (error) {
        throw new Error('Cannot fetch data');
    }

    if (typeof roomReviews === 'undefined' && !isLoading) {
        throw new Error('Cannot fetch data1');
    }

    console.log(roomReviews)

    return (
        <>
            {roomReviews && roomReviews.map(review => (
                <div 
                key={review._id}
                className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg"
                >
                    <div className="font-semibold mb-2 flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                            <Image
                                src={review.user.image}
                                alt={review.user.name!}
                                width={30}
                                height={30}
                                className="scale-animation img"
                            />
                        </div>
                        <p>{review.user.name}</p>
                        <div className="ml-4 flex items-center text-tertiary-light text-lg">
                            <Rating rating={review.userRating} />
                        </div>
                    </div>

                    <p>{review.text}</p>
                    <p style={{ fontSize: '0.8rem', fontStyle: 'italic' }}>Created at {formatDateToDDMMYYYY(review._createdAt)}</p>
                </div>
            ))}
        </>
    )
}

export default RoomReview
