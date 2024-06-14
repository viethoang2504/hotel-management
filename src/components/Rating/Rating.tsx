import { FC } from "react"
import { FaStar, FaStarHalf } from "react-icons/fa";

type Props = {
    rating: number
}

const Rating: FC<Props> = ({ rating }) => {
    const fullStarts = Math.floor(rating);
    const decimalPart = rating - fullStarts

    const fullStartElements = Array(fullStarts).fill(<FaStar />)

    let halfStarElement = null;

    if (decimalPart > 0) {
        halfStarElement = <FaStarHalf />
    }

    return (
        <>
            {fullStartElements} {halfStarElement}
        </>
    )
}

export default Rating
