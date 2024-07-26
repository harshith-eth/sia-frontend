export const Id = String | Number;

export const Column = {
  id: Id,
  title: String,
};

export const Task = {
  id: Id,
  columnId: Id,
  content: String,
};
