import { UserRoleEnum } from './../../enums/user-role.enum';
import { type } from 'os';
import { CvEntity } from './../../cv/entities/cv.entity';
import { TimesTampEntities } from 'Generic/timstamp.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity extends TimesTampEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    unique: true,
  })
  username: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER,
  })
  role: string;

  @OneToMany((type) => CvEntity, (cv) => cv.user, {
    eager: true,
    cascade: true,
    nullable: true,
  })
  cvs: CvEntity;
}
