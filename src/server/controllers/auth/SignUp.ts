import { UsersProvider } from './../../providers';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { User } from  '../../models/User';
import { db } from '../../utils/db.server';


interface IBodyProps extends Omit<User, 'id'> { }

export const signUpValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required().min(6),
    password: yup.string().required().min(6),
    phone_number: yup.string().required(),
  })),
}));

export const signUp = async (req: Request, res: Response) => {
  const user = req.body as IBodyProps;
  const userExists = await db.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (userExists) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: `Usuário com o email ${user.email} já existe.`,
      },
    });
  }

  const result = await UsersProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        message: result.message || 'Erro ao cadastrar usuário.',
        default: 'Erro ao cadastrar usuário.',
      }
    });
  }

  return res.status(StatusCodes.CREATED).json({
    message: 'Usuário criado com sucesso.',
    data: result.user,
  });
};