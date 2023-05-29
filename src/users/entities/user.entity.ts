import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../roles/entities/role.entity';
import { Group } from '../../groups/entities/group.entity';
import { Profile } from '../../profiles/entities/profile.entity';

@Entity({ name: '_users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'username', nullable: false, unique: true })
  username: string;
  @Column({ name: 'email', nullable: false, unique: true })
  email: string;
  @Column({ name: 'hashed_password', nullable: false, select: true })
  hashedPassword: string;

  @ManyToOne(() => Role, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToMany(() => Group)
  @JoinTable({ name: '_users_groups' })
  groups: Group[];

  @OneToOne(() => Profile, {
    cascade: true,
  })
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;
}
