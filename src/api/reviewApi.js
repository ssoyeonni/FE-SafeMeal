import axiosInstance from "./axios";

// 리뷰 목록 조회
export const getReviews = async (recipeId) => {
  const res = await axiosInstance.get(`/recipes/${recipeId}/reviews`);
  return res.data; // 배열
};

// 리뷰 등록
export const postReview = async (recipeId, userName, text) => {
  const res = await axiosInstance.post(`/recipes/${recipeId}/reviews`, {
    recipeId,
    userName,
    text,
  });
  return res.data; // 등록된 리뷰 1개 객체
};

// 리뷰 수정
export const updateReview = async (recipeId, reviewId, userName, text) => {
  const res = await axiosInstance.put(`/recipes/${recipeId}/reviews/${reviewId}`, {
    recipeId,
    userName,
    text,
  });
  return res.data; // 수정된 리뷰 객체
};

// 리뷰 삭제
export const deleteReview = async (recipeId, reviewId) => {
  await axiosInstance.delete(`/recipes/${recipeId}/reviews/${reviewId}`);
};
