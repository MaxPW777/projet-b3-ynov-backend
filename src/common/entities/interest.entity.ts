import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Preference } from './preference.entity';

@Entity('interests')
export class Interest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @ManyToMany(() => Preference, (preference) => preference.interests)
  preferences: Preference[];
}
