import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getPlaceById } from "../utils/exploreFetcher";
import { Heart, Star } from "lucide-react";

const placeExploreNew = () => {
    const { id } = useParams<{ id: string }>();
    const [place, setPlace] = useState<any>(null);
    const [currentImage, setCurrentImage] = useState(0);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPlace = async () => {
            if (!id) return;
            const postData = await getPlaceById(id);
            setPlace(postData.data);
        };
        fetchPlace();
    }, [id]);

    const handleNext = () => {
        setCurrentImage((prev) => (prev + 1) % place.img.length);
    };

    const handlePrev = () => {
        setCurrentImage((prev) => (prev - 1 + place.img.length) % place.img.length);
    };

    return (
        <div className="p-6 max-w-3xl mx-auto shadow-lg rounded-2xl bg-white">
            <h2 className="text-2xl font-bold text-center mb-4">{place?.name}</h2>
            <div className="relative w-full h-96 mb-4">
                <img src={place?.img[currentImage]} alt={place?.name} className="w-full h-96 object-cover rounded-lg" />
                <button
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full cursor-pointer"
                >
                    ◀
                </button>
                <button
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full cursor-pointer"
                >
                    ▶
                </button>
            </div>
            <div className="p-4">
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-lg">{place?.category}</span>
                    <span className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-lg">{place?.region}</span>
                    <span className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-lg">{place?.state}</span>
                    <span className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-lg">Best Time: {place?.bestTimeToVisit}</span>
                </div>
                <div className="flex justify-between mb-5">
                    <div>
                        <p className="text-sm text-gray-600">Nearby City: <strong>{place?.NearbyCity}</strong></p>
                        <p className="text-sm text-gray-600">Distance: <strong>{place?.distanceFromNearbyPlace}</strong></p>
                    </div>
                    <div className="flex space-x-2">
                        <div className="flex items-center mt-4">
                            <Star className="text-yellow-500" />
                            <span className="ml-2 font-bold">{place?.rating} / 5</span>
                        </div>
                        <div className="flex items-center mt-4">
                            <Heart className="text-red-500" />
                            <span className="ml-2 font-bold">{place?.like}</span>
                        </div>
                    </div>

                </div>
                <p className="text-gray-700 mb-4">{place?.description}</p>
            </div>
            <button className='w-full py-2 bg-gray-800 text-white cursor-pointer' onClick={() => navigate(-1)}>Back</button>
        </div>
    )
}

export default placeExploreNew
