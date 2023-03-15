const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { UserService, formDataService, imageService } = require("../services");
const response = require("../utils/response");

const createUser = catchAsync(async (req, res) => {
  console.log(req.body);
  const user = await UserService.createUser(req.body);
  console.log(user);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);

  const { length, start } = req.query;
  options.page = start / length + 1;
  options.limit = length;

  const result = await UserService.queryUsers(filter, options);
  result.draw = parseInt(req.query.draw);

  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await UserService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await UserService.updateUserById(req.userId, req.body);
  res.status(httpStatus.OK).json(response(httpStatus.OK, "Thành công"));
});

const deleteUser = catchAsync(async (req, res) => {
  await UserService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const lockUser = catchAsync(async (req, res) => {
  const user = await UserService.lockUserById(req.params.userId);
  res.status(httpStatus.OK).json(response(httpStatus.OK, "Thành công"));
});

const getUserTest = catchAsync(async (req, res) => {
  const users = await UserService.getUsers();
  res.json({ users });
});
module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserTest,
};
