import { UserEntity } from './../../user/entites/user.entity';
import { TimesTampEntities } from 'Generic/timstamp.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { type } from 'os';

@Entity('cv')
export class CvEntity extends TimesTampEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name',
    length: 50,
  })
  name: string;

  @Column({
    length: 50,
  })
  firstname: string;

  @Column()
  age: number;

  @Column()
  cin: number;

  @Column()
  job: string;

  @Column()
  path: string;

  @ManyToOne((type) => UserEntity, (user) => user.cvs, {
    cascade: ['insert', 'update'],
    nullable: true,
    // eager: true,
  })
  user: UserEntity;
}
