import api from "./axios";

// 레시피 목록 조회
export const getRecipeList = async () => {
  const res = await api.get("/recipes");
  return res.data;
};

// 레시피 상세 조회
export const getRecipeDetail = async (id) => {
  const res = await api.get(`/recipes/${id}`);
  return res.data;
};