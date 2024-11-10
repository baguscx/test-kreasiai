import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Mengimpor CSS Swiper standar
import "swiper/css/navigation"; // Mengimpor gaya untuk navigasi (optional)
import "swiper/css/pagination"; // Mengimpor gaya untuk pagination (optional)

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fungsi untuk mengambil data feedback dari backend
  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/feedback");
      setFeedbacks(response.data.data);
    } catch (error) {
      setError("Gagal mengambil data feedback.");
    } finally {
      setLoading(false);
    }
  };

  // Mengambil data feedback saat komponen pertama kali dirender
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="feedback-list p-6 m-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
        Feedback
      </h2>

      {/* Swiper container untuk slider otomatis */}
      <Swiper
        spaceBetween={30} // Jarak antar slide
        // slidesPerView={1} // Menampilkan 1 slide sekaligus
        autoplay={{
          delay: 1000,
          disableOnInteraction: false, // Pastikan autoplay tetap aktif meskipun pengguna berinteraksi
        }}
        loop={true} // Looping slider
        effect="fade" // Menambahkan efek transisi fade untuk pergantian slide
      >
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback) => (
            <SwiperSlide
              key={feedback.id}
              className="flex justify-center items-center bg-white shadow-lg rounded-xl p-6"
            >
              <div className="flex space-x-6">
                {/* Foto di sebelah kiri dengan efek hover */}
                <img
                  src={feedback.photo}
                  alt="User Avatar"
                  className="w-24 h-24 rounded-full object-cover transform transition duration-500 hover:scale-110"
                />
                {/* Konten di sebelah kanan */}
                <div className="flex-1">
                  {/* Nama di sebelah kanan foto */}
                  <h3 className="text-xl font-bold text-gray-800">
                    {feedback.name}
                  </h3>
                  {/* Email di bawah pesan */}
                  <p className="text-sm text-gray-500 mt-4">
                    <strong>Email: </strong>
                    {feedback.email}
                  </p>
                  {/* Pesan di bawah nama dengan text styling */}
                  <p className="text-md text-gray-600 mt-3 italic">
                    "{feedback.message}"
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <p>Tidak ada feedback.</p>
        )}
      </Swiper>
    </div>
  );
};

export default FeedbackList;
