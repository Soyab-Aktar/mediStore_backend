type Ioptions = {
  page?: number | string;
  limit?: number | string;
}
type IoptionsResult = {
  page: number;
  limit: number;
  skip: number;

}
const paginationSortingHelper = (options: Ioptions): IoptionsResult => {
  const page: number = Number(options.page) || 1;
  const limit: number = Number(options.limit) || 10;
  const skip: number = (page - 1) * limit;


  return { page, limit, skip };
}

export default paginationSortingHelper;