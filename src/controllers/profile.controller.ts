import { Response } from 'express';
import * as Yup from 'yup';
import { IReqUser, IUserInput } from '../models/users.model';
import { authQuery } from '../queries/auth.query';
import response from '../utils/response.util';

const profileUpdateValidate = Yup.object({
  first_name: Yup.string().required('First name and last name is required!'),
  last_name: Yup.string().required('First name and last name is required!'),
});

export async function profile(req: IReqUser, res: Response) {
  try {
    const user = req.user;

    const userData = await authQuery.getUserByEmail(`${user?.email}`);

    return response.success(res, 200, 'Success get user profile.', userData);
  } catch (error) {
    response.nonSuccess(res, 500, 'Failed get user profile.');
  }
}

export async function profileUpdate(req: IReqUser, res: Response) {
  const { first_name, last_name } = req.body as unknown as IUserInput;

  try {
    const user = req.user;

    await profileUpdateValidate.validate({
      first_name,
      last_name,
    });

    const isExistUser = await authQuery.verifyUserEmail(`${user?.email}`);

    if (!isExistUser) return response.unauthorized(res);

    const isUpdated = await authQuery.updateUser({ email: user?.email, first_name, last_name });

    if (!isUpdated) return response.nonSuccess(res, 400, 'Failed to update user');

    const userData = await authQuery.getUserByEmail(`${user?.email}`);

    return response.success(res, 200, 'Success update user', userData);
  } catch (error) {
    response.nonSuccess(res, 500, 'Failed update user');
  }
}

export async function profileUpdateImage(req: IReqUser, res: Response) {
  const { profile_image } = req.body as unknown as IUserInput;

  try {
    const user = req.user;

    if (!profile_image) return response.nonSuccess(res, 400, 'Profile image is required!');

    const isExistUser = await authQuery.verifyUserEmail(`${user?.email}`);

    if (!isExistUser) return response.unauthorized(res);

    const isUpdated = await authQuery.updateUserImage({ email: user?.email, profile_image });

    if (!isUpdated) return response.nonSuccess(res, 400, 'Failed to update user');

    const userData = await authQuery.getUserByEmail(`${user?.email}`);

    return response.success(res, 200, 'Success update user image', userData);
  } catch (error) {
    response.nonSuccess(res, 500, 'Failed update user image');
  }
}
