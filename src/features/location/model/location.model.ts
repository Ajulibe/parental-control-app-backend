import { Column, CreatedAt, DataType, Model, PrimaryKey, Table, Unique, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'locations' })
export class Location extends Model {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false
  })
  id!: number;

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  device_id!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  latitude!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  longitude!: number;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
