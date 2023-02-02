import { Column, DataType, Model, Table, CreatedAt, UpdatedAt, PrimaryKey, Unique } from 'sequelize-typescript';

@Table({ tableName: 'children' })
export class Children extends Model {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false
  })
  id!: number;

  @Unique
  @Column({ type: DataType.STRING, allowNull: false })
  device_id!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  child_name!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  email_address!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
