import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import DangerFoodCard from "../components/DangerFoodCard";

export default function DangerFoodPage() {
  const [dangerFoods, setDangerFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDangerFoods = async () => {
      try {
        const API_KEY = import.meta.env.VITE_FOOD_API_KEY; // API 키
        const SERVICE_ID = "I0490"; // 회수·판매중지 정보
        const url = `https://openapi.foodsafetykorea.go.kr/api/${API_KEY}/${SERVICE_ID}/json/1/30`;

        const res = await axios.get(url);
        const data = res.data?.[SERVICE_ID]?.row || [];

        const mapped = data.map((item, index) => {
          // 첫 번째 이미지 사용
          let imageUrl = item.IMG_FILE_PATH || "";
          if (imageUrl.includes(",")) {
            imageUrl = imageUrl.split(",")[0].trim();
          }

          return {
            id: index + 1,
            name: item.PRDTNM || "제품명 없음",
            company: item.BSSHNM || "제조업체명 없음",
            issue: item.RTRVLPRVNS || "회수사유 없음",
            grade: item.RTRVL_GRDCD_NM || "-",
            image:
              imageUrl ||
              "https://cdn-icons-png.flaticon.com/512/706/706164.png",
          };
        });

        // 등급 순 정렬
         const sorted = mapped.sort((a, b) => {
          const numA = parseInt(a.grade?.match(/\d+/)?.[0] || 999, 10);
          const numB = parseInt(b.grade?.match(/\d+/)?.[0] || 999, 10);
          return numA - numB; // 낮은 숫자가 위로
        });

        setDangerFoods(mapped);
      } catch (err) {
        console.error(err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchDangerFoods();
  }, []);

  return (
    <Layout
      title="위험식품"
      iconSrc="/src/assets/danger-icon-black.png"
      active="dangerFood"
    >
      {loading && <p className="text-center text-gray-500">불러오는 중...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && dangerFoods.length === 0 && (
        <p className="text-center text-gray-400">
          현재 회수 중인 제품이 없습니다.
        </p>
      )}
      {dangerFoods.map((item) => (
        <DangerFoodCard key={item.id} item={item} />
      ))}
    </Layout>
  );
}
