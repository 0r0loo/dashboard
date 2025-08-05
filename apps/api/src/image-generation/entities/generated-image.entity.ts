import {
  Entity,
  Column,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('generated_images')
export class GeneratedImage extends BaseEntity {
  @Column({ type: 'text' })
  prompt: string;

  @Column({ name: 'image_url', type: 'text' })
  imageUrl: string;

  @Column({ default: 'completed' })
  status: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;
}
