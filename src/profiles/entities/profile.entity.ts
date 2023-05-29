import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from '../../enums/gender.enum';

@Entity('_user_profiles')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'patronymic' })
  patronymic: string;

  @Column({ name: 'user_avatar' })
  avatar: string;

  @Column({ name: 'gender', type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ name: 'birthday' })
  birthday: Date;

  @Column({ name: 'phone_number', unique: true })
  phoneNumber: string;
}
