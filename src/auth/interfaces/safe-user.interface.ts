import { User } from 'src/user/schemas/user.schema';

export type SafeUser = Omit<User, 'password'>;
