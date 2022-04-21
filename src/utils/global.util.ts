/**
 * pagination builder
 * @param params
 * @returns
 */
export const paginationBuilder = (params: {
  page?: number;
  limit?: number;
}): { page: number; limit: number; offset: number } => {
  const page = Number(params.page || 1);
  const limit = Number(params.limit || 10);
  const offset = (page - 1) * limit;
  return { page, limit, offset };
};
