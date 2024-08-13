import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('channel')
export class ChannelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'description', nullable: true })
  description: string;
}
