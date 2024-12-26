export const getPaginationData = (page = 1, limit = 20) => {
  const skip = (page - 1) * limit;
  return {
    take: Number(limit),
    skip: Number(skip)
  };
};

export const formatPaginatedResponse = (data, total, page, limit) => {
  return {
    data,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit)
    }
  };
};