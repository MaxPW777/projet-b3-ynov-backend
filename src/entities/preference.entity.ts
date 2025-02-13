import {
  Entity,
  Column,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Interest } from './interest.entity';

@Entity('preferences')
export class Preference {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  min_age: number;

  @Column({ type: 'int', nullable: true })
  max_age: number;

  @Column({ type: 'int', nullable: true })
  gender_preference: number;

  @Column({ type: 'float', nullable: true })
  max_distance: number;

  @Column({ type: 'int', nullable: true })
  type: number;

  @Column({ type: 'int', nullable: true })
  user_id: number;

  @ManyToMany(() => Interest, (interest) => interest.preferences)
  @JoinTable({
    name: 'preferences_interests', // This tells TypeORM which table to use
    joinColumn: { name: 'preference_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'interest_id', referencedColumnName: 'id' },
  })
  interests: Interest[];
}
