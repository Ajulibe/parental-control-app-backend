import { Column, DataType, Model, Table, CreatedAt, UpdatedAt, PrimaryKey } from 'sequelize-typescript';

@Table({ tableName: 'app_details' })
export class Apps extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  device_id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  installed_app_name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  app_status!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
