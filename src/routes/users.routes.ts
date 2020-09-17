import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post(
  '/',
  expressAsyncHandler(async (request, response) => {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  }),
);

export default usersRouter;
