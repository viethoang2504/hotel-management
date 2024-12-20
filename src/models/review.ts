export type updateReviewDto = {
    reviewId: string;
    reviewText: string;
    userRating: number;
}

export type CreateReviewDto = {
    hotelRoomId: string;
    reviewText: string;
    userRating: number;
    userId: string;
}

export type Review = {
    text: string;
    user: { name: string, image: string }
    userRating: number;
    _createdAt: Date;
    _id: string;
}