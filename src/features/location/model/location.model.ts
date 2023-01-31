import { Column, CreatedAt, DataType, Model, Table, UpdatedAt } from 'sequelize-typescript';

@Table
export class Location extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  deviceId!: string;

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
